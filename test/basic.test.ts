import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<img src="https://res.cloudinary.com/ddtc5sowb/image/upload/c_limit,w_987/f_png/q_auto/cld-sample-5.jpg?_a=ATAPpWI0" width="987" height="987" sizes="50vw" alt="Sample Product">')
    expect(html).toContain('<p>https://res.cloudinary.com/ddtc5sowb/image/upload/f_auto/q_auto/v1//cld-sample-5.jpg?_a=ATAPpWI0</p>')
  })
})
