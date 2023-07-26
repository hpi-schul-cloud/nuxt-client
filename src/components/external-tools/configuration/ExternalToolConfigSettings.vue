<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.tool.settings") }}
		</h2>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-config-parameter
				:parameter="template.parameters[index]"
				v-model="inputValues[index]"
			/>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script lang="ts">
import { SchoolExternalToolConfigurationTemplate } from "../../../store/external-tool";
import {
	computed,
	ComputedRef,
	defineComponent,
	PropType,
	WritableComputedRef,
} from "vue";
import ExternalToolsModule from "../../../store/external-tools";
import ExternalToolConfigParameter from "./ExternalToolConfigParameter.vue";
import { EXTERNAL_TOOLS_MODULE_KEY, injectStrict } from "../../../utils/inject";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	components: { ExternalToolConfigParameter },
	props: {
		template: {
			type: Object as PropType<SchoolExternalToolConfigurationTemplate>,
			required: true,
		},
		value: {
			type: Array as PropType<Array<string | undefined>>,
			required: true,
		},
	},
	setup(props, { emit }) {
		const externalToolsModule: ExternalToolsModule = injectStrict(
			EXTERNAL_TOOLS_MODULE_KEY
		);

		const inputValues: WritableComputedRef<(string | undefined)[]> = computed({
			get() {
				return props.value;
			},
			set(value: (string | undefined)[]) {
				emit("input", value);
			},
		});

		const loading: ComputedRef<boolean> = computed(
			() => externalToolsModule.getLoading
		);

		return {
			loading,
			inputValues,
		};
	},
});
</script>
