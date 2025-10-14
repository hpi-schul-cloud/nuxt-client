<template>
	<VSelect
		ref="languageSelect"
		v-model="lang"
		aria-labelledby="language-heading"
		:items="languages"
		:label="t('pages.administration.school.index.generalSettings.labels.language')"
		item-title="name"
		item-value="code"
		@update:model-value="onUpdateLanguage"
	/>
</template>

<script setup lang="ts">
import { LanguageType } from "@/serverApi/v3";
import { onMounted, toRef, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	selectedLanguage: LanguageType;
};
const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "update:selectedLanguage", value: LanguageType): void;
}>();

const i18n = useI18n();
const { t } = i18n;
const languageSelect = useTemplateRef("languageSelect");
const lang = toRef(props, "selectedLanguage");

const onUpdateLanguage = (value: LanguageType) => {
	lang.value = value;
	emit("update:selectedLanguage", value);
};

onMounted(() => {
	languageSelect.value?.focus();
});

const languages = [
	{ code: LanguageType.De, name: t("global.topbar.language.longName.de") },
	{ code: LanguageType.En, name: t("global.topbar.language.longName.en") },
	{ code: LanguageType.Es, name: t("global.topbar.language.longName.es") },
	{ code: LanguageType.Uk, name: t("global.topbar.language.longName.uk") },
];
</script>
