<template>
	<div class="mb-4">
		<h3>
			{{ $t("components.administration.externalToolsSection.vidis.title") }}
		</h3>
		<p>
			{{ $t("components.administration.externalToolsSection.vidis.description") }}
		</p>
		<div class="d-flex mt-8" data-testid="external-tool-section-table-actions">
			<VSpacer />
			<VBtn
				color="primary"
				variant="flat"
				data-testid="sync-vidis-media-button"
				:loading="isLoading"
				@click="updateVidisLicenses"
			>
				{{ $t("components.administration.externalToolsSection.action.sync") }}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import NotifierModule from "@/store/notifier";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useSchoolLicenseApi } from "@data-license";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { t } = useI18n();
const { updateSchoolLicenses } = useSchoolLicenseApi();

const isLoading = ref(false);

const updateVidisLicenses = async () => {
	isLoading.value = true;

	try {
		await updateSchoolLicenses();

		notifierModule.show({
			status: "success",
			text: t("components.administration.externalToolsSection.vidis.notification.success"),
		});
	} catch (errorResponse: unknown) {
		const apiError = mapAxiosErrorToResponseError(errorResponse);

		if (apiError.code === HttpStatusCode.RequestTimeout) {
			notifierModule.show({
				status: "info",
				text: t("components.administration.externalToolsSection.vidis.notification.timeout"),
			});
		} else {
			notifierModule.show({
				status: "error",
				text: t("common.notification.error"),
			});
		}
	}

	isLoading.value = false;
};
</script>
