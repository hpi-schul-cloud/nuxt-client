<template>
	<VCard :height="height" class="w-100">
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
	</VCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VCard, VProgressCircular } from "vuetify/lib";

export default defineComponent({
	name: "CardSkeleton",
	components: { VCard, VProgressCircular },
	props: {
		height: { type: Number, required: true },
	},
	setup() {
		return {};
	},
});
</script>
