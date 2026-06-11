<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Globe2 } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from './i18n'

const { locale, t } = useI18n()

const currentLocale = computed({
  get: () => locale.value as Locale,
  set: (value: Locale) => {
    locale.value = value
    document.documentElement.lang = value
  },
})
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/" aria-label="HealthVault">
        <img src="/brand/logo.png" alt="" />
        <span>HealthVault</span>
      </RouterLink>

      <div class="topbar-actions">
        <label class="language-select">
          <Globe2 :size="18" />
          <span>{{ t('nav.language') }}</span>
          <select v-model="currentLocale" aria-label="Language">
            <option value="pt-BR">PT-BR</option>
            <option value="en">EN</option>
          </select>
        </label>

        <RouterLink class="secondary-action compact" to="/sign-in">
          {{ t('nav.signIn') }}
        </RouterLink>
        <RouterLink class="primary-action compact" to="/sign-up">
          {{ t('nav.signUp') }}
        </RouterLink>
      </div>
    </header>

    <RouterView />
  </main>
</template>
