<template>
  <figure class="image is-4by3">
    <slot/>
  </figure>
</template>

<script>
export default {
  name: 'CardHeaderImage'
}
</script>

<style scoped>
.image {
  margin: -16px;
  margin-bottom: 0;
}
</style>
