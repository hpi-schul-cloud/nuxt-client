<template>
	<h1 ref="registrationTitle" tabindex="-1">{{ t("pages.registrationExternalMembers.steps.registration.title") }}</h1>
	<Registration />
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { Registration } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const pageTitle = computed(() => buildPageTitle(t("common.labels.registration")));
useTitle(pageTitle);

const registrationTitle = useTemplateRef("registrationTitle");

onMounted(() => {
	registrationTitle.value?.focus();
});
</script>

<style scoped>
h1:focus {
	outline: none;
}
</style>
