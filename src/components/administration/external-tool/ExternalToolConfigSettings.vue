<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.tool.settings") }}
		</h2>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-config-parameter v-model="template.parameters[index]" />
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
	ref,
	Ref,
} from "vue";
import ExternalToolsModule from "@/store/external-tools";
import ExternalToolConfigParameter from "./ExternalToolConfigParameter.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	components: { ExternalToolConfigParameter },
	props: {
		value: {
			type: Object as PropType<ToolConfigurationTemplate>,
			required: true,
		},
	},
	setup(props) {
		const externalToolsModule: ExternalToolsModule | undefined =
			inject<ExternalToolsModule>("externalToolsModule");
		if (!externalToolsModule) {
			throw new Error("Injection of dependencies failed");
		}

		const template: Ref<ToolConfigurationTemplate> = ref(props.value);

		const loading: ComputedRef<boolean> = computed(
			() => externalToolsModule.getLoading
		);

		return {
			template,
			loading,
		};
	},
});
</script>
