<template>
	<section>
		<h4 class="text-h4 mb-6">
			{{ t("common.words.privacyPolicy") }}
		</h4>
		<v-alert
			v-if="status === 'error'"
			light
			prominent
			text
			type="error"
			class="mb-6"
			data-testid="error-alert"
		>
			{{ t("pages.administration.school.index.schoolPolicy.error") }}
		</v-alert>
		<template v-else>
			<v-progress-linear
				v-if="status === 'pending'"
				indeterminate
				class="mb-6"
				data-testid="progress-bar"
			/>
			<v-list-item
				v-else
				two-line
				dense
				class="mb-6"
				data-testid="policy-item"
				@click="downloadFile"
				:class="{ 'item-no-action': !privacyPolicy }"
				:ripple="privacyPolicy !== null"
			>
				<v-list-item-icon class="me-4">
					<v-icon>$file_pdf_outline</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title class="text-body-1 black--text mb-2">
						{{ t("pages.administration.school.index.schoolPolicy.fileName") }}
					</v-list-item-title>
					<v-list-item-subtitle class="text-body-2">
						<template v-if="privacyPolicy">
							{{
								t("pages.administration.school.index.schoolPolicy.uploadedOn", {
									date: dayjs(privacyPolicy.publishedAt).format("DD.MM.YYYY"),
								})
							}}
						</template>
						<template v-else>
							{{
								t(
									"pages.administration.school.index.schoolPolicy.notUploadedYet"
								)
							}}
						</template>
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action
					v-if="hasSchoolEditPermission"
					data-testid="edit-button"
					@click.stop="isSchoolPolicyFormDialogOpen = true"
				>
					<v-btn
						icon
						:aria-label="
							t('pages.administration.school.index.schoolPolicy.edit')
						"
					>
						<v-icon>$mdiTrayArrowUp</v-icon>
					</v-btn>
				</v-list-item-action>
				<v-list-item-action
					v-if="privacyPolicy"
					data-testid="delete-button"
					@click.stop="isDeletePolicyDialogOpen = true"
				>
					<v-btn
						icon
						:aria-label="
							t('pages.administration.school.index.schoolPolicy.delete.title')
						"
					>
						<v-icon>$mdiTrashCanOutline</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
			<school-policy-form-dialog
				v-if="hasSchoolEditPermission"
				:is-open="isSchoolPolicyFormDialogOpen"
				@close="closeDialog"
				data-testid="form-dialog"
			/>
			<v-custom-dialog
				v-model="isDeletePolicyDialogOpen"
				:size="375"
				has-buttons
				confirm-btn-title-key="common.actions.delete"
				confirm-btn-icon="$mdiTrashCanOutline"
				@dialog-confirmed="deleteFile"
				data-testid="delete-dialog"
			>
				<h4 class="text-h4 mt-0" slot="title">
					{{ t("pages.administration.school.index.schoolPolicy.delete.title") }}
				</h4>
				<template #content>
					<v-alert light text type="info" class="mb-0">
						<div class="alert-text">
							{{
								t("pages.administration.school.index.schoolPolicy.delete.text")
							}}
						</div>
					</v-alert>
				</template>
			</v-custom-dialog>
		</template>
	</section>
</template>

<script lang="ts">
import SchoolPolicyFormDialog from "@/components/organisms/administration/SchoolPolicyFormDialog.vue";
import dayjs from "dayjs";
import { computed, ComputedRef, defineComponent, ref, Ref, watch } from "vue";
import { School } from "@/store/types/schools";
import { ConsentVersion } from "@/store/types/consent-version";
import { BusinessError } from "@/store/types/commons";
import { useI18n } from "@/composables/i18n.composable";
import {
	AUTH_MODULE_KEY,
	PRIVACY_POLICY_MODULE_KEY,
	injectStrict,
	SCHOOLS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";

export default defineComponent({
	name: "SchoolPolicy",
	components: {
		vCustomDialog,
		SchoolPolicyFormDialog,
	},
	setup() {
		const { t } = useI18n();
		const authModule = injectStrict(AUTH_MODULE_KEY);
		const privacyPolicyModule = injectStrict(PRIVACY_POLICY_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
		const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

		const isSchoolPolicyFormDialogOpen: Ref<boolean> = ref(false);
		const isDeletePolicyDialogOpen: Ref<boolean> = ref(false);

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);
		watch(
			school,
			async (newValue) => {
				await privacyPolicyModule.fetchPrivacyPolicy(newValue.id);
			},
			{ immediate: true }
		);

		const hasSchoolEditPermission: ComputedRef<boolean> = computed(() =>
			authModule.getUserPermissions.includes("school_edit")
		);
		const privacyPolicy: ComputedRef<ConsentVersion | null> = computed(
			() => privacyPolicyModule.getPrivacyPolicy
		);
		const status: ComputedRef<string> = computed(
			() => privacyPolicyModule.getStatus
		);
		const error: ComputedRef<BusinessError> = computed(
			() => privacyPolicyModule.getBusinessError
		);

		const downloadFile = () => {
			if (privacyPolicy.value) {
				const link = document.createElement("a");
				link.href = privacyPolicy.value.consentData.data as string;
				link.download = t(
					"pages.administration.school.index.schoolPolicy.fileName"
				);
				link.click();
			}
		};

		const deleteFile = async () => {
			await privacyPolicyModule.deletePrivacyPolicy();

			notifierModule.show({
				text: t(
					"pages.administration.school.index.schoolPolicy.delete.success"
				),
				status: "success",
				timeout: 10000,
			});
		};

		const closeDialog = () => {
			isSchoolPolicyFormDialogOpen.value = false;
		};

		return {
			t,
			isSchoolPolicyFormDialogOpen,
			isDeletePolicyDialogOpen,
			hasSchoolEditPermission,
			privacyPolicy,
			status,
			error,
			downloadFile,
			deleteFile,
			dayjs,
			closeDialog,
		};
	},
});
</script>

<style lang="scss" scoped>
.alert-text {
	color: var(--v-black-base) !important;
	line-height: var(--line-height-lg) !important;
}

.item-no-action {
	&:hover {
		cursor: default;
	}
	&:before {
		background-color: unset;
	}
}
</style>
