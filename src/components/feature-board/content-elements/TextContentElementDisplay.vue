<template>
	<div>
		<VTextarea
			label="Text-Element"
			hide-details="auto"
			:value="value"
			solo
			dense
			:rows="1"
			auto-grow
			class="ml-n3 mb-0 w-full"
			flat
			background-color="transparent"
			:readonly="true"
		></VTextarea>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "TextContentElementDisplay",
	props: {
		value: {
			type: String,
			required: true,
		},
	},
});
</script>
