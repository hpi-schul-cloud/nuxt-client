<template>
	<Registration :selected-language="language" @update:selected-language="setSelectedLanguage" />
</template>

<script setup lang="ts">
import { app } from "@/main";
import { createI18n } from "@/plugins/i18n";
import { Registration } from "@feature-room";
import { onMounted, ref } from "vue";

const i18n = createI18n();
app.use(i18n);

const language = ref("de");

const setCookie = (lang = "de") => {
	const expires = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000).toUTCString();
	document.cookie = `USER_LANG=${lang}; path=/; expires=${expires}; SameSite=Lax`;
	i18n.global.locale.value = lang;
};

const checkUserLanguage = (): string => {
	const match = document.cookie.match(/(?:^|;\s*)USER_LANG=([^;]*)/);
	if (!match) {
		setCookie("de");
	}

	language.value = i18n.global.locale.value;
	return match?.[1] || "de";
};

const setSelectedLanguage = (value: string) => {
	setCookie(value);
	language.value = value;
	i18n.global.locale.value = value;
};

onMounted(() => {
	checkUserLanguage();
});
</script>
