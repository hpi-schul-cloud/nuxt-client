---
to: "src/components/<%= name.match(/^Base/) ? 'ui/' : '' %><%= name %>.unit.js"
---
import <%= name %> from './<%= name %>'

describe('@components/<%= name %>', () => {
  it('exports a valid component', () => {
    expect(<%= name %>).toBeAComponent()
  })
})
