<template>
	<default-wireframe
		headline="Konfiguration Externer Tools"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<p>
			Die schulspezifischen Parameter für das externe Tool werden hier konfiguriert.
			Nach dem Speichern der Konfiguration ist das Tool Innerhalb der Schule verfügbar.<br><br>
			Durch das Löschen einer Konfiguration wird das Tool der Schule wieder entzogen.<br><br>
			Weitere Informationen sind in unserem <a>Hilfebereich zu externen Tools</a> zu finden.
		</p>
		<v-select v-model="toolConfig" label="Tool auswahl" item-text="name" :items="items" :no-data-text="$t('common.table.nodata')"
				  return-object :loading="loading">
			<template #selection="{ item }">
				<external-tool-selection-row :item="item" max-height="20" max-width="20"/>
			</template>
			<template #item="{ item }">
				<external-tool-selection-row :item="item"/>
			</template>
		</v-select>
		<external-tool-config-settings v-if="toolConfig" :external-tool="toolConfig"></external-tool-config-settings>
	</default-wireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { defineComponent } from "@vue/composition-api";
import { Breadcrumb } from "@components/templates/default-wireframe.types";
import VueI18n from "vue-i18n";
import { computed, ComputedRef, inject, onMounted, ref, Ref } from "@nuxtjs/composition-api";
import ExternalToolConfigSettings from "@components/administration/external-tool/ExternalToolConfigSettings.vue";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import { ToolConfiguration } from "@store/external-tool/tool-configuration";
import { externalToolsModule } from "@utils/store-accessor";
import { ToolConfigurationTemplate } from "@store/external-tool/tool-configuration-template";

export default defineComponent({
	name: "ExternalToolConfigOverview",
	components: {
		ExternalToolSelectionRow,
		ExternalToolConfigSettings,
		DefaultWireframe,
	},
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		onMounted(async () => {
			await externalToolsModule.loadAvailableToolConfigurations();
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const breadcrumbs: Breadcrumb[] = [
			{
				text: t("pages.administration.index.title"),
				to: "/administration/",
			},
			{
				text: t("pages.administration.school.index.title"),
				to: "/administration/school-settings#tools",
			},
			{
				text: "Konfiguration Externer Tools",
				disabled: true,
			}
		];

		const toolConfig: Ref<ToolConfigurationTemplate> = ref(externalToolsModule.getToolConfigurationTemplate);

		const items: ComputedRef<ToolConfiguration[]> = computed(() => externalToolsModule.getToolConfigurations);

		const loading: Ref<boolean> = ref(externalToolsModule.getLoading);

		return {
			breadcrumbs,
			toolConfig,
			items,
			loading,
		}
	},
});
</script>
