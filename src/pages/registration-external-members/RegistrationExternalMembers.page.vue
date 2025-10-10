<template>
	<Registration :selected-language="language" @update:selected-language="setSelectedLanguage" />
</template>

<script setup lang="ts">
import { Registration } from "@feature-room";
import { onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

const language: Ref<string | undefined> = ref(undefined);

const getCookieValue = (): string | undefined => {
	const match = document.cookie.match(new RegExp(`(?:^|;\\s*)USER_LANG=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : undefined;
};

const setCookie = (lang = "de") => {
	const expires = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000).toUTCString();
	document.cookie = `USER_LANG=${lang}; path=/; expires=${expires}; SameSite=Lax`;
	i18n.locale.value = lang;
};

const setSelectedLanguage = (value: string) => {
	setCookie(value);
	language.value = value;
	i18n.locale.value = value;
};

onMounted(() => {
	language.value = getCookieValue() || "de";
	i18n.locale.value = language.value;
});
</script>
