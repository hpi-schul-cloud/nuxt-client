<template>
	<h1 ref="registrationTitle" tabindex="0">{{ t("pages.registrationExternalMembers.steps.registration.title") }}</h1>
	<Registration :selected-language="language" @update:selected-language="setSelectedLanguage" />
</template>

<script setup lang="ts">
import { LanguageType } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { Registration } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const { t } = i18n;

const language: Ref<LanguageType | undefined> = ref(undefined);
const registrationTitle = ref<HTMLElement | null>(null);

const getCookieValue = (): LanguageType | undefined => {
	const match = document.cookie.match(/(?:^|;\s*)USER_LANG=([^;]*)/);
	return match ? (decodeURIComponent(match[1]) as LanguageType) : undefined;
};

const setCookie = (lang = LanguageType.De) => {
	const expires = new Date();
	expires.setFullYear(expires.getFullYear() + 1);
	document.cookie = `USER_LANG=${lang}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
};

const setSelectedLanguage = (value: LanguageType) => {
	setCookie(value);
	language.value = value;
	i18n.locale.value = value;
};

const pageTitle = computed(() => buildPageTitle(t("common.labels.registration")));
useTitle(pageTitle);

onMounted(() => {
	language.value = getCookieValue() || LanguageType.De;
	i18n.locale.value = language.value;
	registrationTitle.value?.focus();
});
</script>
