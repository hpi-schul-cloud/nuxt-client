<template>
	<div class="d-flex mb-6">
		<template v-if="isLoading">
			<CardSkeleton :height="height"></CardSkeleton>
		</template>
		<template v-if="!isLoading && card">
			{{ card.id }}
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCardState } from "./CardState.composable";
import CardSkeleton from "./CardSkeleton.vue";

export default defineComponent({
	name: "CardHost",
	components: { CardSkeleton },
	props: {
		height: { type: Number, required: true },
		id: { type: String, required: true },
	},
	setup(props) {
		const { isLoading, card } = useCardState(props.id);

		return {
			isLoading,
			card,
		};
	},
});
</script>
