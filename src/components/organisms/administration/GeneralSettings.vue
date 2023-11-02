<template>
	<v-form>
		<v-overlay :value="loading" :absolute="true">
			<v-progress-circular color="primary" indeterminate />
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
					:disabled="isSyncedSchool"
					data-testid="school-name"
				/>
			</v-col>
		</v-row>
		<v-row class="mb-2">
			<v-col>
				<v-text-field
					v-model="localSchool.officialSchoolNumber"
					class="school-number"
					data-testid="school-number"
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
				/>
			</v-col>
		</v-row>
		<v-row class="mb-2">
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
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-file-input
					class="school-logo"
					:label="
						$t(
							'pages.administration.school.index.generalSettings.labels.uploadSchoolLogo'
						)
					"
					v-model="logoFile"
					dense
					prepend-icon=""
					prepend-inner-icon="$file"
				/>
			</v-col>
		</v-row>
		<v-row class="mb-2">
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
						$t('pages.administration.school.index.generalSettings.timezoneHint')
					"
					persistent-hint
				/>
			</v-col>
		</v-row>
		<v-row class="mb-8">
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
					item-value="abbreviation"
					dense
				>
					<template #item="{ item }">
						<v-icon class="me-2"> {{ item.flagIcon }} </v-icon>
						{{ item.name }}
					</template>
					<template #selection="{ item }">
						<v-icon class="me-2"> {{ item.flagIcon }} </v-icon>
						{{ item.name }}
					</template>
				</v-select>
			</v-col>
		</v-row>
		<privacy-settings
			:permissions="localSchool.permissions || {}"
			:features="localSchool.features || {}"
			@update-privacy-settings="onUpdatePrivacySettings"
			@update-feature-settings="onUpdateFeatureSettings"
		/>
		<v-btn
			class="mt-6 my-4 button-save float-right"
			data-testid="save-general-setting"
			color="primary"
			depressed
			:disabled="loading"
			@click="save"
		>
			{{ $t("pages.administration.school.index.generalSettings.save") }}
		</v-btn>
	</v-form>
</template>

<script>
import { authModule, envConfigModule, schoolsModule } from "@/store";
import { printDate } from "@/plugins/datetime";
import { toBase64 } from "@/utils/fileHelper.ts";
import PrivacySettings from "@/components/organisms/administration/PrivacySettings";

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
			logoFile: null,
			fileStorageTypes: [{ type: "awsS3", name: "HPI Schul-Cloud" }],
		};
	},
	computed: {
		availableLanguages: () => envConfigModule.getAvailableLanguages,
		federalState() {
			return schoolsModule.getFederalState;
		},
		isSyncedSchool() {
			return schoolsModule.schoolIsSynced;
		},
		school() {
			return schoolsModule.getSchool;
		},
		loading() {
			return schoolsModule.getLoading;
		},
		languages() {
			return this.availableLanguages.split(",").map((lang) => {
				const name = this.$t(`common.words.languages.${lang}`);
				const flagIcon =
					"$langIcon" + lang.charAt(0).toUpperCase() + lang.slice(1);
				return { name, abbreviation: lang, flagIcon };
			});
		},
		hasSchoolEditPermission: () => {
			return authModule.getUserPermissions.includes("school_edit");
		},
	},
	watch: {
		school: {
			handler: async function (newSchool) {
				if (newSchool && newSchool.id) {
					this.logoFile = newSchool.logo_dataUrl
						? this.convertDataUrlToFile(
								newSchool.logo_dataUrl,
								newSchool.logo_name
						  )
						: null;

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
		convertDataUrlToFile(dataURL, fileName) {
			const dataUrlParts = dataURL.split(",");
			const mimeType = (dataUrlParts[0].match(/^data:(.*?);/) || [])[1];
			const binaryString = window.atob(dataUrlParts[1]);
			let binaryStringLength = binaryString.length;
			const uint8Array = new Uint8Array(binaryStringLength);
			while (binaryStringLength--) {
				uint8Array[binaryStringLength] =
					binaryString.charCodeAt(binaryStringLength);
			}
			const logoFile = new File([uint8Array], fileName, {
				type: mimeType,
			});
			return logoFile;
		},
		async copyToLocalSchool() {
			if (!this.school) {
				return;
			}
			const schoolCopy = JSON.parse(JSON.stringify(this.school)); // create a deep copy
			if (this.school.logo_dataUrl) {
				schoolCopy.logo = this.school.logo_dataUrl;
			}
			this.localSchool = schoolCopy;

			if (!this.localSchool.language) {
				this.localSchool.language = "de";
			}
		},
		printDate,
		toBase64,
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

			updatedSchool.logo_dataUrl = this.logoFile
				? await toBase64(this.logoFile)
				: "";
			updatedSchool.logo_name = this.logoFile ? this.logoFile.name : "";

			schoolsModule.update(updatedSchool);
		},
	},
};
</script>
