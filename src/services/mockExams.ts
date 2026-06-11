export type ExamType = 'lab' | 'imaging' | 'report' | 'other'

export type Exam = {
  id: string
  title: string
  type: ExamType
  requestedAt: string
  requestingDoctor: string
  fileName: string
}

export type ExamFilters = {
  type: '' | ExamType
  requestedAt: string
  requestingDoctor: string
}

export type CreateExamPayload = Omit<Exam, 'id'>

const wait = (milliseconds = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })

const exams: Exam[] = [
  {
    id: 'exam-1',
    title: 'Complete blood count',
    type: 'lab',
    requestedAt: '2026-06-02',
    requestingDoctor: 'Dr. Camila Rocha',
    fileName: 'blood-count.pdf',
  },
  {
    id: 'exam-2',
    title: 'Chest X-ray',
    type: 'imaging',
    requestedAt: '2026-05-18',
    requestingDoctor: 'Dr. Felipe Martins',
    fileName: 'chest-xray.png',
  },
  {
    id: 'exam-3',
    title: 'Cardiology report',
    type: 'report',
    requestedAt: '2026-04-27',
    requestingDoctor: 'Dra. Ana Beatriz',
    fileName: 'cardiology-report.pdf',
  },
]

export async function mockListExams(filters: ExamFilters) {
  await wait()

  return exams.filter((exam) => {
    const matchesType = filters.type ? exam.type === filters.type : true
    const matchesDate = filters.requestedAt ? exam.requestedAt === filters.requestedAt : true
    const matchesDoctor = filters.requestingDoctor
      ? exam.requestingDoctor.toLowerCase().includes(filters.requestingDoctor.toLowerCase())
      : true

    return matchesType && matchesDate && matchesDoctor
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
