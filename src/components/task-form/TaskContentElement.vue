<template>
	<v-card
		flat
		class="element"
		@mouseover="hover = true"
		@mouseleave="hover = false"
	>
		<div class="element-content">
			<slot />
		</div>
		<div class="element-actions">
			<v-btn
				icon
				outlined
				color="secondary"
				absolute
				class="delete-element-btn"
				:class="{ 'd-sr-only': isHidden }"
				data-testid="delete-element-btn"
				@click="() => $emit('delete-element')"
			>
				<v-icon>{{ mdiTrashCanOutline }}</v-icon>
			</v-btn>
			<v-btn
				icon
				outlined
				color="secondary"
				absolute
				class="drag-element-btn handle"
				:class="{ 'd-sr-only': isHidden }"
				data-testid="drag-element-btn"
			>
				<v-icon>{{ mdiDrag }}</v-icon>
			</v-btn>
		</div>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import { useDrag } from "@/composables/drag";
import { mdiTrashCanOutline, mdiDrag } from "@mdi/js";

export default defineComponent({
	name: "TaskContentElement",
	setup() {
		const { isTouchDevice } = useDrag();

		const hover = ref(false);
		const isHidden = computed(() => !hover.value && !isTouchDevice());

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
@import "~vuetify/src/components/VBtn/_variables.scss";
@import "~vuetify/src/components/VCard/_variables.scss";

.element {
	display: flex;
	align-items: flex-start;
}

.element-content {
	flex-basis: 100%;
}

.element-actions {
	position: relative;
	flex-basis: #{map-get($btn-sizes, "default")}px;
	flex-shrink: 1;
}

.delete-element-btn {
	z-index: var(--layer-page);
}

.drag-element-btn {
	top: #{map-get($btn-sizes, "default") + $card-actions-padding};
	z-index: var(--layer-page);
}
</style>
