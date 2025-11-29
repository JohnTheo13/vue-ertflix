import { mount } from '@vue/test-utils'
import ShowRow from './ShowRow.vue'

// Mock ShowCard component to avoid testing child implementation
vi.mock('~/components/ShowCard.vue', () => ({
  default: {
    template: '<div class="mock-show-card" data-testid="show-card"></div>',
    props: ['title', 'id'],
  },
}))

describe('ShowRow.vue', () => {
  const mockItems = [
    {
      id: 1,
      name: 'Show 1',
      genres: ['Drama'],
      rating: { average: 8.0 },
      image: { medium: 'img1.jpg' },
    },
    {
      id: 2,
      name: 'Show 2',
      genres: ['Comedy'],
      rating: { average: 7.5 },
      image: { medium: 'img2.jpg' },
    },
  ]

  const defaultProps = {
    title: 'Trending Now',
    items: mockItems as any[],
  }

  it('renders the title correctly', () => {
    const wrapper = mount(ShowRow, {
      props: defaultProps,
    })

    expect(wrapper.find('h2').text()).toBe('Trending Now')
  })

  it('renders the correct number of ShowCards', () => {
    const wrapper = mount(ShowRow, {
      props: defaultProps,
    })

    const cards = wrapper.findAll('[data-testid="show-card"]')
    expect(cards).toHaveLength(mockItems.length)
  })

  it('shows scroll buttons based on scroll state', async () => {
    // Mock layout properties to simulate scrollable content
    const originalScrollWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'scrollWidth',
    )
    const originalClientWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientWidth',
    )

    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 1000,
    })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: 500,
    })

    const wrapper = mount(ShowRow, {
      props: defaultProps,
    })

    // By default in the component: canScrollLeft = false, canScrollRight = true
    // With our mocks: 0 + 500 < 1000 - 1 => true
    expect(wrapper.find('.scroll-btn.left').exists()).toBe(false)
    expect(wrapper.find('.scroll-btn.right').exists()).toBe(true)

    // Cleanup
    if (originalScrollWidth)
      Object.defineProperty(
        HTMLElement.prototype,
        'scrollWidth',
        originalScrollWidth,
      )
    if (originalClientWidth)
      Object.defineProperty(
        HTMLElement.prototype,
        'clientWidth',
        originalClientWidth,
      )
  })
})
