<template>
	<v-list-group value="languages" density="compact" role="menuitem">
		<template #activator="{ props }">
			<v-list-item
				v-bind="props"
				v-bind.attr="$attrs"
				role="menu"
				:prepend-icon="selectedLanguage.icon"
				:data-testid="`selected-language-${selectedLanguage.language}`"
				:aria-label="ariaLabel"
				@click.stop
			>
				<v-list-item-title>{{ selectedLanguage.longName }}</v-list-item-title>
			</v-list-item>
		</template>
		<v-list-item
			v-for="item in availableLanguages"
			role="menuitem"
			:key="item.language"
			:prepend-icon="item.icon"
			:data-testid="`available-language-${item.language}`"
			:aria-label="item.translatedName"
			@click="changeLanguage(item)"
		>
			<template #prepend>
				<v-icon :icon="item.icon" />
			</template>
			<v-list-item-title>{{ item.longName }}</v-list-item-title>
		</v-list-item>
	</v-list-group>
</template>

<script setup lang="ts">
import { LanguageType } from "@/serverApi/v3";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({
	inheritAttrs: false,
});

type LanguageItem = {
	language: LanguageType;
	longName: string;
	translatedName: string;
	icon: string;
};

const authModule = injectStrict(AUTH_MODULE_KEY);
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const { t } = useI18n();

const changeLanguage = async (item: LanguageItem) => {
	await authModule.updateUserLanguage(item.language);
	window.location.reload();
};

const buildLanguageItem = (lang: LanguageType | string): LanguageItem => {
	const language = lang as LanguageType;
	const longName = t(`global.topbar.language.longName.${language}`);
	const translatedName = t(`common.words.languages.${language}`);
	const icon =
		"$langIcon" + language.charAt(0).toUpperCase() + language.slice(1);

	return { language, longName, translatedName, icon };
};

const availableLanguages = computed(() => {
	const languages = envConfigModule.getAvailableLanguages
		.map((language) => buildLanguageItem(language))
		.filter((language) => {
			return language.language !== selectedLanguage.value.language;
		});

	return languages;
});

const selectedLanguage = computed(() => {
	const language = buildLanguageItem(
		authModule.getLocale || envConfigModule.getFallbackLanguage
	);

	return language;
});

const ariaLabel = computed(() => {
	return `${t("global.topbar.language.select")} ${t(
		"global.topbar.language.selectedLanguage"
	)} ${selectedLanguage.value.translatedName}`;
});
</script>

<style scoped>
:deep(.v-list-group__items .v-list-item) {
	padding-inline-start: 24px !important;
}
</style>
