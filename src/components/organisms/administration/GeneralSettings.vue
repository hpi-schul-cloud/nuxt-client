<template>
	<section>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.administration.school.index.generalSettings") }}
		</h2>
		<v-form>
			<v-overlay :value="loading" :absolute="true">
				<v-progress-circular
					color="primary"
					indeterminate
				></v-progress-circular>
			</v-overlay>
			<v-row>
				<v-col>
					<v-text-field
						v-model="localSchool.name"
						class="school-name"
						:label="
							$t(
								'pages.administration.school.index.generalSettings.labels.nameOfSchool'
							)
						"
						dense
						:readonly="!hasSchoolEditPermission"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field
						v-model="localSchool.officialSchoolNumber"
						class="school-number"
						:label="
							$t(
								'pages.administration.school.index.generalSettings.labels.schoolNumber'
							)
						"
						dense
						:disabled="!!school.officialSchoolNumber"
						:hint="
							$t(
								'pages.administration.school.index.generalSettings.changeSchoolValueWarning'
							)
						"
						persistent-hint
						:readonly="!hasSchoolEditPermission"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-select
						v-model="localSchool.county"
						class="school-counties"
						:label="
							$t(
								'pages.administration.school.index.generalSettings.labels.chooseACounty'
							)
						"
						:items="federalState.counties"
						item-text="name"
						item-value="_id"
						return-object
						dense
						:disabled="!!localSchool.county"
						:hint="
							$t(
								'pages.administration.school.index.generalSettings.changeSchoolValueWarning'
							)
						"
						persistent-hint
					></v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="d-flex">
					<v-file-input
						v-model="localSchool.logo"
						class="school-logo"
						:label="
							$t(
								'pages.administration.school.index.generalSettings.labels.uploadSchoolLogo'
							)
						"
						dense
						prepend-icon=""
					></v-file-input>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field
						v-model="localSchool.timezone"
						class="timezone-input"
						:label="
							$t(
								'pages.administration.school.index.generalSettings.labels.timezone'
							)
						"
						dense
						disabled
						:hint="
							$t(
								'pages.administration.school.index.generalSettings.timezoneHint'
							)
						"
						persistent-hint
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-select
						v-model="localSchool.language"
						class="language-select"
						:label="
							$t(
								'pages.administration.school.index.generalSettings.labels.language'
							)
						"
						:items="languages"
						item-text="name"
						item-value="abbreveation"
						dense
						:hint="
							$t(
								'pages.administration.school.index.generalSettings.languageHint'
							)
						"
						persistent-hint
					></v-select>
				</v-col>
			</v-row>
			<privacy-settings
				:permissions="localSchool.permissions || {}"
				:features="localSchool.features || {}"
				@update-privacy-settings="onUpdatePrivacySettings"
				@update-feature-settings="onUpdateFeatureSettings"
			></privacy-settings>
			<v-btn
				class="my-5 button-save"
				color="primary"
				depressed
				:disabled="loading"
				@click="save"
			>
				{{ $t("pages.administration.school.index.generalSettings.save") }}
			</v-btn>
		</v-form>
	</section>
</template>

<script>
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import { printDate } from "@plugins/datetime";
import { toBase64, dataUrlToFile } from "@utils/fileHelper.ts";
import PrivacySettings from "@components/organisms/administration/PrivacySettings";
import { mapActions } from "vuex";

export default {
	components: {
		PrivacySettings,
	},
	data() {
		return {
			localSchool: {
				name: "",
				officialSchoolNumber: "",
				logo: null,
				county: {},
				timezone: "",
				language: "",
				permissions: {},
				features: {},
			},
			fileStorageTypes: [{ type: "awsS3", name: "HPI Schul-Cloud" }],
		};
	},
	computed: {
		availableLanguages: () => EnvConfigModule.getAvailableLanguages,
		federalState() {
			return SchoolsModule.getFederalState;
		},
		school() {
			return SchoolsModule.getSchool;
		},
		loading() {
			return SchoolsModule.getLoading;
		},
		languages() {
			return this.availableLanguages.split(",").map((lang) => {
				const name = this.$t(
					`pages.account.index.user.locale.longName.${lang}`
				);
				return { name, abbreveation: lang };
			});
		},
		hasSchoolEditPermission: () => {
			return AuthModule.getUserPermissions.includes("school_edit");
		},
	},
	watch: {
		school: {
			handler: async function (newSchool) {
				if (newSchool && newSchool.id) {
					await this.copyToLocalSchool();
				}
			},
			immediate: true,
		},
	},
	async created() {
		await this.copyToLocalSchool();
	},
	methods: {
		...mapActions("consent-versions", ["fetchConsentVersions"]),
		async copyToLocalSchool() {
			if (!this.school) {
				return;
			}
			const schoolCopy = JSON.parse(JSON.stringify(this.school)); // create a deep copy
			if (this.school.logo_dataUrl) {
				schoolCopy.logo = await dataUrlToFile(this.school.logo_dataUrl, "logo");
			}
			this.localSchool = schoolCopy;
		},
		printDate,
		toBase64,
		dataUrlToFile,
		onUpdatePrivacySettings(value, settingName) {
			const keys = settingName.split(".");
			const newPermissions = {
				...this.localSchool.permissions,
				[keys[0]]: {
					[keys[1]]: value,
				},
			};
			this.localSchool.permissions = newPermissions;
		},
		onUpdateFeatureSettings(value, settingName) {
			this.localSchool.features[settingName] = value;
		},
		async save() {
			const updatedSchool = {
				id: this.localSchool.id,
				name: this.localSchool.name,
				language: this.localSchool.language,
				permissions: this.localSchool.permissions,
				features: this.localSchool.features,
			};
			if (
				!this.school.officialSchoolNumber &&
				this.localSchool.officialSchoolNumber
			) {
				updatedSchool.officialSchoolNumber =
					this.localSchool.officialSchoolNumber;
			}
			if (
				!this.school.county &&
				this.localSchool.county &&
				this.localSchool.county._id
			) {
				updatedSchool.county = this.localSchool.county._id;
			}
			if (this.localSchool.logo) {
				updatedSchool.logo_dataUrl = await toBase64(this.localSchool.logo);
			} else {
				updatedSchool.logo_dataUrl = "";
			}
			SchoolsModule.update(updatedSchool);
		},
	},
};
</script>
