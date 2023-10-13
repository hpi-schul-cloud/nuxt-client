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
import { defineComponent, provide } from "vue";

export default defineComponent({
	name: "BoardMenuActionEdit",
	props: {
		elementCount: { type: Number, required: true },
		index: { type: Number, required: false },
	},
	setup(props) {
		const hasMultipleElements = props.elementCount > 0;
		const isFirstElement = hasMultipleElements && props.index === 0;
		const lastIndex = props.elementCount - 1;
		const isLastElement = hasMultipleElements && props.index === lastIndex;

		provide(BOARD_CARD_HAS_MULTIPLE_ELEMENTS, hasMultipleElements);
		provide(BOARD_CARD_IS_FIRST_ELEMENT, isFirstElement);
		provide(BOARD_CARD_IS_LAST_ELEMENT, isLastElement);

		return {};
	},
});
</script>
