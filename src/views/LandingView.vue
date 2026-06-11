<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Archive, ChevronRight, FileText, FolderOpen, Image, UploadCloud } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const examCategories = [
  { key: 'lab', count: 18, icon: FileText },
  { key: 'imaging', count: 7, icon: Image },
  { key: 'clinical', count: 11, icon: FolderOpen },
] as const

const benefits = [
  { key: 'save', icon: UploadCloud },
  { key: 'centralize', icon: Archive },
  { key: 'access', icon: FolderOpen },
] as const
</script>

<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="hero-copy">
      <span class="eyebrow">
        <Archive :size="18" />
        {{ t('landing.eyebrow') }}
      </span>
      <h1 id="hero-title">{{ t('landing.title') }}</h1>
      <p>{{ t('landing.description') }}</p>

      <div class="hero-actions">
        <RouterLink class="primary-action" to="/sign-up">
          {{ t('landing.primaryAction') }}
          <ChevronRight :size="18" />
        </RouterLink>
        <RouterLink class="secondary-action" to="/sign-in">
          {{ t('landing.secondaryAction') }}
        </RouterLink>
      </div>
    </div>

    <aside class="vault-panel" aria-label="HealthVault exam vault preview">
      <div class="panel-header">
        <img src="/brand/logo_completo.png" alt="HealthVault" />
        <span>{{ t('landing.panelStatus') }}</span>
      </div>

      <div class="exam-summary">
        <div>
          <span>{{ t('landing.panelTitle') }}</span>
          <strong>36</strong>
          <small>{{ t('landing.uploaded') }}</small>
        </div>
        <UploadCloud :size="38" />
      </div>

      <p class="panel-description">{{ t('landing.panelDescription') }}</p>

      <div class="category-list">
        <article v-for="category in examCategories" :key="category.key" class="category-item">
          <div class="category-icon">
            <component :is="category.icon" :size="18" />
          </div>
          <span>{{ t(`landing.categories.${category.key}`) }}</span>
          <strong>{{ category.count }}</strong>
        </article>
      </div>
    </aside>
  </section>

  <section class="feature-grid" aria-label="HealthVault benefits">
    <article v-for="benefit in benefits" :key="benefit.key" class="feature-card">
      <component :is="benefit.icon" :size="26" />
      <h2>{{ t(`landing.benefits.${benefit.key}.title`) }}</h2>
      <p>{{ t(`landing.benefits.${benefit.key}.text`) }}</p>
    </article>
  </section>
</template>
