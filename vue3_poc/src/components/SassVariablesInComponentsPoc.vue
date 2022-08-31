<template>
	<div class="card">Sass vars</div>
</template>

<script>
export default {
	name: "SassVariablesInComponentsPoc",
};
</script>

<style scoped lang="scss">
//@use "vuetify";
@import "@/styles/variables.scss";

.card {
	//@extend .rounded-sm;
	//@extend .text-red-darken-4;
}
</style>
