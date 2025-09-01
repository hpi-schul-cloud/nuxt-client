<template>
	<div>
		<permission-error-svg
			v-if="isPermissionError"
			:svg-width="$vuetify.display.xs ? 200 : undefined"
			fill="rgba(var(--v-theme-primary))"
			data-testid="img-permission"
		/>
		<not-found-svg
			v-else-if="isNotFoundError"
			:svg-width="$vuetify.display.xs ? 200 : undefined"
			fill="rgba(var(--v-theme-primary))"
			data-testid="img-notfound"
		/>
		<img
			v-else
			:alt="errorText"
			src="@/assets/img/pc_repair.png"
			class="repair-image"
			data-testid="img-generic"
		/>
		<h1 class="text-h4 px-4" data-testid="err-text">
			{{ errorText }}
		</h1>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PermissionErrorSvg from "@/assets/img/PermissionErrorSvg.vue";
import NotFoundSvg from "@/assets/img/NotFoundSvg.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { useTitle } from "@vueuse/core";
import { buildPageTitle } from "@/utils/pageTitle";
import { useI18n } from "vue-i18n";

type Props = {
	errorText?: string;
	statusCode?: HttpStatusCode;
};

const props = withDefaults(defineProps<Props>(), {
	errorText: "",
	statusCode: HttpStatusCode.InternalServerError,
});

const { t } = useI18n();

const pageTitle = buildPageTitle(t("error.generic"));
useTitle(pageTitle);

const permissionErrorStatusCodes: HttpStatusCode[] = [
	HttpStatusCode.Unauthorized,
	HttpStatusCode.Forbidden,
];

const isPermissionError = computed(() =>
	permissionErrorStatusCodes.includes(props.statusCode)
);

const isNotFoundError = computed(
	() => props.statusCode === HttpStatusCode.NotFound
);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.repair-image {
	width: 75%;
	height: auto;
	padding: 6rem 1rem;

	@media #{map.get($display-breakpoints, "sm-and-up")} {
		padding: 6rem 1rem;
	}

	@media #{map.get($display-breakpoints, "md-and-up")} {
		height: 320px;
		width: auto;
		padding: 1rem;
	}
}
</style>
