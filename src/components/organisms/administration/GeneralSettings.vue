<template>
	<v-form v-if="localSchool">
		<v-row>
			<v-col>
				<v-text-field
					v-model="localSchool.name"
					class="school-name"
					:label="t('pages.administration.school.index.generalSettings.labels.nameOfSchool')"
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
					:model-value="localSchool.currentYear?.name"
					class="school-year"
					:label="t('pages.administration.school.index.generalSettings.labels.schoolYear')"
					density="compact"
					readonly
					:hint="t('pages.administration.school.index.generalSettings.disabledHint')"
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
					:label="t('pages.administration.school.index.generalSettings.labels.schoolNumber')"
					density="compact"
					:disabled="!!school.officialSchoolNumber"
					:hint="t('pages.administration.school.index.generalSettings.changeSchoolValueWarning')"
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
					data-testid="school-counties"
					:label="t('pages.administration.school.index.generalSettings.labels.chooseACounty')"
					:items="federalState?.counties"
					item-title="name"
					item-value="id"
					return-object
					:disabled="!!localSchool.county"
					:hint="t('pages.administration.school.index.generalSettings.changeSchoolValueWarning')"
					persistent-hint
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-file-input
					v-model="logoFile"
					class="school-logo truncate-file-input"
					data-testid="school-logo-input"
					:label="t('pages.administration.school.index.generalSettings.labels.uploadSchoolLogo')"
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
					data-testid="timezone-input"
					:label="t('pages.administration.school.index.generalSettings.labels.timezone')"
					density="compact"
					disabled
					:hint="t('pages.administration.school.index.generalSettings.timezoneHint')"
					persistent-hint
				/>
			</v-col>
		</v-row>
		<v-row class="mb-8">
			<v-col>
				<v-select
					v-model="localSchool.language"
					class="language-select"
					data-testid="language-select"
					:label="t('pages.administration.school.index.generalSettings.labels.language')"
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
			:permissions="localSchool?.permissions ?? {}"
			:features="localSchool?.featureObject ?? {}"
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

<script setup lang="ts">
import PrivacySettings from "./PrivacySettings.vue";
import { LanguageType, Permission, SchoolFeature, SchoolUpdateBodyParams } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import { School } from "@/store/types/schools";
import { toBase64 } from "@/utils/fileHelper";
import { mapSchoolFeatureObjectToArray } from "@/utils/school-features";
import { useOpeningTagValidator } from "@/utils/validation";
import { notifySuccess, useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { validateOnOpeningTag } = useOpeningTagValidator();
const { t } = useI18n();

const localSchool = ref<School>();

const logoFile = ref<File | null>(null);

const availableLanguages = computed(() => useEnvConfig().value.I18N__AVAILABLE_LANGUAGES);
const federalState = computed(() => schoolsModule.getFederalState);
const isSyncedSchool = computed(() => schoolsModule.schoolIsSynced);
const school = computed(() => schoolsModule.getSchool);
const loading = computed(() => schoolsModule.getLoading);
const languages = computed(() =>
	availableLanguages.value.map((lang) => {
		const name = t(`common.words.languages.${lang}`);
		const flagIcon = "$langIcon" + lang.charAt(0).toUpperCase() + lang.slice(1);
		return { name, abbreviation: lang, flagIcon };
	})
);

const hasSchoolEditPermission = useAppStore().hasPermission(Permission.SchoolEdit);

const convertDataUrlToFile = (dataURL: string, fileName: string) => {
	const dataUrlParts = dataURL.split(",");
	const mimeType = (dataUrlParts[0].match(/^data:(.*?);/) || [])[1];
	const binaryString = window.atob(dataUrlParts[1]);
	let binaryStringLength = binaryString.length;
	const uint8Array = new Uint8Array(binaryStringLength);
	while (binaryStringLength--) {
		uint8Array[binaryStringLength] = binaryString.charCodeAt(binaryStringLength);
	}
	const logoFile = new File([uint8Array], fileName, {
		type: mimeType,
	});
	return logoFile;
};

const copyToLocalSchool = async () => {
	if (!school.value) {
		return;
	}
	const schoolCopy = JSON.parse(JSON.stringify(school.value)); // create a deep copy
	if (school.value.logo?.dataUrl) {
		schoolCopy.logo = school.value.logo?.dataUrl;
	}
	localSchool.value = schoolCopy;

	if (localSchool.value && !localSchool.value.language) {
		localSchool.value.language = LanguageType.De;
	}
};

watch(
	school,
	async (newSchool) => {
		if (newSchool?.id) {
			logoFile.value =
				newSchool.logo?.dataUrl && newSchool.logo?.name
					? convertDataUrlToFile(newSchool.logo.dataUrl, newSchool.logo.name)
					: null;
			await copyToLocalSchool();
		}
	},
	{ immediate: true }
);

onMounted(async () => {
	await copyToLocalSchool();
});

const onUpdateFeatureSettings = (value: boolean, settingName: SchoolFeature) => {
	if (!localSchool.value) {
		return;
	}
	localSchool.value.featureObject[settingName] = value;
};

const onUpdatePrivacySettings = (value: boolean, settingName: string) => {
	if (!localSchool.value) {
		return;
	}
	const keys = settingName.split(".");
	const newPermissions = {
		...localSchool.value.permissions,
		[keys[0]]: {
			[keys[1]]: value,
		},
	};
	localSchool.value.permissions = newPermissions;
};

const save = async () => {
	if (!localSchool.value) {
		return;
	}

	const localLanguage = localSchool.value.language as LanguageType; // Should this be changed in the backend SchoolResponse?

	const updatedSchool: SchoolUpdateBodyParams = {
		name: localSchool.value.name,
		language: localLanguage,
		permissions: localSchool.value.permissions,
		features: mapSchoolFeatureObjectToArray(localSchool.value.featureObject),
		logo: {
			dataUrl: logoFile.value ? ((await toBase64(logoFile.value)) as string) : "",
			name: logoFile.value ? logoFile.value.name : "",
		},
	};

	if (!school.value.officialSchoolNumber && localSchool.value.officialSchoolNumber) {
		updatedSchool.officialSchoolNumber = localSchool.value.officialSchoolNumber;
	}
	if (!school.value.county && localSchool.value.county?.id) {
		updatedSchool.countyId = localSchool.value.county.id;
	}

	await schoolsModule.update({
		id: localSchool.value.id,
		props: updatedSchool,
	});

	notifySuccess(t("pages.administration.school.index.generalSettings.save.success"));

	if (updatedSchool.logo) {
		schoolsModule.setSchoolLogo({
			dataUrl: updatedSchool.logo.dataUrl ?? "",
			name: updatedSchool.logo.name ?? "",
		});
	}

	await copyToLocalSchool();
};
</script>
<style lang="scss" scoped>
:deep(.v-list-item__prepend > .v-icon) {
	opacity: 1;
}

:deep(.truncate-file-input .v-field__input) {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	max-width: 100%;
}
</style>
