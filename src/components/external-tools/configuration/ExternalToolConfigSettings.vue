<template>
	<div>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-config-parameter
				:parameter="template.parameters[index]"
				v-model="inputValues[index]"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { SchoolExternalToolConfigurationTemplate } from "@/store/external-tool";
import { computed, defineComponent, PropType, WritableComputedRef } from "vue";
import ExternalToolConfigParameter from "./ExternalToolConfigParameter.vue";

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
		const inputValues: WritableComputedRef<(string | undefined)[]> = computed({
			get() {
				return props.value;
			},
			set(value: (string | undefined)[]) {
				emit("input", value);
			},
		});

		return {
			inputValues,
		};
	},
});
</script>
