---
to: "tests/unit/layouts/<%= name %>.unit.js"
---
import <%= name %> from '@layouts/<%= name %>'

describe('@layouts/<%= name %>', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(<%= name %>, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
