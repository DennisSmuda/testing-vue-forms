import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { defineRule } from 'vee-validate'
import { ERRORS } from '../../messages/errors'
import HelloForm from './HelloForm.vue'

defineRule('required', vi.fn())

describe('hello form', () => {
  it('should render a form', async () => {
    // test logic
    const EMAIL = 'smuda.dennis@gmail.com'
    const wrapper = mount(HelloForm)
    const button = wrapper.get('[data-testid="submit-button"]')
    const input = wrapper.get('#email')

    await input.trigger('input')
    await button.trigger('click')

    await flushPromises()
    await waitForExpect(() => {
      const error = wrapper.get('#email-input-error')
      expect(error.text()).toBe(ERRORS.required)
    })

    input.setValue('dennissmuda')
    await input.trigger('input')

    await flushPromises()
    await waitForExpect(() => {
      const error = wrapper.get('#email-input-error')
      expect(error.text()).toBe(ERRORS.invalidEmail)
    })

    input.setValue(EMAIL)
    await input.trigger('input')

    const resultText = wrapper.get('[data-testid="result"]')
    expect(resultText.text()).toBe(`Hello ${EMAIL}`)
  })
})
