import { mount } from '@vue/test-utils'
import ShowCard from './ShowCard.vue'

// Mock vue-router using vi.hoisted to ensure it's available before imports
const { pushMock } = vi.hoisted(() => {
  return { pushMock: vi.fn() }
})

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('ShowCard.vue', () => {
  const defaultProps = {
    id: 123,
    title: 'Test Show',
    genre: 'Drama',
    rating: '8.5',
    image: 'http://example.com/image.jpg',
  }

  it('renders show information correctly', () => {
    const wrapper = mount(ShowCard, {
      props: defaultProps,
    })

    expect(wrapper.find('img').attributes('src')).toBe(defaultProps.image)
    expect(wrapper.find('img').attributes('alt')).toBe(defaultProps.title)
    expect(wrapper.text()).toContain(defaultProps.genre)
    expect(wrapper.text()).toContain(`${defaultProps.rating} ⭐`)
  })

  it('navigates to details page on click', async () => {
    const wrapper = mount(ShowCard, {
      props: defaultProps,
    })

    await wrapper.find('button').trigger('click')

    expect(pushMock).toHaveBeenCalledWith(`/details/${defaultProps.id}`)
  })

  it('renders without image if not provided', () => {
    const propsNoImage = { ...defaultProps, image: undefined }
    const wrapper = mount(ShowCard, {
      props: propsNoImage,
    })

    expect(wrapper.find('img').exists()).toBe(true) // It still renders an img tag
    expect(wrapper.find('img').attributes('src')).toBeUndefined()
  })
})
