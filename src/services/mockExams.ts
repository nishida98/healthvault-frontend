export type ExamType = 'lab' | 'imaging' | 'report' | 'other'

export type ExamFolder = {
  id: string
  name: string
}

export type Exam = {
  id: string
  title: string
  type: ExamType
  requestedAt: string
  requestingDoctor: string
  fileName: string
  folderId: string
}

export type ExamFilters = {
  type: '' | ExamType
  requestedAt: string
  requestingDoctor: string
  folderId: string
}

export type CreateExamPayload = Omit<Exam, 'id'>

const wait = (milliseconds = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })

const folders: ExamFolder[] = [
  {
    id: 'folder-general',
    name: 'General',
  },
  {
    id: 'folder-cardiology',
    name: 'Cardiology',
  },
  {
    id: 'folder-checkups',
    name: 'Annual checkups',
  },
]

const exams: Exam[] = [
  {
    id: 'exam-1',
    title: 'Complete blood count',
    type: 'lab',
    requestedAt: '2026-06-02',
    requestingDoctor: 'Dr. Camila Rocha',
    fileName: 'blood-count.pdf',
    folderId: 'folder-checkups',
  },
  {
    id: 'exam-2',
    title: 'Chest X-ray',
    type: 'imaging',
    requestedAt: '2026-05-18',
    requestingDoctor: 'Dr. Felipe Martins',
    fileName: 'chest-xray.png',
    folderId: 'folder-general',
  },
  {
    id: 'exam-3',
    title: 'Cardiology report',
    type: 'report',
    requestedAt: '2026-04-27',
    requestingDoctor: 'Dra. Ana Beatriz',
    fileName: 'cardiology-report.pdf',
    folderId: 'folder-cardiology',
  },
]

export async function mockListFolders() {
  await wait(150)

  return [...folders]
}

export async function mockCreateFolder(name: string) {
  await wait(200)

  const folder = {
    id: crypto.randomUUID(),
    name,
  }

  folders.push(folder)

  return folder
}

export async function mockListExams(filters: ExamFilters) {
  await wait()

  return exams.filter((exam) => {
    const matchesType = filters.type ? exam.type === filters.type : true
    const matchesDate = filters.requestedAt ? exam.requestedAt === filters.requestedAt : true
    const matchesDoctor = filters.requestingDoctor
      ? exam.requestingDoctor.toLowerCase().includes(filters.requestingDoctor.toLowerCase())
      : true
    const matchesFolder = filters.folderId ? exam.folderId === filters.folderId : true

    return matchesType && matchesDate && matchesDoctor && matchesFolder
  })
}

export async function mockCreateExam(payload: CreateExamPayload) {
  await wait()

  const exam = {
    ...payload,
    id: crypto.randomUUID(),
  }

  exams.unshift(exam)

  return exam
}

export async function mockMoveExamToFolder(examId: string, folderId: string) {
  await wait(180)

  const exam = exams.find((item) => item.id === examId)

  if (!exam) {
    throw new Error('Exam not found')
  }

  exam.folderId = folderId

  return exam
}
