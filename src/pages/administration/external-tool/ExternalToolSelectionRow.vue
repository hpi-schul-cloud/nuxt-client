<template>
	<v-row no-gutters align="center">
		<v-img
			v-if="item.logoUrl"
			:max-height="$props.maxHeight"
			:max-width="$props.maxWidth"
			:src="item.logoUrl"
			class="mx-2"
		></v-img>
		<span> {{ item.name }} </span>
	</v-row>
</template>

<script lang="ts">
import { PropType } from "vue";
import { ToolConfiguration } from "@/store/external-tool";

export default {
	name: "ExternalToolSelectionRow",
	props: {
		item: {
			type: Object as PropType<ToolConfiguration>,
			required: true,
			default: () => ({})
		},
		maxHeight: {
			type: [Number, String],
			default: () => 30
		},
		maxWidth: {
			type: [Number, String],
			default: () => 30
		},
	},
};
</script>
