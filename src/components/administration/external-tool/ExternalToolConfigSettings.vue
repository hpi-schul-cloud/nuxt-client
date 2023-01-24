<template>
	<div>
		<div v-if="parameters.length > 0">
			<h2 class="text-h4 mb-10">
				Einstellungen
			</h2>
			<v-text-field v-for="param in parameters" :key="param.id" :label="param.name"></v-text-field>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { externalToolsModule } from "@utils/store-accessor";
import { computed, ComputedRef, Ref, toRef, watch } from "@nuxtjs/composition-api";
import { ToolConfiguration } from "@store/external-tool/tool-configuration";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	props: {
		externalTool: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	setup(props: any) {
		const externalTool: Ref = toRef(props, "externalTool");

		const parameters: Ref<string[]> = ref([]);

		watch(externalTool, async (value: ToolConfiguration) => {
			await externalToolsModule.loadToolConfigurationTemplateFromExternalTool(value.id);
			parameters.value = externalToolsModule.getToolConfigurationTemplate.parameters;
		})

		const loading: ComputedRef<boolean> = computed(() => externalToolsModule.getLoading);

		return {
			parameters,
			loading,
		}
	}
});
</script>

<style scoped>

</style>
