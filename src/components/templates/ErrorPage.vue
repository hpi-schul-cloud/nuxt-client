<template>
	<div class="container">
		<img alt="PC-Reparatur" src="@assets/img/pc_repair.png" />

		<h1 class="error-msg">
			<template v-if="error.message">
				{{ error.message }}
			</template>
			<template v-else-if="error.statusCode === 404">
				Die Seite wurde leider nicht gefunden
			</template>
			<template v-else>
				Ein Fehler ist aufgetreten
			</template>
		</h1>
		<base-button design="primary" @click="$router.go(-1)">
			Hier geht es zurück
		</base-button>
	</div>
</template>
<script>
export default {
	props: {
		error: {
			type: Object,
			default: () => ({
				statusCode: 404,
			}),
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	text-align: center;
}
h1.error-msg {
	margin-bottom: var(--space-lg);
	text-align: center;
}
</style>
