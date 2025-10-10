<template>
	<VSelect
		v-model="lang"
		:items="languages"
		:label="t('pages.administration.school.index.generalSettings.labels.language')"
		item-title="name"
		item-value="code"
		outlined
		dense
		@update:model-value="onUpdateLanguage"
	/>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	selectedLanguage: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "update:selectedLanguage", value: string): void;
}>();

const i18n = useI18n();

const { t } = i18n;

const languages = [
	{ code: "de", name: t("global.topbar.language.longName.de") },
	{ code: "en", name: t("global.topbar.language.longName.en") },
	{ code: "es", name: t("global.topbar.language.longName.es") },
	{ code: "uk", name: t("global.topbar.language.longName.uk") },
];

const lang = toRef(props, "selectedLanguage");

const onUpdateLanguage = (value: string) => {
	lang.value = value;
	emit("update:selectedLanguage", value);
};
</script>
