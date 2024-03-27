import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloForm from './HelloForm.vue'

describe('hello form', () => {
  it('should render a form', async () => {
    // test logic
    const wrapper = mount(HelloForm)
    const button = wrapper.get('[data-testid="submit-button"]')
    const input = wrapper.get('#email')

    input.setValue('')
    await input.trigger('input')
    button.trigger('click')
    const error = wrapper.get('#debug-input-error')
    console.log('error', error)

    expect(error.text()).toBe('error')

    input.setValue('World')
    await input.trigger('input')

    const resultText = wrapper.get('[data-testid="result"]')
    expect(resultText.text()).toBe('Hello World')
  })
})
