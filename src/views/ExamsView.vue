<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { CalendarDays, FilePlus2, FileText, Search, Stethoscope, UploadCloud } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { useDebouncedRef } from '../composables/useDebouncedRef'
import {
  mockCreateExam,
  mockListExams,
  type CreateExamPayload,
  type Exam,
  type ExamFilters,
  type ExamType,
} from '../services/mockExams'

const { t } = useI18n()

const examTypes: ExamType[] = ['lab', 'imaging', 'report', 'other']

const exams = ref<Exam[]>([])
const isLoading = ref(false)
const successMessage = ref('')
const doctorFilter = ref('')
const debouncedDoctorFilter = useDebouncedRef(doctorFilter, 450)

const filters = reactive<ExamFilters>({
  type: '',
  requestedAt: '',
  requestingDoctor: '',
})

const form = reactive<CreateExamPayload>({
  title: '',
  type: 'lab',
  requestedAt: new Date().toISOString().slice(0, 10),
  requestingDoctor: '',
  fileName: '',
})

const resultCount = computed(() => `${exams.value.length} ${t('exams.results')}`)

async function loadExams() {
  isLoading.value = true
  exams.value = await mockListExams(filters)
  isLoading.value = false
}

async function submitExam() {
  successMessage.value = ''

  await mockCreateExam({
    title: form.title,
    type: form.type,
    requestedAt: form.requestedAt,
    requestingDoctor: form.requestingDoctor,
    fileName: form.fileName,
  })

  successMessage.value = t('exams.saved')
  form.title = ''
  form.type = 'lab'
  form.requestedAt = new Date().toISOString().slice(0, 10)
  form.requestingDoctor = ''
  form.fileName = ''

  await loadExams()
}

watch(
  () => [filters.type, filters.requestedAt, filters.requestingDoctor],
  () => {
    void loadExams()
  },
)

watch(debouncedDoctorFilter, (value) => {
  filters.requestingDoctor = value
})

onMounted(() => {
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

      <button class="primary-action form-submit" type="submit">
        {{ t('exams.addButton') }}
      </button>

      <p v-if="successMessage" class="form-message">{{ successMessage }}</p>
    </form>

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
              <CalendarDays :size="16" />
              {{ exam.requestedAt }}
            </span>
            <span>
              <Stethoscope :size="16" />
              {{ exam.requestingDoctor }}
            </span>
          </div>
          <small>{{ t(`exams.types.${exam.type}`) }}</small>
        </article>
      </div>

      <p v-else class="empty-state">{{ t('exams.empty') }}</p>
    </div>
  </section>
</template>
