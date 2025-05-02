<template>
	<div class="mb-4">
		<p>
			{{ t("components.administration.schoolYearChangeSection.info") }}
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
					:disabled="
						!schoolYearStatus?.schoolUsesLdap ||
						schoolYearMode !== SchoolYearModeEnum.STANDBY
					"
					color="primary"
					variant="flat"
					data-testid="-button"
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
					:disabled="!schoolYearChangeEnabled"
					color="success"
					variant="flat"
					data-testid="-button"
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
			<div
				class="d-flex mt-8"
				data-testid="school-year-change-section-table-actions"
			>
				<VSpacer />
				<VBtn
					href="/administration/startldapschoolyear"
					target="_blank"
					:disabled="
						!schoolYearMode === SchoolYearModeEnum.ACTIVE ||
						!schoolYearStatus?.maintenance.active ||
						isCheckboxConfirmed
					"
					color="primary"
					variant="outlined"
					data-testid="-button"
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
							"components.administration.schoolYearChangeSection.description.step.three"
						)
					}}
				</p>
			</div>
			<div
				class="d-flex mt-8"
				data-testid="school-year-change-section-table-actions"
			>
				<v-checkbox
					:disabled="
						!isCheckboxEnabled || schoolYearMode === SchoolYearModeEnum.IDLE
					"
					v-model="isCheckboxConfirmed"
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
					:disabled="
						!isCheckboxConfirmed || schoolYearMode === SchoolYearModeEnum.IDLE
					"
					color="primary"
					variant="flat"
					data-testid="-button"
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
								"components.administration.adminMigrationSection.migrationWizardCancelDialog.Title"
							)
						}}
					</template>
					<template #content>
						{{
							t(
								"components.administration.adminMigrationSection.migrationWizardCancelDialog.Description"
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
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { computed, ComputedRef, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
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
import { MeSchoolResponse } from "../../serverApi/v3";
import { Ref } from "vue/dist/vue";
import VCustomDialog from "../organisms/vCustomDialog.vue";

const envConfigModule: EnvConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

const router = useRouter();

const { fetchSchoolYearStatus, maintenanceStatus, setMaintenanceMode } =
	useSchoolYearChange();

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
		console.log(maintenanceStatus.value);
		return maintenanceStatus.value;
	}
);

const isCheckboxEnabled: Ref<boolean> = ref(false);

const isCheckboxConfirmed: Ref<boolean> = ref(false);

const { t } = useI18n();

const isLoading = ref(false);

const schoolYearMode: ComputedRef<string> = computed(() => {
	const currentTime = new Date();
	console.log(currentTime);

	//nicht im SchuljahresModus
	let schoolMaintananceMode = "idle";

	if (schoolYearStatus.value) {
		const maintananceModeStarts = new Date(
			schoolYearStatus.value?.currentYear.endDate
		);
		console.log(maintananceModeStarts);
		const twoWeeksFromStart = new Date(maintananceModeStarts.valueOf());
		twoWeeksFromStart.setDate(twoWeeksFromStart.getDate() - 14);
		if (schoolYearStatus.value.maintenance.active) {
			//transfer gestartet
			schoolMaintananceMode = "active";
		} else if (maintananceModeStarts && twoWeeksFromStart < currentTime) {
			//zwei wochen vor Schuljahreswechsel
			console.log("maintananceModeStarts", maintananceModeStarts);
			console.log("twoWeeksFromStart", twoWeeksFromStart);
			console.log("currentTime", currentTime);
			schoolMaintananceMode = "standby";
		}
		console.log(schoolMaintananceMode);
		return schoolMaintananceMode;
	}

	return schoolMaintananceMode;
});

const schoolYearChangeEnabled: ComputedRef<boolean> = computed(() => {
	return schoolYearMode.value === SchoolYearModeEnum.STANDBY;
});

const finishTransfer = () => {
	if (school.value) {
		setMaintenanceMode(school.value?.id, false);
	}
};

const isDialogOpen: Ref<boolean> = ref(false);

const startTransfer = () => {
	isDialogOpen.value = true;
};

const confirmSchoolYearChange = async () => {
	isCheckboxEnabled.value = false;
	await setMaintenanceMode(school.value?.id, true);
};

const enableCheckbox = () => {
	isCheckboxEnabled.value = true;
};

const redirectToLDAPPage = () => {
	window.open("/administration/startldapschoolyear", "_blank");
	/*router.push({
		path: "/administration/startldapschoolyear",
	});*/
};

const startLdapDataValidation = () => {
	//isLoading.value = true;
	redirectToLDAPPage();
};
</script>

<style lang="scss" scoped>
.step-title {
	font-size: 19px;
}
</style>
