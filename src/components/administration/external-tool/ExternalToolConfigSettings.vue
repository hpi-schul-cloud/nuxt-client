<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.tool.settings") }}
		</h2>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-config-parameter
				v-model="template.parameters[index]"
				@input:value="updateParameter(template, $event, index)"
			/>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script lang="ts">
import { ToolConfigurationTemplate } from "@/store/external-tool";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	PropType,
	WritableComputedRef,
} from "vue";
import ExternalToolsModule from "@/store/external-tools";
import ExternalToolConfigParameter from "./ExternalToolConfigParameter.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	components: { ExternalToolConfigParameter },
	emits: ["update:value"],
	props: {
		value: {
			type: Object as PropType<ToolConfigurationTemplate>,
			required: true,
		},
	},
	setup(props, { emit }) {
		const externalToolsModule: ExternalToolsModule | undefined =
			inject<ExternalToolsModule>("externalToolsModule");
		if (!externalToolsModule) {
			throw new Error("Injection of dependencies failed");
		}

		const template: WritableComputedRef<ToolConfigurationTemplate> = computed({
			get: (): ToolConfigurationTemplate => props.value,
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

		return {
			template,
			loading,
			updateParameter,
		};
	},
});
</script>
