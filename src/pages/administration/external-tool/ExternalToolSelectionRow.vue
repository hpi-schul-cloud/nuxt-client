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
			default() {
				return {};
			},
		},
		maxHeight: {
			type: String,
			default() {
				return "30";
			},
		},
		maxWidth: {
			type: String,
			default() {
				return "30";
			},
		},
	},
};
</script>
