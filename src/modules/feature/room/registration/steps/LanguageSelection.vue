<template>
	<v-select
		v-model="selectedLanguage"
		:items="languages"
		label="Sprache"
		item-title="name"
		item-value="code"
		outlined
		dense
	/>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "update:selectedLanguage", value: string): void;
}>();

const { t } = useI18n();

const languages = [
	{ code: "de", name: t("common.words.languages.de") },
	{ code: "en", name: t("common.words.languages.en") },
	{ code: "es", name: t("common.words.languages.es") },
	{ code: "ua", name: t("common.words.languages.uk") },
];

const selectedLanguage = ref("de");

watch(selectedLanguage, (newValue) => {
	emit("update:selectedLanguage", newValue);
});
</script>
