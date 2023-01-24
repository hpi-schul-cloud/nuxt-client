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
		<external-tool-config-settings :v-show="toolConfig && toolConfig.parameters > 0" :external-tool="toolConfig"></external-tool-config-settings>
		<v-row class="justify-end mt-10">
			<v-btn class="mr-2" color="secondary" outlined @click="onCancel">
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn class="mr-2" color="primary" depressed>
				{{ $t("common.actions.save") }}
			</v-btn>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { defineComponent } from "@vue/composition-api";
import { Breadcrumb } from "@components/templates/default-wireframe.types";
import VueI18n from "vue-i18n";
import { computed, ComputedRef, inject, onMounted, ref, Ref, useRouter } from "@nuxtjs/composition-api";
import ExternalToolConfigSettings from "@components/administration/external-tool/ExternalToolConfigSettings.vue";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import { ToolConfiguration } from "@store/external-tool/tool-configuration";
import { externalToolsModule } from "@utils/store-accessor";
import { ToolConfigurationTemplate } from "@store/external-tool/tool-configuration-template";
import VueRouter from "vue-router";

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

		const schoolSetting: Breadcrumb = {
			text: t("pages.administration.school.index.title"),
			to: "/administration/school-settings#tools",
		};
		const breadcrumbs: Breadcrumb[] = [
			{
				text: t("pages.administration.index.title"),
				to: "/administration/",
			},
			schoolSetting,
			{
				text: "Konfiguration Externer Tools",
				disabled: true,
			}
		];

		const toolConfig: Ref<ToolConfigurationTemplate | null> = ref(null);

		const items: ComputedRef<ToolConfiguration[]> = computed(() => Array.from(externalToolsModule.getToolConfigurations.values()));

		const loading: Ref<boolean> = ref(externalToolsModule.getLoading);

		const router: VueRouter = useRouter();
		const onCancel = () => {
			router.push({ path: schoolSetting.to });
		}

		return {
			breadcrumbs,
			toolConfig,
			items,
			loading,
			onCancel,
		}
	},
});
</script>
