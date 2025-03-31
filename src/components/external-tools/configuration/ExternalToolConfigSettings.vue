<template>
	<div>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-config-parameter
				:parameter="template.parameters[index]"
				v-model="modelValue[index]"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ModelRef, PropType } from "vue";
import ExternalToolConfigParameter from "./ExternalToolConfigParameter.vue";
import { ExternalToolConfigurationTemplate } from "@data-external-tool";

const modelValue: ModelRef<Array<string | undefined>> = defineModel({
	type: Array as PropType<Array<string | undefined>>,
	required: true,
});

defineProps({
	template: {
		type: Object as PropType<ExternalToolConfigurationTemplate>,
		required: true,
	},
});
</script>
