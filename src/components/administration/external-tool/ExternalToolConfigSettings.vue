<template>
	<div>
		<h2 class="text-h4 mb-10">
			Einstellungen
		</h2>
		<v-input v-for="param in parameters" :key="param.id" :label="param.name"></v-input>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { externalToolsModule } from "@utils/store-accessor";
import { computed, ComputedRef, Ref, toRef, watch } from "@nuxtjs/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	props: {
		externalTool: {
			type: Object,
			required: true,
		}
	},
	setup(props) {
		const externalTool: Ref = toRef(props, "externalTool");

		const parameters: ComputedRef<string[]> = computed(() => externalToolsModule.getToolConfigurationTemplate.parameters)

		watch(externalTool, async (value) => {
			console.log('watch');
			console.log(value);
			await externalToolsModule.loadToolConfigurationTemplateFromExternalTool(value.id);
		})

		return {
			parameters
		}
	}
});
</script>

<style scoped>

</style>
