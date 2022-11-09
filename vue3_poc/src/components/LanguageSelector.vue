<template>
	<v-container>
		<v-btn
			:class="{ 'bg-primary': locale === Language.English }"
			data-test-id="changeLanguageToEnglish"
			@click="selectLanguage(Language.English)"
			>English</v-btn
		>
		<v-btn
			:class="{ 'bg-primary': locale === Language.German }"
			data-test-id="changeLanguageToGerman"
			@click="selectLanguage(Language.German)"
			>Deutsch</v-btn
		>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { Language } from "@/store/types/Language";
import { useLocale } from "vuetify";

export default defineComponent({
	name: "LanguageSelector",
	setup() {
		// https://vue-i18n.intlify.dev/guide/advanced/composition.html#global-scope
		const { locale } = useI18n({ useScope: "global" });

		// https://next.vuetifyjs.com/en/features/internationalization/#getting-started
		const { current } = useLocale();

		const selectLanguage = (language: Language) => {
			locale.value = language;

			// change vuetify language
			current.value = language;
		};

		return {
			selectLanguage,
			locale,
			Language,
		};
	},
});
</script>
