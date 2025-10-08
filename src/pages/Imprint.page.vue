<template>
	<impressum />
</template>

<script lang="ts">
import Impressum from "@/components/templates/impressum.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

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
