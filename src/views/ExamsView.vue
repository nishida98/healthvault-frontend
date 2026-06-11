<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { CalendarDays, FilePlus2, FileText, Search, Stethoscope, UploadCloud } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { useDebouncedRef } from '../composables/useDebouncedRef'
import {
  mockCreateExam,
  mockCreateFolder,
  mockListExams,
  mockListFolders,
  mockMoveExamToFolder,
  type CreateExamPayload,
  type Exam,
  type ExamFilters,
  type ExamFolder,
  type ExamType,
} from '../services/mockExams'

const { t } = useI18n()

const examTypes: ExamType[] = ['lab', 'imaging', 'report', 'other']

const exams = ref<Exam[]>([])
const folders = ref<ExamFolder[]>([])
const isLoading = ref(false)
const successMessage = ref('')
const folderMessage = ref('')
const doctorFilter = ref('')
const newFolderName = ref('')
const debouncedDoctorFilter = useDebouncedRef(doctorFilter, 450)

const filters = reactive<ExamFilters>({
  type: '',
  requestedAt: '',
  requestingDoctor: '',
  folderId: '',
})

const form = reactive<CreateExamPayload>({
  title: '',
  type: 'lab',
  requestedAt: new Date().toISOString().slice(0, 10),
  requestingDoctor: '',
  fileName: '',
  folderId: 'folder-general',
})

const resultCount = computed(() => `${exams.value.length} ${t('exams.results')}`)

async function loadExams() {
  isLoading.value = true
  exams.value = await mockListExams(filters)
  isLoading.value = false
}

async function loadFolders() {
  folders.value = await mockListFolders()

  if (!form.folderId && folders.value.length > 0) {
    form.folderId = folders.value[0].id
  }
}

async function submitExam() {
  successMessage.value = ''

  await mockCreateExam({
    title: form.title,
    type: form.type,
    requestedAt: form.requestedAt,
    requestingDoctor: form.requestingDoctor,
    fileName: form.fileName,
    folderId: form.folderId,
  })

  successMessage.value = t('exams.saved')
  form.title = ''
  form.type = 'lab'
  form.requestedAt = new Date().toISOString().slice(0, 10)
  form.requestingDoctor = ''
  form.fileName = ''
  form.folderId = folders.value[0]?.id ?? ''

  await loadExams()
}

async function submitFolder() {
  const name = newFolderName.value.trim()

  if (!name) {
    return
  }

  folderMessage.value = ''
  const folder = await mockCreateFolder(name)
  newFolderName.value = ''
  folderMessage.value = t('exams.folderCreated')

  await loadFolders()
  form.folderId = folder.id
}

async function moveExam(examId: string, folderId: string) {
  await mockMoveExamToFolder(examId, folderId)
  successMessage.value = t('exams.moved')
  await loadExams()
}

function handleMoveExam(examId: string, event: Event) {
  void moveExam(examId, (event.target as HTMLSelectElement).value)
}

function folderName(folderId: string) {
  return folders.value.find((folder) => folder.id === folderId)?.name ?? '-'
}

watch(
  () => [filters.type, filters.requestedAt, filters.requestingDoctor, filters.folderId],
  () => {
    void loadExams()
  },
)

watch(debouncedDoctorFilter, (value) => {
  filters.requestingDoctor = value
})

onMounted(() => {
  void loadFolders()
  void loadExams()
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
    <div class="mock-badge">{{ t('exams.mocked') }}</div>
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

        <button class="secondary-action form-submit" type="submit">
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
          <span>{{ t('exams.titleLabel') }}</span>
          <input v-model="form.title" type="text" required />
        </label>

        <label>
          <span>{{ t('exams.typeLabel') }}</span>
          <select v-model="form.type" required>
            <option v-for="type in examTypes" :key="type" :value="type">
              {{ t(`exams.types.${type}`) }}
            </option>
          </select>
        </label>

        <label>
          <span>{{ t('exams.dateLabel') }}</span>
          <input v-model="form.requestedAt" type="date" required />
        </label>

        <label>
          <span>{{ t('exams.doctorLabel') }}</span>
          <input v-model="form.requestingDoctor" type="text" required />
        </label>

        <label>
          <span>{{ t('exams.fileLabel') }}</span>
          <input v-model="form.fileName" type="text" required />
        </label>

        <label>
          <span>{{ t('exams.folderLabel') }}</span>
          <select v-model="form.folderId" required>
            <option v-for="folder in folders" :key="folder.id" :value="folder.id">
              {{ folder.name }}
            </option>
          </select>
        </label>

        <button class="primary-action form-submit" type="submit">
          {{ t('exams.addButton') }}
        </button>

        <p v-if="successMessage" class="form-message">{{ successMessage }}</p>
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
            <input v-model="filters.requestedAt" type="date" />
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
        <span v-if="isLoading">{{ t('exams.mocked') }}</span>
      </div>

      <div v-if="exams.length" class="saved-exams">
        <article v-for="exam in exams" :key="exam.id" class="saved-exam-card">
          <div class="exam-card-icon">
            <FileText :size="20" />
          </div>
          <div>
            <strong>{{ exam.title }}</strong>
            <span>
              <FileText :size="16" />
              {{ folderName(exam.folderId) }}
            </span>
            <span>
              <CalendarDays :size="16" />
              {{ exam.requestedAt }}
            </span>
            <span>
              <Stethoscope :size="16" />
              {{ exam.requestingDoctor }}
            </span>
          </div>
          <div class="exam-card-actions">
            <small>{{ t(`exams.types.${exam.type}`) }}</small>
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
