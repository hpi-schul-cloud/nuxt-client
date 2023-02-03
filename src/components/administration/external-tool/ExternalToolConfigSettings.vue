<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.tool.settings") }}
		</h2>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-parameter v-model="template.parameters[index]" @input:value="updateParameter(template, $event, index)"/>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { computed, ComputedRef, inject } from "@nuxtjs/composition-api";
import { ToolConfigurationTemplate } from "@store/external-tool";
import VueI18n from "vue-i18n";
import ExternalToolsModule from "@store/external-tools";
import ExternalToolParameter from "./ExternalToolParameter.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	components: { ExternalToolParameter },
	emits: ["update:value"],
	props: {
		value: {
			type: Object,
			default: () => new ToolConfigurationTemplate(),
		}
	},
	setup(props: any, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const externalToolsModule: ExternalToolsModule | undefined = inject<ExternalToolsModule>("externalToolsModule");
		if (!i18n || !externalToolsModule) {
			throw new Error("Injection of dependencies failed");
		}

		const template = computed<ToolConfigurationTemplate>({
			get() {
				return props.value
			},
			set(value: ToolConfigurationTemplate) {
				emit("update:value", value);
			}
		});

		const loading: ComputedRef<boolean> = computed(() => externalToolsModule.getLoading);

		const updateParameter = (model: ToolConfigurationTemplate, newValue: string, index: number) => {
			const newModel: ToolConfigurationTemplate = { ...model };
			newModel.parameters[index] = { ...newModel.parameters[index], value: newValue };
			template.value = newModel;
		};

		return {
			template,
			updateParameter,
			loading,
		};
	}
});
</script>
