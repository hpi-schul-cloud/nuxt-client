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

<script lang="ts">
import { PropType } from "vue";
import { ExternalToolConfigurationTemplate } from "@/store/external-tool";

export default {
	name: "ExternalToolSelectionRow",
	props: {
		item: {
			type: Object as PropType<ExternalToolConfigurationTemplate>,
			required: true,
			default: () => ({}),
		},
		maxHeight: {
			type: [Number, String],
			default: () => 30,
		},
		maxWidth: {
			type: [Number, String],
			default: () => 30,
		},
	},
};
</script>
