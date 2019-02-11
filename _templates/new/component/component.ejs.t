---
to: "src/components/<%= name.match(/^Base/) ? 'ui/' : '' %><%= name %>.vue"
---
<%
if (blocks.indexOf('template') !== -1) {
%>
<template>
  <div/>
</template>
<%
}

if (blocks.indexOf('script') !== -1) {
%><script>
export default {
  <% if (blocks.indexOf('template') === -1) {
  %>render(h) {
    return <div/>
  }<% } %>
}
</script>
<%
}

if (blocks.indexOf('style') !== -1) {
%>
<style lang="scss" scoped>
@import '@variables';
</style><%
}
%>
