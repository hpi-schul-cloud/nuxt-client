<template>
	<div class="text-centered">
		<base-image
			v-if="error.statusCode === 404"
			img-src="@assets/img/pageNotFound.svg"
			img-height="300px"
			fill="var(--color-primary)"
			role="presentation"
		/>
		<img v-else role="presentation" alt="" src="@assets/img/pc_repair.png" />

		<h1 class="error-msg">
			<template v-if="error.message">
				{{ error.message }}
			</template>
			<template v-else-if="error.statusCode === 404">
				Die Seite wurde leider nicht gefunden
			</template>
			<template v-else> Ein Fehler ist aufgetreten </template>
		</h1>
		<slot name="action">
			<base-button design="primary" @click="$router.go(-1)">
				{{ $t("error.action.back") }}
			</base-button>
		</slot>
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
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.text-centered {
	text-align: center;
}
h1.error-msg {
	margin-bottom: var(--space-lg);
}
</style>
