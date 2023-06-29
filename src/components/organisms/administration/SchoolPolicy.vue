<template>
	<section>
		<h4 class="text-h4 mb-6">
			{{ $t("common.words.privacyPolicy") }}
		</h4>
		<v-alert
			v-if="status === 'error'"
			light
			prominent
			text
			type="error"
			class="mb-6"
		>
			{{ $t("pages.administration.school.index.schoolPolicy.error") }}
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
						{{ $t("pages.administration.school.index.schoolPolicy.fileName") }}
					</v-list-item-title>
					<v-list-item-subtitle class="text-body-2">
						<template v-if="privacyPolicy">
							{{
								$t(
									"pages.administration.school.index.schoolPolicy.uploadedOn",
									{
										date: printDateTimeFromStringUTC(privacyPolicy.publishedAt),
									}
								)
							}}
						</template>
						<template v-else>
							{{
								$t(
									"pages.administration.school.index.schoolPolicy.notUploadedYet"
								)
							}}
						</template>
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action
					v-if="hasSchoolEditPermission"
					class="edit-icon"
					@click="isSchoolPolicyFormDialogOpen = true"
				>
					<v-btn icon role="button">
						<span class="d-sr-only">{{ $t("common.actions.edit") }}</span>
						<v-icon>
							{{ mdiPencilOutline }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
				<v-list-item-action
					v-if="privacyPolicy"
					class="download-icon"
					@click="downloadFile"
				>
					<v-btn icon role="button">
						<span class="d-sr-only">{{ $t("common.actions.download") }}</span>
						<v-icon>
							{{ mdiTrayArrowDown }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
			<school-policy-form-dialog
				v-if="hasSchoolEditPermission"
				v-model="isSchoolPolicyFormDialogOpen"
			></school-policy-form-dialog>
		</template>
	</section>
</template>

<script>
import SchoolPolicyFormDialog from "@/components/organisms/administration/SchoolPolicyFormDialog.vue";
import { authModule, privacyPolicyModule, schoolsModule } from "@/store";
import { printDateTimeFromStringUTC } from "@/plugins/datetime";
import { mdiTrayArrowDown, mdiPencilOutline } from "@mdi/js";

export default {
	components: {
		SchoolPolicyFormDialog,
	},
	data() {
		return {
			isSchoolPolicyFormDialogOpen: false,
			mdiPencilOutline,
			mdiTrayArrowDown,
		};
	},
	computed: {
		hasSchoolEditPermission: () =>
			authModule.getUserPermissions.includes("school_edit"),
		privacyPolicy: () => privacyPolicyModule.getPrivacyPolicy,
		status: () => privacyPolicyModule.getStatus,
		error: () => privacyPolicyModule.getBusinessError,
		school: () => schoolsModule.getSchool,
		pdfIcon: () => "$file_pdf_outline",
	},
	watch: {
		school: {
			handler: async function (newSchool) {
				if (newSchool && newSchool.id) {
					await privacyPolicyModule.fetchPrivacyPolicy(newSchool.id);
				}
			},
			immediate: true,
		},
	},
	methods: {
		printDateTimeFromStringUTC,
		downloadFile() {
			const link = document.createElement("a");
			link.href = this.privacyPolicy.consentData.data;
			link.download = this.$tc(
				"pages.administration.school.index.schoolPolicy.fileName"
			);
			link.click();
		},
	},
};
</script>

<style lang="scss" scoped></style>
