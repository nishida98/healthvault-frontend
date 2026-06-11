<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { LogIn } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { mockSignIn } from '../services/mockAuth'

const { t } = useI18n()
const router = useRouter()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const message = ref('')

async function submit() {
  isSubmitting.value = true
  message.value = ''

  await mockSignIn({
    email: email.value,
    password: password.value,
  })

  message.value = t('auth.successSignIn')
  isSubmitting.value = false
  await router.push('/exams')
}
</script>

<template>
  <section class="auth-layout" aria-labelledby="sign-in-title">
    <div class="auth-copy">
      <span class="eyebrow">
        <LogIn :size="18" />
        {{ t('auth.mockedCall') }}
      </span>
      <h1 id="sign-in-title">{{ t('auth.signInTitle') }}</h1>
      <p>{{ t('auth.signInSubtitle') }}</p>
    </div>

    <form class="auth-card" @submit.prevent="submit">
      <label>
        <span>{{ t('auth.email') }}</span>
        <input v-model="email" type="email" autocomplete="email" required />
      </label>

      <label>
        <span>{{ t('auth.password') }}</span>
        <input v-model="password" type="password" autocomplete="current-password" required />
      </label>

      <button class="primary-action form-submit" type="submit" :disabled="isSubmitting">
        {{ t('auth.submitSignIn') }}
      </button>

      <p v-if="message" class="form-message">{{ message }}</p>

      <RouterLink class="text-link" to="/">
        {{ t('auth.backHome') }}
      </RouterLink>
    </form>
  </section>
</template>
