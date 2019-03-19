---
# currently disabled, because the nuxt router crashes with unit files
to: "<%= false ? (`src/pages${route}/index.unit.js`) : null %>"
---
<%
  const fileName = route.replace(/^.*[\\\/]/, '');
%>import <%= fileName %> from './index.vue'

describe('@pages<%= route %>', () => {
  it('is a valid view', () => {
    expect(<%= fileName %>).toBeAViewComponent()
  })
})
