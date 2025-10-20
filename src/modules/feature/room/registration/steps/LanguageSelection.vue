<template>
	<VSelect
		:model-value="selectedLanguage"
		aria-labelledby="language-heading"
		:items="languages"
		:label="t('pages.administration.school.index.generalSettings.labels.language')"
		data-testid="language-selection"
		@update:model-value="onUpdateLanguage"
	/>
</template>

<script setup lang="ts">
import { LanguageType } from "@/serverApi/v3";
import { useI18n } from "vue-i18n";

type Props = {
	selectedLanguage: LanguageType;
};
defineProps<Props>();

const emit = defineEmits<{
	(e: "update:selectedLanguage", value: LanguageType): void;
}>();

const i18n = useI18n();
const { t } = i18n;

const onUpdateLanguage = (value: LanguageType) => {
	emit("update:selectedLanguage", value);
};

const languages = [
	{ value: LanguageType.De, title: t("global.topbar.language.longName.de") },
	{ value: LanguageType.En, title: t("global.topbar.language.longName.en") },
	{ value: LanguageType.Es, title: t("global.topbar.language.longName.es") },
	{ value: LanguageType.Uk, title: t("global.topbar.language.longName.uk") },
];
</script>
