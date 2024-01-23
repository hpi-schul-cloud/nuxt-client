<template>
	<div>
		<slot />
	</div>
</template>

<script lang="ts">
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_FIRST_ELEMENT,
	BOARD_CARD_IS_LAST_ELEMENT,
} from "@util-board";
import { computed, defineComponent, provide } from "vue";

export default defineComponent({
	name: "ContentElement",
	props: {
		elementCount: { type: Number, required: true },
		index: { type: Number, required: false },
	},
	setup(props) {
		const hasManyElements = computed(() => props.elementCount > 0);
		const isFirstElement = computed(
			() => hasManyElements.value && props.index === 0
		);
		const lastIndex = computed(() => props.elementCount - 1);
		const isLastElement = computed(
			() => hasManyElements.value && props.index === lastIndex.value
		);

		provide(BOARD_CARD_HAS_MULTIPLE_ELEMENTS, hasManyElements);
		provide(BOARD_CARD_IS_FIRST_ELEMENT, isFirstElement);
		provide(BOARD_CARD_IS_LAST_ELEMENT, isLastElement);

		return {};
	},
});
</script>
