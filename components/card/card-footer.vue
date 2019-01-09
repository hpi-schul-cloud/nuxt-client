<template>
  <div class="customcard-footer">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CardFooter'
}
</script>

<style scoped>
.customcard-footer {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
