<template>
	<div>
		<div v-if="parameters.length > 0">
			<h2 class="text-h4 mb-10">
				Einstellungen
			</h2>
			<v-text-field v-for="(param, index) in parameters" :key="param.name"
						  :label="param.name" @input="updateParameters($event, index)"></v-text-field>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { externalToolsModule } from "@utils/store-accessor";
import { computed, ComputedRef, Ref, toRef } from "@nuxtjs/composition-api";
import { ToolParameter } from "@store/external-tool";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	emits: ['parametersUpdated'],
	props: {
		toolParameters: {
			type: Array,
			required: true,
		}
	},
	setup(props: any, { emit }) {
		const parameters: Ref<ToolParameter[]> = toRef(props, "toolParameters");

		const loading: ComputedRef<boolean> = computed(() => externalToolsModule.getLoading);

		const updateParameters = (paramValue: string, index: number) => {
			// vue change detection for arrays does not work very well, so we have to set the value manually
			parameters.value[index] = { ...parameters.value[index], value: paramValue };
			emit('parametersUpdated', parameters.value);
		};

		return {
			parameters,
			loading,
			updateParameters,
		};
	}
});
</script>

<style scoped>

</style>
