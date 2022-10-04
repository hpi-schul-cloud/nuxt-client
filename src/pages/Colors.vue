<template>
	<div class="container">
		<div class="row">
			<h1 class="col-sm-12">Colors by vuetify</h1>
		</div>
		<div class="row">
			<palette color="primary"></palette>
			<palette color="secondary"></palette>
			<palette color="accent"></palette>
			<palette color="error"></palette>
			<palette color="info"></palette>
			<palette color="success"></palette>
			<palette color="warning"></palette>
			<palette color="black"></palette>
			<palette color="gray"></palette>
		</div>
	</div>
</template>

<script>
import Palette from "../components/molecules/Palette.vue";

export default {
	components: { Palette },
	layout: "defaultVuetify",
};
</script>

<style scoped>
h1 {
	color: var(--v-primary-base);
}
</style>
