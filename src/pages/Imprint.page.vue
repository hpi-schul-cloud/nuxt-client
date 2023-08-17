<template>
	<impressum />
</template>

<script lang="ts">
import Impressum from "@/components/templates/impressum.vue";
import { defineComponent } from "vue";
import { useTitle } from "@vueuse/core";
import { useI18n } from "@/composables/i18n.composable";
import { buildPageTitle } from "@/utils/pageTitle";

export default defineComponent({
	name: "ImpressumPage",
	components: { Impressum },
	setup() {
		const { t } = useI18n();
		const pageTitle = buildPageTitle(t("pages.impressum.title"));
		useTitle(pageTitle);
	},
});
</script>
