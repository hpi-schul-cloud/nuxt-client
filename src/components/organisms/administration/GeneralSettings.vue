<template>
	<v-form>
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
					density="compact"
					:readonly="!hasSchoolEditPermission"
					:disabled="isSyncedSchool"
					data-testid="school-name"
					:rules="[validateOnOpeningTag]"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-text-field
					v-model="localSchool.currentYear.name"
					class="school-year"
					:label="
						$t(
							'pages.administration.school.index.generalSettings.labels.schoolYear'
						)
					"
					density="compact"
					readonly
					:hint="
						$t('pages.administration.school.index.generalSettings.disabledHint')
					"
					persistent-hint
					data-testid="school-year"
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
					density="compact"
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
					item-title="name"
					item-value="id"
					return-object
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
					v-model="logoFile"
					class="school-logo"
					:label="
						$t(
							'pages.administration.school.index.generalSettings.labels.uploadSchoolLogo'
						)
					"
					density="compact"
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
					density="compact"
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
					item-title="name"
					item-value="abbreviation"
				>
					<template #item="{ props, item }">
						<v-list-item v-bind="props" :prepend-icon="item.raw.flagIcon" />
					</template>
					<template #selection="{ item }">
						<v-icon class="me-2"> {{ item.raw.flagIcon }} </v-icon>
						{{ item.raw.name }}
					</template>
				</v-select>
			</v-col>
		</v-row>
		<privacy-settings
			:permissions="localSchool.permissions || {}"
			:features="localSchool.featureObject || {}"
			@update-privacy-settings="onUpdatePrivacySettings"
			@update-feature-settings="onUpdateFeatureSettings"
		/>
		<v-btn
			class="mt-6 my-4 button-save float-right"
			data-testid="save-general-setting"
			color="primary"
			variant="flat"
			:disabled="loading"
			@click="save"
		>
			{{ $t("pages.administration.school.index.generalSettings.save") }}
		</v-btn>
	</v-form>
</template>

<script lang="ts">
import PrivacySettings from "@/components/organisms/administration/PrivacySettings";
import { printDate } from "@/plugins/datetime";
import { authModule, envConfigModule, schoolsModule } from "@/store";
import { toBase64 } from "@/utils/fileHelper.ts";
import { mapSchoolFeatureObjectToArray } from "@/utils/school-features";
import { useOpeningTagValidator } from "@/utils/validation";

export default {
	components: {
		PrivacySettings,
	},
	setup() {
		const { validateOnOpeningTag } = useOpeningTagValidator();

		return {
			validateOnOpeningTag,
		};
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
				currentYear: {
					name: "",
				},
			},
			logoFile: [],
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
			return this.availableLanguages.map((lang) => {
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
				if (newSchool?.id) {
					this.logoFile = newSchool.logo?.dataUrl
						? [
								this.convertDataUrlToFile(
									newSchool.logo?.dataUrl,
									newSchool.logo?.name
								),
							]
						: [];

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
			if (this.school.logo?.dataUrl) {
				schoolCopy.logo = this.school.logo?.dataUrl;
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
			this.localSchool.featureObject[settingName] = value;
		},
		async save() {
			const updatedSchool = {
				id: this.localSchool.id,
				name: this.localSchool.name,
				language: this.localSchool.language,
				permissions: this.localSchool.permissions,
				features: mapSchoolFeatureObjectToArray(this.localSchool.featureObject),
				logo: {
					dataUrl: this.localSchool.logo?.dataUrl,
					name: this.localSchool.logo?.name,
				},
			};
			if (
				!this.school.officialSchoolNumber &&
				this.localSchool.officialSchoolNumber
			) {
				updatedSchool.officialSchoolNumber =
					this.localSchool.officialSchoolNumber;
			}
			if (!this.school.county && this.localSchool?.county?.id) {
				updatedSchool.countyId = this.localSchool.county.id;
			}

			updatedSchool.logo.dataUrl =
				this.logoFile.length > 0 ? await toBase64(this.logoFile[0]) : "";
			updatedSchool.logo.name =
				this.logoFile.length > 0 ? this.logoFile[0].name : "";

			schoolsModule.update({ id: this.localSchool.id, props: updatedSchool });
		},
	},
};
</script>
<style lang="scss" scoped>
:deep(.v-list-item__prepend > .v-icon) {
	opacity: 1;
}
</style>
