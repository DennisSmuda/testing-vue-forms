<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import DInput from '../ui/DInput.vue'
import { ERRORS } from '../../messages/errors'

const emit = defineEmits(['login'])

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, ERRORS.required).email(ERRORS.invalidEmail),
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
