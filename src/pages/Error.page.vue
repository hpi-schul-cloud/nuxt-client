<template>
	<div class="text-centered">
		<div v-if="applicationError">
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
		</div>
		<div v-else>
			<img
				role="presentation"
				alt=""
				src="@assets/img/pc_repair.png"
				class="error-img"
			/>
		</div>
		<div>
			<h1 class="error-msg">
				<template v-if="applicationError">
					{{ applicationError.message }}
				</template>
				<template v-else> {{ $t("error.generic") }} </template>
			</h1>
			<slot name="action">
				<v-btn
					color="primary"
					depressed
					data-testid="btn-back"
					@click="onBackClick"
				>
					<!-- {{ $t("error.action.back") }} -->

					<!-- TODO: ask UXies -->
					Go to Dashboard
				</v-btn>
			</slot>
		</div>
	</div>
</template>
<script>
import {
	defineComponent,
	computed,
	onUnmounted,
	inject,
} from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	setup() {
		const applicationErrorModule = inject("application-error");
		const onBackClick = () => {
			window.location.assign("/dashboard");
			applicationErrorModule.resetError();
		};

		const applicationError = computed(() => {
			return applicationErrorModule.getError;
		});

		onUnmounted(() => applicationErrorModule.resetError());

		return {
			onBackClick,
			applicationError,
		};
	},
});
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
