<template>
	<v-list-item :title="item.name">
		<template #prepend v-if="item.logoUrl">
			<v-img
				cover
				v-if="item.logoUrl"
				:max-height="maxHeight"
				:max-width="maxWidth"
				:src="item.logoUrl"
				:width="maxHeight"
				class="mx-2"
			/>
		</template>
	</v-list-item>
</template>

<script setup lang="ts">
import { ExternalToolConfigurationTemplate } from "@data-external-tool";
import { defineProps, PropType } from "vue";

const props = defineProps({
	item: {
		type: Object as PropType<ExternalToolConfigurationTemplate>,
		required: true,
		default: () => ({}),
	},
	maxHeight: {
		type: [Number, String],
		default: 30,
	},
	maxWidth: {
		type: [Number, String],
		default: 30,
	},
});
</script>
