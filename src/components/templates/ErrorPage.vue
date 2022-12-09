<template>
	<div class="text-centered">
		<bird-searching-map
			v-if="error.statusCode === 404"
			fill="var(--v-primary-base)"
			:style="{ maxHeight: '300px' }"
			role="presentation"
		/>
		<img
			v-else
			role="presentation"
			alt=""
			src="@/assets/img/pc_repair.png"
			class="error-img"
		/>

		<h1 class="error-msg">
			<template v-if="error.message">
				{{ error.message }}
			</template>
			<template v-else> Ein Fehler ist aufgetreten </template>
		</h1>
		<slot name="action">
			<v-btn color="primary" depressed @click="$router.go(-1)">
				{{ $t("error.action.back") }}
			</v-btn>
		</slot>
	</div>
</template>
<script>
import birdSearchingMap from "@/components/atoms/bird-image/birdSearchingMap.vue";

export default {
	components: {
		birdSearchingMap,
	},
	props: {
		error: {
			type: Object,
			required: true,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}

h1.error-msg {
	margin-bottom: var(--space-lg);
}

.error-img {
	margin-top: var(--space-xl-4);
}
</style>
