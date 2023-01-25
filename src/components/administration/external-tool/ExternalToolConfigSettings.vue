<template>
	<div>
		<div v-if="template">
			<h2 class="text-h4 mb-10">
				Einstellungen
			</h2>
			<v-text-field v-for="param in template.parameters" :key="param.name"
						  v-model="configParams[param.name]"
						  :label="param.name"></v-text-field>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
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
		toolTemplate: {
			type: Object,
			required: true,
			default() {
				return {}
			}
		},
		toolConfig: {
			type: Object,
			required: true,
		}
	},
	setup(props: any) {
		const template: Ref = toRef(props, "toolTemplate");

		const configParams: Ref = toRef(props, "toolConfig");

		watch(template, () => {
			console.log('watch template')
			configParams.value = {};
		});

		const loading: ComputedRef<boolean> = computed(() => externalToolsModule.getLoading);

		return {
			template,
			configParams,
			loading,
		};
	}
});
</script>

<style scoped>

</style>
