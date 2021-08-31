<template>
	<section>
		<h2 class="text-h4">{{ $t("common.words.privacyPolicy") }}</h2>
		<v-alert v-if="consentError" light prominent text type="error">
			{{ $t("pages.administration.school.index.schoolPolicies.error") }}
		</v-alert>
		<template v-if="loading">
			<v-skeleton-loader :type="'list-item-two-line'" />
		</template>
		<template
			v-if="
				schoolPolicies && schoolPolicies.length && !loading && !consentError
			"
		>
			<v-expansion-panels
				accordion
				flat
				class="school-policy-expansion-panel-container"
			>
				<school-policy-expansion-panel
					:policy="schoolPolicies[0]"
				></school-policy-expansion-panel>
			</v-expansion-panels>
			<v-btn
				class="my-8"
				color="primary"
				depressed
				@click.stop="addSchoolPolicyDialogIsOpen = true"
				>{{
					$t(
						"pages.administration.school.index.schoolPolicies.addPrivacyPolicy"
					)
				}}</v-btn
			>
			<v-list-group v-if="schoolPolicies.length > 1" :ripple="false" class="">
				<template v-slot:activator>
					<v-list-item-title>{{
						$t("pages.administration.school.index.schoolPolicies.olderPolicies")
					}}</v-list-item-title>
				</template>
				<v-expansion-panels accordion flat>
					<v-list-item
						v-for="policy of schoolPolicies.slice(1)"
						:key="policy.consentDataId"
						class="px-0"
						:ripple="false"
					>
						<school-policy-expansion-panel
							:policy="policy"
						></school-policy-expansion-panel>
					</v-list-item>
				</v-expansion-panels>
			</v-list-group>
		</template>
		<school-policy-form-dialog
			v-if="!consentError"
			v-model="addSchoolPolicyDialogIsOpen"
		></school-policy-form-dialog>
	</section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SchoolPolicyFormDialog from "@components/organisms/administration/SchoolPolicyFormDialog";
import SchoolPolicyExpansionPanel from "@components/molecules/administration/SchoolPolicyExpansionPanel";

export default {
	components: {
		SchoolPolicyFormDialog,
		SchoolPolicyExpansionPanel,
	},
	data() {
		return {
			addSchoolPolicyDialogIsOpen: false,
		};
	},
	computed: {
		...mapGetters("schools", {
			school: "getSchool",
		}),
		...mapGetters("consent-versions", {
			schoolPolicies: "getConsentVersions",
			loading: "getLoading",
			consentError: "getError",
		}),
	},
	created() {
		this.fetchConsentVersions({
			schoolId: this.school.id,
			consentTypes: "privacy",
			withFile: true,
		});
	},
	methods: {
		...mapActions("consent-versions", ["fetchConsentVersions"]),
	},
};
</script>

<style lang="scss" scoped>
::v-deep .v-list-group__header {
	padding: 0;
}
</style>
