<template>
	<div class="application-error-wrapper">
		<div v-if="hasError" class="text-centered mt-8">
			<div>
				<PermissionErrorSvg
					v-if="isPermissionError"
					:svg-width="$vuetify.display.xs ? 200 : undefined"
					fill="rgba(var(--v-theme-primary))"
					data-testid="img-permission"
				/>
				<NotFoundSvg
					v-else-if="isNotFoundError"
					:svg-width="$vuetify.display.xs ? 200 : undefined"
					fill="rgba(var(--v-theme-primary))"
					data-testid="img-notfound"
				/>
				<img v-else :alt="errorText" src="@/assets/img/pc_repair.png" class="repair-image" data-testid="img-generic" />
				<h1 class="text-h2 px-4" data-testid="err-text">
					{{ errorText }}
				</h1>
			</div>
			<v-btn ref="btn-back" class="mt-4" color="primary" variant="flat" data-testid="btn-back" href="/dashboard">
				{{ $t("error.action.back") }}
			</v-btn>
		</div>
		<slot v-else />
	</div>
</template>
<script setup lang="ts">
import NotFoundSvg from "@/assets/img/NotFoundSvg.vue";
import PermissionErrorSvg from "@/assets/img/PermissionErrorSvg.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { useAppStoreRefs } from "@data-app";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const permissionErrorStatusCodes = [HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden];

const { applicationError } = useAppStoreRefs();

const hasError = computed(() => applicationError.value?.status !== undefined);
const errorText = computed(() =>
	hasError.value ? t(applicationError.value?.errorTranslationKey ?? "error.generic") : ""
);

const statusCode = computed(() => applicationError.value?.status);
const isPermissionError = computed(() =>
	statusCode.value ? permissionErrorStatusCodes.includes(statusCode.value) : false
);
const isNotFoundError = computed(() => statusCode.value === HttpStatusCode.NotFound);
</script>
<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
