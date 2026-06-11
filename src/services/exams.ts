import { apiRequest } from './api'

export type ExamType = 'lab' | 'imaging' | 'report' | 'other'

export type ExamFile = {
  id: string
  examId: string
  fileName: string
  contentType: string
  sizeBytes: number
  createdAt: string
}

export type ExamFolder = {
  id: string
  userId?: string
  parentId: string | null
  name: string
  depth: number
  createdAt?: string
  updatedAt?: string
}

export type ExamFolderTree = ExamFolder & {
  exams: Exam[]
  subfolders: ExamFolderTree[]
}

export type Exam = {
  id: string
  userId: string
  folderId: string
  performedAt: string
  requestingDoctor: string
  examType: string
  result: string
  files: ExamFile[]
  createdAt: string
  updatedAt: string
}

export type ExamFilters = {
  type: '' | ExamType
  performedAt: string
  requestingDoctor: string
  folderId: string
}

export type CreateExamPayload = {
  performedAt: string
  requestingDoctor: string
  examType: ExamType
  result: string
  folderId: string
}

type PresignedFileUrlResponse = {
  file: ExamFile
  method: string
  url: string
  headers: Record<string, string>
  expiresAt: string
}

const apiExamTypes: Record<ExamType, string> = {
  lab: 'Lab',
  imaging: 'Imaging',
  report: 'Report',
  other: 'Other',
}

export function examTypeLabel(type: ExamType) {
  return apiExamTypes[type]
}

function buildQuery(filters: ExamFilters) {
  const searchParams = new URLSearchParams()

  if (filters.performedAt) {
    searchParams.set('date', filters.performedAt)
  }

  if (filters.requestingDoctor) {
    searchParams.set('doctor', filters.requestingDoctor)
  }

  if (filters.type) {
    searchParams.set('examType', apiExamTypes[filters.type])
  }

  const query = searchParams.toString()

  return query ? `?${query}` : ''
}

function flattenFolders(tree: ExamFolderTree[]): ExamFolder[] {
  return tree.flatMap((folder) => [
    {
      id: folder.id,
      parentId: folder.parentId,
      name: folder.name,
      depth: folder.depth,
    },
    ...flattenFolders(folder.subfolders),
  ])
}

export async function listFolders(userId: string) {
  const tree = await apiRequest<ExamFolderTree[]>(`/api/v1/users/${userId}/exam-folders/tree`)
  return flattenFolders(tree)
}

export async function createFolder(userId: string, name: string) {
  return apiRequest<ExamFolder>(`/api/v1/users/${userId}/exam-folders`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      parentId: null,
    }),
  })
}

export async function listExams(userId: string, filters: ExamFilters) {
  const exams = await apiRequest<Exam[]>(`/api/v1/users/${userId}/exams${buildQuery(filters)}`)

  if (!filters.folderId) {
    return exams
  }

  return exams.filter((exam) => exam.folderId === filters.folderId)
}

export async function createExam(userId: string, payload: CreateExamPayload) {
  return apiRequest<Exam>(`/api/v1/users/${userId}/exams`, {
    method: 'POST',
    body: JSON.stringify({
      performedAt: payload.performedAt,
      requestingDoctor: payload.requestingDoctor,
      examType: apiExamTypes[payload.examType],
      result: payload.result,
      folderId: payload.folderId,
    }),
  })
}

export async function moveExamToFolder(userId: string, examId: string, folderId: string) {
  return apiRequest<Exam>(`/api/v1/users/${userId}/exams/${examId}/folder`, {
    method: 'PATCH',
    body: JSON.stringify({ folderId }),
  })
}

export async function uploadExamFile(userId: string, examId: string, file: File) {
  const upload = await apiRequest<PresignedFileUrlResponse>(
    `/api/v1/users/${userId}/exams/${examId}/files/upload-url`,
    {
      method: 'POST',
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        sizeBytes: file.size,
      }),
    },
  )

  const uploadResponse = await fetch(upload.url, {
    method: upload.method,
    headers: upload.headers,
    body: file,
  })

  if (!uploadResponse.ok) {
    throw new Error(`File upload failed with status ${uploadResponse.status}.`)
  }

  return upload.file
}
