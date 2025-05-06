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
					v-if="!schoolYearStatus?.maintenance.active"
					class="btn"
					:disabled="
						!schoolYearStatus?.schoolUsesLdap ||
						schoolYearMode !== SchoolYearModeEnum.STANDBY
					"
					color="primary"
					variant="flat"
					data-testid="start-transfer-button"
					:loading="isLoading"
					@click="startTransfer()"
				>
					{{
						t(
							"components.administration.schoolYearChangeSection.step.one.button.startTransfer"
						)
					}}
				</VBtn>
				<VBtn
					v-if="schoolYearStatus?.maintenance.active"
					class="btn"
					:disabled="!schoolYearChangeEnabled"
					color="success"
					variant="flat"
					data-testid="started-transfer-button"
					:loading="isLoading"
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
						schoolYearMode !== SchoolYearModeEnum.ACTIVE ||
						!schoolYearStatus?.maintenance.active ||
						isCheckboxConfirmed
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
				<v-checkbox
					v-model="isCheckboxConfirmed"
					:disabled="
						!isCheckboxEnabled || schoolYearMode === SchoolYearModeEnum.IDLE
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
						!isCheckboxConfirmed || schoolYearMode === SchoolYearModeEnum.IDLE
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
import AuthModule from "@/store/auth";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { computed, ComputedRef, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	mdiNumeric1Circle,
	mdiNumeric2Circle,
	mdiNumeric3Circle,
} from "@icons/material";
import {
	MaintenanceStatus,
	SchoolYearModeEnum,
	useSchoolYearChange,
} from "@data-school";
import { MeSchoolResponse } from "@/serverApi/v3";
import { Ref } from "vue/dist/vue";
import VCustomDialog from "../organisms/vCustomDialog.vue";
import { useErrorNotification } from "@util-error-notification";
import EnvConfigModule from "../../store/env-config";
import { InfoAlert } from "@ui-alert";

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const envConfigModule: EnvConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const { fetchSchoolYearStatus, maintenanceStatus, setMaintenanceMode, error } =
	useSchoolYearChange();

useErrorNotification(error);

const school: ComputedRef<MeSchoolResponse | undefined> = computed(() => {
	return authModule.getSchool;
});

onMounted(async () => {
	if (school.value?.id) {
		await fetchSchoolYearStatus(school.value?.id);
	}
});

const schoolYearStatus: ComputedRef<MaintenanceStatus | undefined> = computed(
	() => {
		return maintenanceStatus.value;
	}
);

const isCheckboxEnabled: Ref<boolean> = ref(false);

const isCheckboxConfirmed: Ref<boolean> = ref(false);

const { t } = useI18n();

const isLoading = ref(false);

const schoolYearMode: ComputedRef<string> = computed(() => {
	const currentTime = new Date();

	let schoolMaintananceMode = "idle";

	if (schoolYearStatus.value) {
		const maintananceModeStarts = new Date(
			schoolYearStatus.value?.currentYear.endDate
		);

		const twoWeeksFromStart = new Date(maintananceModeStarts.valueOf());
		twoWeeksFromStart.setDate(twoWeeksFromStart.getDate() - 14);

		if (schoolYearStatus.value.maintenance.active) {
			schoolMaintananceMode = "active";
		} else if (maintananceModeStarts && twoWeeksFromStart < currentTime) {
			schoolMaintananceMode = "standby";
		}

		return schoolMaintananceMode;
	}

	return schoolMaintananceMode;
});

const schoolYearChangeEnabled: ComputedRef<boolean> = computed(() => {
	return schoolYearMode.value === SchoolYearModeEnum.STANDBY;
});

const finishTransfer = async () => {
	if (school.value) {
		await setMaintenanceMode(school.value?.id, false);
	}
};

const isDialogOpen: Ref<boolean> = ref(false);

const startTransfer = () => {
	isDialogOpen.value = true;
};

const confirmSchoolYearChange = async () => {
	await setMaintenanceMode(school.value!.id, true);
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
