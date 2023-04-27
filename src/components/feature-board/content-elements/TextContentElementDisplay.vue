<template>
	<div class="text">
		{{ value }}
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

<style scoped>
.text {
	font-size: 16px;
	color: rgba(0, 0, 0, 0.87);
	margin-top: 17px;
	margin-bottom: 17px;
}
.text:first-child {
	margin-top: 0px;
}
</style>
