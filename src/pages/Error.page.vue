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
					{{ translatedErrorMessage }}
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
					{{ $t("error.action.back") }}
				</v-btn>
			</slot>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, inject } from "@vue/composition-api";
import ApplicationErrorModule from "@store/application-error";
import { defineComponent, useMeta } from "@nuxtjs/composition-api";
import VueI18n from "vue-i18n";
import Theme from "@theme/config";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	head: {},
	setup() {
		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
			"applicationErrorModule"
		);
		const i18n = inject<VueI18n | undefined>("i18n");
		if (applicationErrorModule === undefined || i18n === undefined) {
			return;
		}

		useMeta({
			title: i18n.t("error.generic").toString() + " - " + Theme.short_name,
		});

		const onBackClick = () => {
			window.location.assign("/dashboard");
		};

		const applicationError = computed(() => {
			return applicationErrorModule.getError;
		});

		const translatedErrorMessage = computed(() => {
			const appErrorValue = applicationError.value;
			if (appErrorValue === null) {
				return "";
			}

			const translatedError = i18n.t(appErrorValue.translationKey).toString();

			return translatedError !== appErrorValue.translationKey
				? translatedError
				: i18n.t("error.generic").toString();
		});

		return {
			onBackClick,
			applicationError,
			translatedErrorMessage,
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
