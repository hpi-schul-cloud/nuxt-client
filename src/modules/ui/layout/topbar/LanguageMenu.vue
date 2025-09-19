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
			:key="item.language"
			role="menuitem"
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useEnvConfig, useEnvStore } from "@data-env";
import { useAuthStore } from "@data-auth";

defineOptions({
	inheritAttrs: false,
});

type LanguageItem = {
	language: LanguageType;
	longName: string;
	translatedName: string;
	icon: string;
};

const { t } = useI18n();

const changeLanguage = async (item: LanguageItem) => {
	await useAuthStore().updateUserLanguage(item.language);
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

const availableLanguages = computed(() =>
	useEnvConfig()
		.value.I18N__AVAILABLE_LANGUAGES.map((language) =>
			buildLanguageItem(language)
		)
		.filter((language) => language.language !== selectedLanguage.value.language)
);

const selectedLanguage = computed(() =>
	buildLanguageItem(useAuthStore().locale || useEnvStore().fallBackLanguage)
);

const ariaLabel = computed(
	() =>
		`${t("global.topbar.language.select")} ${t(
			"global.topbar.language.selectedLanguage"
		)} ${selectedLanguage.value.translatedName}`
);
</script>

<style scoped>
:deep(.v-list-group__items .v-list-item) {
	padding-inline-start: 24px !important;
}
</style>
