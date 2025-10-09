<template>
	<div>
		<div v-for="(param, index) in template.parameters" :key="param.name">
			<external-tool-config-parameter v-model="modelValue[index]" :parameter="template.parameters[index]" />
		</div>
	</div>
</template>

<script setup lang="ts">
import ExternalToolConfigParameter from "./ExternalToolConfigParameter.vue";
import { ExternalToolConfigurationTemplate } from "@data-external-tool";
import { ModelRef, PropType } from "vue";

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
