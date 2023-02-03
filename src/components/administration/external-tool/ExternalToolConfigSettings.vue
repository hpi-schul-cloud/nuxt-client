<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.tool.settings") }}
		</h2>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-parameter
				v-model="template.parameters[index]"
				@input:value="updateParameter(template, $event, index)"
			/>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script setup lang="ts">
import ExternalToolParameter from "./ExternalToolParameter.vue";
import { ToolConfigurationTemplate } from "@/store/external-tool";
import { computed, ComputedRef, inject, WritableComputedRef } from "vue";
import ExternalToolsModule from "@/store/external-tools";

const emit = defineEmits(["update:value"]);
const props = defineProps({
	value: {
		type: Object,
		required: true,
		default: () => new ToolConfigurationTemplate(),
	},
});

const externalToolsModule: ExternalToolsModule | undefined =
	inject<ExternalToolsModule>("externalToolsModule");
if (!externalToolsModule) {
	throw new Error("Injection of dependencies failed");
}

const template: WritableComputedRef<ToolConfigurationTemplate> = computed({
	get: (): ToolConfigurationTemplate =>
		props.value as ToolConfigurationTemplate,
	set: (value) => emit("update:value", value),
});

const loading: ComputedRef<boolean> = computed(
	() => externalToolsModule.getLoading
);

const updateParameter = (
	model: ToolConfigurationTemplate,
	newValue: string,
	index: number
) => {
	const newModel: ToolConfigurationTemplate = { ...model };
	newModel.parameters[index] = {
		...newModel.parameters[index],
		value: newValue,
	};
	template.value = newModel;
};
</script>
