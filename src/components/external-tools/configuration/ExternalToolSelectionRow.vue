<template>
	<v-list-item :title="item.name">
		<template #prepend>
			<v-img
				v-if="item.logoUrl"
				:max-height="$props.maxHeight"
				:max-width="$props.maxWidth"
				:src="item.logoUrl"
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
