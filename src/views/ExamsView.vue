<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { CalendarDays, FilePlus2, FileText, Search, Stethoscope, UploadCloud } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { useDebouncedRef } from '../composables/useDebouncedRef'
import { getSession } from '../services/auth'
import {
  createExam,
  createFolder,
  listExams,
  listFolders,
  moveExamToFolder,
  uploadExamFile,
  type CreateExamPayload,
  type Exam,
  type ExamFilters,
  type ExamFolder,
  type ExamType,
} from '../services/exams'

const { t } = useI18n()
const router = useRouter()

const examTypes: ExamType[] = ['lab', 'imaging', 'report', 'other']
const session = getSession()

const exams = ref<Exam[]>([])
const folders = ref<ExamFolder[]>([])
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const isSubmittingExam = ref(false)
const isSubmittingFolder = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const folderMessage = ref('')
const doctorFilter = ref('')
const newFolderName = ref('')
const debouncedDoctorFilter = useDebouncedRef(doctorFilter, 450)

const filters = reactive<ExamFilters>({
  type: '',
  performedAt: '',
  requestingDoctor: '',
  folderId: '',
})

const form = reactive<CreateExamPayload>({
  examType: 'lab',
  performedAt: new Date().toISOString().slice(0, 10),
  requestingDoctor: '',
  result: '',
  folderId: '',
})

const resultCount = computed(() => `${exams.value.length} ${t('exams.results')}`)
const userId = computed(() => session?.user.id ?? '')

async function loadExams() {
  if (!userId.value) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    exams.value = await listExams(userId.value, filters)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('exams.errorGeneric')
  } finally {
    isLoading.value = false
  }
}

async function loadFolders() {
  if (!userId.value) {
    return
  }

  try {
    folders.value = await listFolders(userId.value)

    if (!form.folderId && folders.value.length > 0) {
      form.folderId = folders.value[0].id
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('exams.errorGeneric')
  }
}

async function submitExam() {
  if (!userId.value || !form.folderId) {
    errorMessage.value = t('exams.folderRequired')
    return
  }

  successMessage.value = ''
  errorMessage.value = ''
  isSubmittingExam.value = true

  try {
    const exam = await createExam(userId.value, {
      examType: form.examType,
      performedAt: form.performedAt,
      requestingDoctor: form.requestingDoctor,
      result: form.result,
      folderId: form.folderId,
    })

    if (selectedFile.value) {
      await uploadExamFile(userId.value, exam.id, selectedFile.value)
    }

    successMessage.value = t('exams.saved')
    form.examType = 'lab'
    form.performedAt = new Date().toISOString().slice(0, 10)
    form.requestingDoctor = ''
    form.result = ''
    form.folderId = folders.value[0]?.id ?? ''
    selectedFile.value = null

    await loadExams()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('exams.errorGeneric')
  } finally {
    isSubmittingExam.value = false
  }
}

async function submitFolder() {
  if (!userId.value) {
    return
  }

  const name = newFolderName.value.trim()

  if (!name) {
    return
  }

  folderMessage.value = ''
  errorMessage.value = ''
  isSubmittingFolder.value = true

  try {
    const folder = await createFolder(userId.value, name)
    newFolderName.value = ''
    folderMessage.value = t('exams.folderCreated')

    await loadFolders()
    form.folderId = folder.id
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('exams.errorGeneric')
  } finally {
    isSubmittingFolder.value = false
  }
}

async function moveExam(examId: string, folderId: string) {
  if (!userId.value) {
    return
  }

  try {
    await moveExamToFolder(userId.value, examId, folderId)
    successMessage.value = t('exams.moved')
    await loadExams()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('exams.errorGeneric')
  }
}

function handleMoveExam(examId: string, event: Event) {
  void moveExam(examId, (event.target as HTMLSelectElement).value)
}

function handleFileChange(event: Event) {
  selectedFile.value = (event.target as HTMLInputElement).files?.[0] ?? null
}

function folderName(folderId: string) {
  return folders.value.find((folder) => folder.id === folderId)?.name ?? '-'
}

watch(
  () => [filters.type, filters.performedAt, filters.requestingDoctor, filters.folderId],
  () => {
    void loadExams()
  },
)

watch(debouncedDoctorFilter, (value) => {
  filters.requestingDoctor = value
})

onMounted(async () => {
  if (!session) {
    await router.push('/sign-in')
    return
  }

  await loadFolders()
  await loadExams()
})
</script>

<template>
  <section class="dashboard-hero" aria-labelledby="exams-title">
    <div>
      <span class="eyebrow">
        <UploadCloud :size="18" />
        {{ t('exams.eyebrow') }}
      </span>
      <h1 id="exams-title">{{ t('exams.title') }}</h1>
      <p>{{ t('exams.description') }}</p>
    </div>
    <div class="mock-badge">{{ t('exams.apiConnected') }}</div>
  </section>

  <section class="exams-layout">
    <div class="exam-side-panel">
      <form class="exam-form" @submit.prevent="submitFolder">
        <div class="section-heading">
          <FileText :size="24" />
          <div>
            <h2>{{ t('exams.foldersTitle') }}</h2>
            <p>{{ t('exams.foldersDescription') }}</p>
          </div>
        </div>

        <label>
          <span>{{ t('exams.folderNameLabel') }}</span>
          <input v-model="newFolderName" type="text" required />
        </label>

        <button class="secondary-action form-submit" type="submit" :disabled="isSubmittingFolder">
          {{ t('exams.createFolderButton') }}
        </button>

        <p v-if="folderMessage" class="form-message">{{ folderMessage }}</p>

        <div class="folder-list">
          <span v-for="folder in folders" :key="folder.id">{{ folder.name }}</span>
        </div>
      </form>

      <form class="exam-form" @submit.prevent="submitExam">
        <div class="section-heading">
          <FilePlus2 :size="24" />
          <div>
            <h2>{{ t('exams.addTitle') }}</h2>
            <p>{{ t('exams.addDescription') }}</p>
          </div>
        </div>

        <label>
          <span>{{ t('exams.typeLabel') }}</span>
          <select v-model="form.examType" required>
            <option v-for="type in examTypes" :key="type" :value="type">
              {{ t(`exams.types.${type}`) }}
            </option>
          </select>
        </label>

        <label>
          <span>{{ t('exams.dateLabel') }}</span>
          <input v-model="form.performedAt" type="date" required />
        </label>

        <label>
          <span>{{ t('exams.doctorLabel') }}</span>
          <input v-model="form.requestingDoctor" type="text" required />
        </label>

        <label>
          <span>{{ t('exams.resultLabel') }}</span>
          <textarea v-model="form.result" required rows="4" />
        </label>

        <label>
          <span>{{ t('exams.fileLabel') }}</span>
          <input type="file" @change="handleFileChange" />
        </label>

        <label>
          <span>{{ t('exams.folderLabel') }}</span>
          <select v-model="form.folderId" required>
            <option value="" disabled>{{ t('exams.selectFolder') }}</option>
            <option v-for="folder in folders" :key="folder.id" :value="folder.id">
              {{ folder.name }}
            </option>
          </select>
        </label>

        <button class="primary-action form-submit" type="submit" :disabled="isSubmittingExam">
          {{ t('exams.addButton') }}
        </button>

        <p v-if="successMessage" class="form-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="form-message error-message">{{ errorMessage }}</p>
      </form>
    </div>

    <div class="exam-list-panel">
      <div class="filters-panel">
        <div class="section-heading">
          <Search :size="24" />
          <div>
            <h2>{{ t('exams.filtersTitle') }}</h2>
            <p>{{ t('exams.filtersDescription') }}</p>
          </div>
        </div>

        <div class="filters-grid">
          <label>
            <span>{{ t('exams.typeLabel') }}</span>
            <select v-model="filters.type">
              <option value="">{{ t('exams.allTypes') }}</option>
              <option v-for="type in examTypes" :key="type" :value="type">
                {{ t(`exams.types.${type}`) }}
              </option>
            </select>
          </label>

          <label>
            <span>{{ t('exams.dateLabel') }}</span>
            <input v-model="filters.performedAt" type="date" />
          </label>

          <label>
            <span>{{ t('exams.doctorLabel') }}</span>
            <input v-model="doctorFilter" type="text" />
          </label>

          <label>
            <span>{{ t('exams.folderLabel') }}</span>
            <select v-model="filters.folderId">
              <option value="">{{ t('exams.allFolders') }}</option>
              <option v-for="folder in folders" :key="folder.id" :value="folder.id">
                {{ folder.name }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div class="list-header">
        <strong>{{ resultCount }}</strong>
        <span v-if="isLoading">{{ t('exams.loading') }}</span>
      </div>

      <div v-if="exams.length" class="saved-exams">
        <article v-for="exam in exams" :key="exam.id" class="saved-exam-card">
          <div class="exam-card-icon">
            <FileText :size="20" />
          </div>
          <div>
            <strong>{{ exam.examType }}</strong>
            <span>
              <FileText :size="16" />
              {{ folderName(exam.folderId) }}
            </span>
            <span>
              <CalendarDays :size="16" />
              {{ exam.performedAt }}
            </span>
            <span>
              <Stethoscope :size="16" />
              {{ exam.requestingDoctor }}
            </span>
            <span v-if="exam.files.length">
              <FileText :size="16" />
              {{ exam.files.length }} {{ t('exams.files') }}
            </span>
          </div>
          <div class="exam-card-actions">
            <small>{{ exam.result }}</small>
            <label>
              <span>{{ t('exams.moveToFolder') }}</span>
              <select :value="exam.folderId" @change="handleMoveExam(exam.id, $event)">
                <option v-for="folder in folders" :key="folder.id" :value="folder.id">
                  {{ folder.name }}
                </option>
              </select>
            </label>
          </div>
        </article>
      </div>

      <p v-else class="empty-state">{{ t('exams.empty') }}</p>
    </div>
  </section>
</template>
