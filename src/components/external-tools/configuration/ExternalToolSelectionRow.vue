<template>
	<v-list-item :title="item.name">
		<template v-if="item.logoUrl" #prepend>
			<v-img
				v-if="item.logoUrl"
				cover
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
import { PropType } from "vue";

defineProps({
	item: {
		type: Object as PropType<ExternalToolConfigurationTemplate>,
		required: true,
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
