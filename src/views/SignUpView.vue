<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { UserPlus } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { mockSignUp } from '../services/mockAuth'

const { t } = useI18n()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const message = ref('')

async function submit() {
  isSubmitting.value = true
  message.value = ''

  await mockSignUp({
    name: name.value,
    email: email.value,
    password: password.value,
  })

  message.value = t('auth.successSignUp')
  isSubmitting.value = false
  await router.push('/exams')
}
</script>

<template>
  <section class="auth-layout" aria-labelledby="sign-up-title">
    <div class="auth-copy">
      <span class="eyebrow">
        <UserPlus :size="18" />
        {{ t('auth.mockedCall') }}
      </span>
      <h1 id="sign-up-title">{{ t('auth.signUpTitle') }}</h1>
      <p>{{ t('auth.signUpSubtitle') }}</p>
    </div>

    <form class="auth-card" @submit.prevent="submit">
      <label>
        <span>{{ t('auth.name') }}</span>
        <input v-model="name" type="text" autocomplete="name" required />
      </label>

      <label>
        <span>{{ t('auth.email') }}</span>
        <input v-model="email" type="email" autocomplete="email" required />
      </label>

      <label>
        <span>{{ t('auth.password') }}</span>
        <input v-model="password" type="password" autocomplete="new-password" required />
      </label>

      <button class="primary-action form-submit" type="submit" :disabled="isSubmitting">
        {{ t('auth.submitSignUp') }}
      </button>

      <p v-if="message" class="form-message">{{ message }}</p>

      <RouterLink class="text-link" to="/">
        {{ t('auth.backHome') }}
      </RouterLink>
    </form>
  </section>
</template>
