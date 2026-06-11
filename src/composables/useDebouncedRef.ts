import { ref, watch, type Ref } from 'vue'

export function useDebouncedRef<T>(source: Ref<T>, delay = 350) {
  const debounced = ref(source.value) as Ref<T>
  let timeoutId: number | undefined

  watch(
    source,
    (value) => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        debounced.value = value
      }, delay)
    },
    { immediate: true },
  )

  return debounced
}
