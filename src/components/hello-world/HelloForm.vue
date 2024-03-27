<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import DInput from '../ui/DInput.vue'

const emit = defineEmits(['login'])

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string({ required_error: 'This is required' }).min(1).email('This is not an email'),
  }),
)

const { handleSubmit, errors, defineField } = useForm({
  validationSchema,
})

const [email, usernameProps] = defineField('email')

const handleLogin = handleSubmit((values) => {
  emit('login', values)
})
</script>

<template>
  <p>
    Hello Form {{ validationSchema }}
  </p>
  <form class="max-w-sm mx-auto grid gap-4" @submit.prevent="handleLogin">
    <DInput
      v-model="email"
      v-bind="usernameProps"
      label="Username" name="email"
      :error-message="errors.email"
      description="Gib deinen Username ein"
    />
    <p id="debug-input-error" class="my-2 text-xs text-red-600 truncate block">
      <template v-if="errors.email" />
      {{ errors.email }}
    </p>

    <button
      data-testid="submit-button"
      class="bg-gray-200 py-2 px-4 rounded"
    >
      Submit
    </button>
    <p data-testid="result">
      Hello {{ email }}
    </p>
  </form>
</template>
