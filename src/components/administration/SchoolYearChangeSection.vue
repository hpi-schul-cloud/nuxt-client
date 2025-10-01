<template>
	<div class="mb-4">
		<p>
			{{
				t("components.administration.schoolYearChangeSection.info.part.one", {
					instance,
				})
			}}
			<i18n-t keypath="components.administration.schoolYearChangeSection.info.part.two" scope="global">
				<a
					data-testid="school-year-change-doc-link"
					href="https://docs.dbildungscloud.de/pages/viewpage.action?pageId=123407337"
					target="_blank"
					rel="noopener"
				>
					{{ t("components.administration.schoolYearChangeSection.info.link") }}
				</a>
			</i18n-t>
		</p>
		<div>
			<div class="step-title">
				<v-icon :icon="mdiNumeric1Circle" size="24px" />
				{{ t("components.administration.schoolYearChangeSection.title.step.one") }}
			</div>
			<div>
				<p>
					{{ t("components.administration.schoolYearChangeSection.description.step.one") }}
				</p>
			</div>
			<div class="d-flex mt-8" data-testid="school-year-change-section-start-transfer">
				<VSpacer />
				<VBtn
					v-if="schoolYearMode !== SchoolYearModeEnum.ACTIVE"
					class="btn"
					:disabled="schoolYearMode !== SchoolYearModeEnum.STANDBY"
					color="primary"
					variant="flat"
					data-testid="start-transfer-button"
					:loading="isLoading"
					@click="startTransfer"
				>
					{{ t("components.administration.schoolYearChangeSection.step.one.button.startTransfer") }}
				</VBtn>
				<VBtn
					v-if="schoolYearMode === SchoolYearModeEnum.ACTIVE"
					class="btn"
					:disabled="true"
					color="success"
					variant="flat"
					data-testid="started-transfer-button"
					:readonly="true"
				>
					{{ t("components.administration.schoolYearChangeSection.step.one.button.transferStarted") }}
				</VBtn>
			</div>
		</div>
		<div>
			<div class="step-title">
				<v-icon :icon="mdiNumeric2Circle" size="24px" />
				{{ t("components.administration.schoolYearChangeSection.title.step.two") }}
			</div>
			<div>
				<p>
					{{ t("components.administration.schoolYearChangeSection.description.step.two") }}
				</p>
			</div>
			<InfoAlert data-testid="info-alert-ldap-data">
				{{ t("components.administration.schoolYearChangeSection.info.step.two") }}
			</InfoAlert>
			<div class="d-flex mt-8" data-testid="school-year-change-section-table-actions">
				<VSpacer />
				<VBtn
					class="btn"
					href="/administration/startldapschoolyear"
					target="_blank"
					:disabled="schoolYearMode !== SchoolYearModeEnum.ACTIVE || isCheckboxConfirmed"
					color="primary"
					variant="outlined"
					data-testid="ldap-data-button"
					:loading="isLoading"
					@click="enableCheckbox()"
				>
					{{ t("components.administration.schoolYearChangeSection.step.two.button") }}
				</VBtn>
			</div>
		</div>
		<div>
			<div class="step-title">
				<v-icon :icon="mdiNumeric3Circle" size="24px" />
				{{ t("components.administration.schoolYearChangeSection.title.step.three") }}
			</div>
			<div>
				<p>
					{{
						t("components.administration.schoolYearChangeSection.description.step.three", {
							instance,
						})
					}}
				</p>
			</div>
			<div class="d-flex mt-8" data-testid="school-year-change-section-table-actions">
				<VCheckbox
					v-model="isCheckboxConfirmed"
					:disabled="!isCheckboxEnabled || schoolYearMode !== SchoolYearModeEnum.ACTIVE"
					data-testId="checkbox-update-data"
					:label="t('components.administration.schoolYearChangeSection.checkbox.step.three')"
					:hide-details="true"
					density="comfortable"
				/>
				<VSpacer />
				<VBtn
					class="btn"
					:disabled="!isCheckboxConfirmed || schoolYearMode !== SchoolYearModeEnum.ACTIVE"
					color="primary"
					variant="flat"
					data-testid="finish-transfer-button"
					:loading="isLoading"
					@click="finishTransferDialog"
				>
					{{ t("components.administration.schoolYearChangeSection.step.three.button") }}
				</VBtn>
			</div>
			<VCustomDialog
				v-model:is-open="isStartDialogOpen"
				has-buttons
				:buttons="['cancel', 'confirm']"
				data-testid="cancel-school-year-change-dialog"
				@dialog-confirmed="confirmSchoolYearChange"
			>
				<template #title>
					{{ t("components.administration.schoolYearChangeSection.dialog.start.title") }}
				</template>
				<template #content>
					{{ t("components.administration.schoolYearChangeSection.dialog.start.content") }}
				</template>
			</VCustomDialog>
			<VCustomDialog
				v-model:is-open="isFinishDialogOpen"
				has-buttons
				:buttons="['cancel', 'confirm']"
				data-testid="finish-school-year-change-dialog"
				@dialog-confirmed="finishTransfer"
			>
				<template #title>
					{{ t("components.administration.schoolYearChangeSection.dialog.finish.title") }}
				</template>
				<template #content>
					{{ t("components.administration.schoolYearChangeSection.dialog.finish.content") }}
				</template>
			</VCustomDialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { MeSchoolResponse } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useEnvConfig } from "@data-env";
import { SchoolYearModeEnum, useSharedSchoolYearChange } from "@data-school";
import { mdiNumeric1Circle, mdiNumeric2Circle, mdiNumeric3Circle } from "@icons/material";
import { InfoAlert } from "@ui-alert";
import { computed, ComputedRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

const { setMaintenanceMode, maintenanceStatus } = useSharedSchoolYearChange();

const school: ComputedRef<MeSchoolResponse | undefined> = computed(() => authModule.getSchool);

const isCheckboxEnabled: Ref<boolean> = ref(false);

const isCheckboxConfirmed: Ref<boolean> = ref(false);

const { t } = useI18n();

const isLoading = ref(false);

const schoolYearMode: ComputedRef<string> = computed(() => {
	const currentTime = new Date();

	let schoolMaintenanceMode = SchoolYearModeEnum.IDLE.valueOf();

	if (maintenanceStatus.value) {
		const maintenanceModeStarts = new Date(maintenanceStatus.value?.currentYear.endDate);

		const twoWeeksFromStart = new Date(maintenanceModeStarts.valueOf());
		twoWeeksFromStart.setDate(twoWeeksFromStart.getDate() - 14);

		if (maintenanceStatus.value.maintenance.active) {
			schoolMaintenanceMode = SchoolYearModeEnum.ACTIVE.valueOf();
		} else if (maintenanceModeStarts && twoWeeksFromStart < currentTime) {
			schoolMaintenanceMode = SchoolYearModeEnum.STANDBY.valueOf();
		}

		return schoolMaintenanceMode;
	}

	return schoolMaintenanceMode;
});

const isFinishDialogOpen: Ref<boolean> = ref(false);

const finishTransferDialog = () => {
	isFinishDialogOpen.value = true;
};

const finishTransfer = async () => {
	if (school.value) {
		await setMaintenanceMode(school.value.id, false);
	}
};

const isStartDialogOpen: Ref<boolean> = ref(false);

const startTransfer = () => {
	isStartDialogOpen.value = true;
};

const confirmSchoolYearChange = async () => {
	if (school.value) {
		await setMaintenanceMode(school.value.id, true);
	}
};

const enableCheckbox = () => {
	isCheckboxEnabled.value = true;
};

const instance = computed(() => useEnvConfig().value.SC_TITLE);
</script>

<style lang="scss" scoped>
.step-title {
	font-size: 19px;
}

.btn {
	width: 175px;
}
</style>
