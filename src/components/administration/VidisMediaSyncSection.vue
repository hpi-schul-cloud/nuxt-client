<template>
	<div class="mb-4">
		<h3>
			{{ $t("components.administration.externalToolsSection.vidis.title") }}
		</h3>
		<p>
			{{
				$t("components.administration.externalToolsSection.vidis.description")
			}}
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
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useSchoolLicenseApi } from "@data-license";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { notifyError, notifyInfo, notifySuccess } from "@data-app";

const { t } = useI18n();
const { updateSchoolLicenses } = useSchoolLicenseApi();

const isLoading = ref(false);

const updateVidisLicenses = async () => {
	isLoading.value = true;

	try {
		await updateSchoolLicenses();

		notifySuccess(
			t(
				"components.administration.externalToolsSection.vidis.notification.success"
			)
		);
	} catch (errorResponse: unknown) {
		const apiError = mapAxiosErrorToResponseError(errorResponse);

		if (apiError.code === HttpStatusCode.RequestTimeout) {
			notifyInfo(
				t(
					"components.administration.externalToolsSection.vidis.notification.timeout"
				)
			);
		} else {
			notifyError(t("common.notification.error"));
		}
	}

	isLoading.value = false;
};
</script>
