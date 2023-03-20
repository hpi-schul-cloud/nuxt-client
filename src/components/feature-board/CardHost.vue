<template>
	<div class="d-flex" @keydown.up.down.left.right.space.prevent="onKeyDown">
		<VCard class="w-100" outlined tabindex="0" :id="id">
			<template v-if="isLoading">
				<CardSkeleton :height="height" />
			</template>
			<template v-if="!isLoading && card">
				<VCardTitle>{{ card.title }}</VCardTitle>
				<div
					v-for="(element, index) in card.elements"
					:key="element.id"
					class="element"
				>
					Element {{ index + 1 }}
				</div>
			</template>
		</VCard>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardSkeleton from "./CardSkeleton.vue";
import { useCardState } from "./CardState.composable";

export default defineComponent({
	name: "CardHost",
	components: {
		CardSkeleton,
	},
	props: {
		height: { type: Number, required: true },
		id: { type: String, required: true },
	},
	setup(props, { emit }) {
		const { isLoading, card } = useCardState(props.id);

		const onKeyDown = (key: KeyboardEvent) => {
			emit("move-card-keyboard", key.code);
		};

		return {
			isLoading,
			card,
			onKeyDown,
		};
	},
});
</script>

<style scoped>
.element {
	margin-left: 10px;
	padding: 10px 14px;
}
.element:last-child {
	margin-bottom: 14px;
}
</style>
