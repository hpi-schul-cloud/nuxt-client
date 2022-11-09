<template>
	<v-container>
		<v-row class="text-center">
			<v-col class="mb-4">
				<h1 class="display-2 font-weight-bold mb-3">
					{{ $t("hello", { instance: "dBildungscloud" }) }}
				</h1>
				<p>{{ $t("only.exists.in.english") }}</p>
				<br />
				<p>
					Current language: <i>{{ $i18n.locale }}</i
					><br />
					Fallback language: <i>{{ $i18n.fallbackLocale }}</i>
				</p>
			</v-col>
			<language-selector></language-selector>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LanguageSelector from "@/components/LanguageSelector.vue";

export default defineComponent({
	name: "I18nPage",
	components: {
		LanguageSelector,
	},
});
</script>
