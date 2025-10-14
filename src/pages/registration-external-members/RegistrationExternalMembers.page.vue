<template>
	<h1 ref="registrationTitle" tabindex="0">{{ t("pages.registrationExternalMembers.steps.registration.title") }}</h1>
	<Registration :selected-language="selectedLanguage" @update:selected-language="setSelectedLanguage" />
</template>

<script setup lang="ts">
import { LanguageType } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRegistration } from "@data-room";
import { Registration } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

const { selectedLanguage, getCookieValue, setSelectedLanguage } = useRegistration();

const { t } = useI18n();

const registrationTitle = useTemplateRef("registrationTitle");

const pageTitle = computed(() => buildPageTitle(t("common.labels.registration")));
useTitle(pageTitle);

onMounted(() => {
	selectedLanguage.value = getCookieValue() || LanguageType.De;
	registrationTitle.value?.focus();
});
</script>
