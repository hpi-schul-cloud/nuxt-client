---
to: "pages<%= route %>/index.unit.js"
---
<%
  const fileName = route.replace(/^.*[\\\/]/, '');
%>import <%= fileName %> from './index.vue'

describe('@pages<%= route %>', () => {
  it('is a valid view', () => {
    expect(<%= fileName %>).toBeAViewComponent()
  })
})
