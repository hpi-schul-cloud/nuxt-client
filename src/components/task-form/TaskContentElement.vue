<template>
	<v-card
		flat
		class="element mb-2"
		@mouseover="hover = true"
		@mouseleave="hover = false"
	>
		<div class="element-content mr-4">
			<slot />
		</div>
		<v-card-actions class="element-actions">
			<v-btn
				icon
				outlined
				color="secondary"
				class="drag-element-btn handle"
				:class="{ 'd-sr-only': isHidden }"
				data-testid="drag-element-btn"
			>
				<v-icon>{{ mdiDrag }}</v-icon>
			</v-btn>
			<v-btn
				icon
				outlined
				color="secondary"
				class="delete-element-btn"
				:class="{ 'd-sr-only': isHidden }"
				data-testid="delete-element-btn"
				@click="() => $emit('delete-element')"
			>
				<v-icon>{{ mdiTrashCanOutline }}</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
//import { useDrag } from "@/composables/drag";
import { mdiTrashCanOutline, mdiDrag } from "@mdi/js";

export default defineComponent({
	name: "TaskContentElement",
	setup() {
		//const { isTouchDevice } = useDrag();

		const hover = ref(false);
		//const isHidden = computed(() => !hover.value && !isTouchDevice());
		const isHidden = computed(() => false);

		return {
			hover,
			isHidden,
			mdiTrashCanOutline,
			mdiDrag,
		};
	},
});
</script>

<style lang="scss" scoped>
.element {
	display: flex;
	align-items: flex-start;
	margin-left: calc(-1 * var(--ck-spacing-standard));
	border: solid thin var(--v-white-base);
}

.element-content {
	flex-basis: 100%;
	flex-shrink: 1;
}

.element-actions {
	z-index: var(--layer-page);
	flex-basis: 100px;
	flex-grow: 0;
	flex-shrink: 0;
}
</style>
