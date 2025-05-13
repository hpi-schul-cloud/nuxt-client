<template>
	<div class="mb-4">
		<p>
			{{
				t("components.administration.schoolYearChangeSection.info.part.one", {
					instance,
				})
			}}
			<i18n-t
				keypath="components.administration.schoolYearChangeSection.info.part.two"
				scope="global"
			>
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
				{{
					t("components.administration.schoolYearChangeSection.title.step.one")
				}}
			</div>
			<div>
				<p>
					{{
						t(
							"components.administration.schoolYearChangeSection.description.step.one"
						)
					}}
				</p>
			</div>
			<div
				class="d-flex mt-8"
				data-testid="school-year-change-section-start-transfer"
			>
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
					{{
						t(
							"components.administration.schoolYearChangeSection.step.one.button.startTransfer"
						)
					}}
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
					{{
						t(
							"components.administration.schoolYearChangeSection.step.one.button.transferStarted"
						)
					}}
				</VBtn>
			</div>
		</div>
		<div>
			<div class="step-title">
				<v-icon :icon="mdiNumeric2Circle" size="24px" />
				{{
					t("components.administration.schoolYearChangeSection.title.step.two")
				}}
			</div>
			<div>
				<p>
					{{
						t(
							"components.administration.schoolYearChangeSection.description.step.two"
						)
					}}
				</p>
			</div>
			<InfoAlert data-testid="info-alert-ldap-data">
				{{
					t("components.administration.schoolYearChangeSection.info.step.two")
				}}
			</InfoAlert>
			<div
				class="d-flex mt-8"
				data-testid="school-year-change-section-table-actions"
			>
				<VSpacer />
				<VBtn
					class="btn"
					href="/administration/startldapschoolyear"
					target="_blank"
					:disabled="
						schoolYearMode !== SchoolYearModeEnum.ACTIVE || isCheckboxConfirmed
					"
					color="primary"
					variant="outlined"
					data-testid="ldap-data-button"
					:loading="isLoading"
					@click="enableCheckbox()"
				>
					{{
						t(
							"components.administration.schoolYearChangeSection.step.two.button"
						)
					}}
				</VBtn>
			</div>
		</div>
		<div>
			<div class="step-title">
				<v-icon :icon="mdiNumeric3Circle" size="24px" />
				{{
					t(
						"components.administration.schoolYearChangeSection.title.step.three"
					)
				}}
			</div>
			<div>
				<p>
					{{
						t(
							"components.administration.schoolYearChangeSection.description.step.three",
							{
								instance,
							}
						)
					}}
				</p>
			</div>
			<div
				class="d-flex mt-8"
				data-testid="school-year-change-section-table-actions"
			>
				<VCheckbox
					v-model="isCheckboxConfirmed"
					:disabled="
						!isCheckboxEnabled || schoolYearMode !== SchoolYearModeEnum.ACTIVE
					"
					data-testId="checkbox-update-data"
					:label="
						t(
							'components.administration.schoolYearChangeSection.checkbox.step.three'
						)
					"
					:hide-details="true"
					density="comfortable"
				/>
				<VSpacer />
				<VBtn
					class="btn"
					:disabled="
						!isCheckboxConfirmed || schoolYearMode !== SchoolYearModeEnum.ACTIVE
					"
					color="primary"
					variant="flat"
					data-testid="finish-transfer-button"
					:loading="isLoading"
					@click="finishTransfer"
				>
					{{
						t(
							"components.administration.schoolYearChangeSection.step.three.button"
						)
					}}
				</VBtn>
			</div>
			<div data-testid="cancel-school-year-change-dialog-wrapper">
				<VCustomDialog
					v-model:is-open="isDialogOpen"
					has-buttons
					:buttons="['cancel', 'confirm']"
					data-testid="cancel-school-year-change-dialog"
					@dialog-confirmed="confirmSchoolYearChange"
				>
					<template #title>
						{{
							t(
								"components.administration.schoolYearChangeSection.dialog.title"
							)
						}}
					</template>
					<template #content>
						{{
							t(
								"components.administration.schoolYearChangeSection.dialog.content"
							)
						}}
					</template>
				</VCustomDialog>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { MeSchoolResponse } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { SchoolYearModeEnum, useSharedSchoolYearChange } from "@data-school";
import {
	mdiNumeric1Circle,
	mdiNumeric2Circle,
	mdiNumeric3Circle,
} from "@icons/material";
import { InfoAlert } from "@ui-alert";
import { useErrorNotification } from "@util-error-notification";
import { computed, ComputedRef, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const envConfigModule: EnvConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const { setMaintenanceMode, error, maintenanceStatus } =
	useSharedSchoolYearChange();

useErrorNotification(error);

const school: ComputedRef<MeSchoolResponse | undefined> = computed(() => {
	return authModule.getSchool;
});

const isCheckboxEnabled: Ref<boolean> = ref(false);

const isCheckboxConfirmed: Ref<boolean> = ref(false);

const { t } = useI18n();

const isLoading = ref(false);

const schoolYearMode: ComputedRef<string> = computed(() => {
	const currentTime = new Date();

	let schoolMaintenanceMode = "idle";

	if (maintenanceStatus.value) {
		const maintenanceModeStarts = new Date(
			maintenanceStatus.value?.currentYear.endDate
		);

		const twoWeeksFromStart = new Date(maintenanceModeStarts.valueOf());
		twoWeeksFromStart.setDate(twoWeeksFromStart.getDate() - 14);

		if (maintenanceStatus.value.maintenance.active) {
			schoolMaintenanceMode = "active";
		} else if (maintenanceModeStarts && twoWeeksFromStart < currentTime) {
			schoolMaintenanceMode = "standby";
		}

		return schoolMaintenanceMode;
	}

	return schoolMaintenanceMode;
});

const finishTransfer = async () => {
	if (school.value) {
		await setMaintenanceMode(school.value.id, false);

		notifierModule.show({
			text: t(
				"components.administration.schoolYearChangeSection.notification.finish.success"
			),
			status: "success",
		});
	}
};

const isDialogOpen: Ref<boolean> = ref(false);

const startTransfer = () => {
	isDialogOpen.value = true;
};

const confirmSchoolYearChange = async () => {
	if (school.value) {
		await setMaintenanceMode(school.value.id, true);

		notifierModule.show({
			text: t(
				"components.administration.schoolYearChangeSection.notification.start.success"
			),
			status: "success",
		});
	}
};

const enableCheckbox = () => {
	isCheckboxEnabled.value = true;
};

const instance = envConfigModule.getEnv.SC_TITLE;
</script>

<style lang="scss" scoped>
.step-title {
	font-size: 19px;
}

.btn {
	width: 175px;
}
</style>
