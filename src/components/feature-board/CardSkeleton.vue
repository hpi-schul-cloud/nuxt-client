<template>
	<div
		class="d-flex justify-center align-center"
		:style="{ 'min-height': height + 'px' }"
	>
		<VProgressCircular
			color="primary"
			indeterminate
			:size="36"
		></VProgressCircular>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "CardSkeleton",
	props: {
		height: { type: Number, required: true },
	},
	setup() {
		return {};
	},
});
</script>
