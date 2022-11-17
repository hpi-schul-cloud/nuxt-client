<template>
	<div v-if="applicationError" class="text-centered">
		<base-image
			v-if="applicationError.statusCode === 400"
			img-src="@assets/img/permission-error.svg"
			img-height="300px"
			fill="var(--v-primary-base)"
			role="presentation"
		/>
		<base-image
			v-if="applicationError.statusCode === 401"
			img-src="@assets/img/permission-error.svg"
			img-height="300px"
			fill="var(--v-primary-base)"
			role="presentation"
		/>
		<base-image
			v-if="applicationError.statusCode === 403"
			img-src="@assets/img/permission-error.svg"
			img-height="300px"
			fill="var(--v-primary-base)"
			role="presentation"
		/>
		<img
			v-if="applicationError.statusCode === 500"
			role="presentation"
			alt=""
			src="@assets/img/pc_repair.png"
			class="error-img"
		/>
		<img
			v-if="!applicationError.statusCode"
			role="presentation"
			alt=""
			src="@assets/img/pc_repair.png"
			class="error-img"
		/>

		<h1 class="error-msg">
			<template v-if="applicationError.message">
				{{ applicationError.message }}
			</template>
			<template v-else> {{ $t("error.generic") }} </template>
		</h1>
		<slot name="action">
			<v-btn color="primary" depressed @click="onBackClick">
				<!-- {{ $t("error.action.back") }} -->

				<!-- TODO: ask UXies -->
				Go to Dashboard
			</v-btn>
		</slot>
	</div>
</template>
<script>
import { applicationErrorModule } from "@/store";
export default {
	props: {},
	data() {
		// This solely exists to appear in the coverage report
		return {
			error: {},
		};
	},
	computed: {
		applicationError() {
			return applicationErrorModule.getError;
		},
	},
	destroyed() {
		applicationErrorModule.resetError();
	},
	methods: {
		onBackClick() {
			this.$router.push("/dashboard");
			applicationErrorModule.resetError();
		},
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
