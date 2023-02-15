<template>
	<div class="d-flex mb-6">
		<template v-if="isLoading">
			<CardSkeleton :height="height"></CardSkeleton>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CardSkeleton from "./CardSkeleton.vue";

export default defineComponent({
	name: "CardHost",
	components: { CardSkeleton },
	props: {
		height: { type: Number, required: true },
		id: { type: String, required: true },
	},
	setup() {
		const isLoading = ref<boolean>(true);
		return {
			isLoading,
		};
	},
});
</script>
