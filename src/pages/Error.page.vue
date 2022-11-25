<template>
	<div class="text-centered mt-8">
		<div v-if="appErrorStatusCode">
			<permission-error-svg
				v-if="
					appErrorStatusCode === 400 ||
					appErrorStatusCode === 401 ||
					appErrorStatusCode === 403
				"
				:svg-width="$vuetify.breakpoint.xs ? 200 : null"
				fill="var(--v-primary-base)"
			/>

			<img
				v-if="appErrorStatusCode === 500"
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
			<h1 class="h4 error-msg pa-4">
				<template v-if="appErrorStatusCode">
					{{ translatedErrorMessage }}
				</template>
				<template v-else> {{ $t("error.generic") }} </template>
			</h1>
			<slot name="action">
				<v-btn
					class="mt-4"
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
import { computed, inject, defineComponent } from "@vue/composition-api";
import ApplicationErrorModule from "@store/application-error";
import { useMeta } from "@nuxtjs/composition-api";
import VueI18n from "vue-i18n";
import Theme from "@theme/config";
import PermissionErrorSvg from "@assets/img/PermissionErrorSvg.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	components: {
		PermissionErrorSvg,
	},
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
			title: i18n?.t("error.generic").toString() + " - " + Theme.short_name,
		});

		const onBackClick = () => {
			window.location.assign("/dashboard");
		};

		const appErrorTranslationKey = computed(() => {
			return applicationErrorModule.getTranslationKey;
		});
		const appErrorStatusCode = computed(() => {
			return applicationErrorModule.getStatusCode;
		});

		const translatedErrorMessage = computed(() => {
			const translationKey = appErrorTranslationKey.value;

			if (translationKey === "") return translationKey;

			const translatedError = i18n.t(translationKey).toString();

			const result =
				translatedError !== translationKey
					? translatedError
					: i18n.t("error.generic").toString();
			return result;
		});

		return {
			onBackClick,
			appErrorStatusCode,
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
