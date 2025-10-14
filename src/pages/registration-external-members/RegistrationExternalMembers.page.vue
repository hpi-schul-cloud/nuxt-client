<template>
	<h1 ref="registrationTitle" tabindex="0">{{ t("pages.registrationExternalMembers.steps.registration.title") }}</h1>
	<Registration :selected-language="language" @update:selected-language="setSelectedLanguage" />
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { Registration } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const { t } = i18n;

const language: Ref<string | undefined> = ref(undefined);
const registrationTitle = ref<HTMLElement | null>(null);

const getCookieValue = (): string | undefined => {
	const match = document.cookie.match(new RegExp(`(?:^|;\\s*)USER_LANG=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : undefined;
};

const setCookie = (lang = "de") => {
	const expires = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000).toUTCString();
	document.cookie = `USER_LANG=${lang}; path=/; expires=${expires}; SameSite=Lax`;
};

const setSelectedLanguage = (value: string) => {
	setCookie(value);
	language.value = value;
	i18n.locale.value = value;
};

const pageTitle = computed(() => buildPageTitle(t("pages.registrationExternalMembers.pageTitle")));
useTitle(pageTitle);

onMounted(() => {
	language.value = getCookieValue() || "de";
	i18n.locale.value = language.value;
	registrationTitle.value?.focus();
});
</script>
