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
			></v-progress-linear>
			<v-list-item v-else two-line dense class="mb-6">
				<v-list-item-icon>
					<v-icon>{{ pdfIcon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title class="text-body-1 black--text mb-2">
						{{ t("pages.administration.school.index.schoolPolicy.fileName") }}
					</v-list-item-title>
					<v-list-item-subtitle class="text-body-2">
						<template v-if="privacyPolicy">
							{{
								t("pages.administration.school.index.schoolPolicy.uploadedOn", {
									date: dayjs(privacyPolicy.publishedAt).format(
										"DD.MM.YYYY HH:mm"
									),
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
					class="edit-icon"
					data-testid="edit-button"
					@click="isSchoolPolicyFormDialogOpen = true"
				>
					<v-btn icon role="button">
						<span class="d-sr-only">{{ t("common.actions.edit") }}</span>
						<v-icon>
							{{ mdiPencilOutline }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
				<v-list-item-action
					v-if="privacyPolicy"
					class="download-icon"
					data-testid="download-button"
					@click="downloadFile"
				>
					<v-btn icon role="button">
						<span class="d-sr-only">{{ t("common.actions.download") }}</span>
						<v-icon>
							{{ mdiTrayArrowDown }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
			<school-policy-form-dialog
				v-if="hasSchoolEditPermission"
				:is-open="isSchoolPolicyFormDialogOpen"
				@close="closeDialog"
				data-testid="form-dialog"
			></school-policy-form-dialog>
		</template>
	</section>
</template>

<script lang="ts">
import SchoolPolicyFormDialog from "@/components/organisms/administration/SchoolPolicyFormDialog.vue";
import dayjs from "dayjs";
import { mdiPencilOutline, mdiTrayArrowDown } from "@mdi/js";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	ref,
	Ref,
	watch,
} from "vue";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import PrivacyPolicyModule from "@/store/privacy-policy";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import VueI18n from "vue-i18n";
import { School } from "@/store/types/schools";
import { ConsentVersion } from "@/store/types/consent-version";
import { BusinessError } from "@/store/types/commons";

export default defineComponent({
	name: "SchoolPolicy",
	components: {
		SchoolPolicyFormDialog,
	},
	setup() {
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		const privacyPolicyModule: PrivacyPolicyModule | undefined =
			inject<PrivacyPolicyModule>("privacyPolicyModule");
		const i18n = injectStrict(I18N_KEY);

		if (!authModule || !schoolsModule || !privacyPolicyModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string, values?: VueI18n.Values | undefined): string => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const isSchoolPolicyFormDialogOpen: Ref<boolean> = ref(false);

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
		const pdfIcon = "$file_pdf_outline";

		const downloadFile = () => {
			const link = document.createElement("a");
			link.href = privacyPolicy.value?.consentData.data as string;
			link.download = t(
				"pages.administration.school.index.schoolPolicy.fileName"
			);
			link.click();
		};

		const closeDialog = () => {
			isSchoolPolicyFormDialogOpen.value = false;
		};

		return {
			t,
			isSchoolPolicyFormDialogOpen,
			hasSchoolEditPermission,
			privacyPolicy,
			status,
			error,
			mdiPencilOutline,
			mdiTrayArrowDown,
			pdfIcon,
			downloadFile,
			dayjs,
			closeDialog,
		};
	},
});
</script>

<style lang="scss" scoped></style>
