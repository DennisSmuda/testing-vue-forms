<script setup lang="ts">
import { type ComputedRef, computed, ref } from 'vue'
// import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useVModel } from '@vueuse/core'

export interface FInputProps {
  label?: string
  name: string
  title?: string
  placeholder?: string
  type?: string
  modelValue?: string | undefined
  errorMessage?: string
  description?: string
  disabled?: boolean
  autocomplete?: string
}

const props = defineProps<FInputProps>()

const emit = defineEmits(['update:modelValue', 'blur'])
const input = ref<HTMLElement | null>(null)

function focus() {
  input.value?.focus()
}

defineExpose({ focus })

const hasInputError: ComputedRef<boolean> = computed(() => Boolean(props.errorMessage))

const data = useVModel(props, 'modelValue', emit)
</script>

<template>
  <label :for="props.name" class="flex flex-col">
    <span class="text-gray-900 font-medium text-sm mb-2 block">{{ label }}</span>

    <div class="relative">

      <input
        :id="name"
        ref="input"
        :value="data"
        :type="type || 'text'"
        :title="title"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-invalid="hasInputError"
        :class="hasInputError ? ['text-red-900', 'ring-red-300', 'placeholder:text-red-300', 'focus:ring-red-500'] : []"
        class="text-lg h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
        :autocomplete="autocomplete ?? 'on'"
        @input="data = ($event.target as HTMLInputElement).value"
      >
    </div>

    <p :id="`${props.name}-input-error`" class="my-2 text-xs text-red-600 truncate block">
      <template v-if="hasInputError">
        <!-- <ExclamationTriangleIcon class="h-4 w-4 text-red-500 inline align-bottom" /> -->
        {{ errorMessage }}
      </template>
    </p>

    <p v-if="props.description" :id="`${props.name}-input-description`" class="text-xs text-gray-500 block">
      {{ description }}
    </p>
  </label>
</template>
