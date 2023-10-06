<template>
	<div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { BOARD_CARD_HAS_MULTIPLE_ELEMENTS } from "@util-board";
import { defineComponent, provide } from "vue";

export default defineComponent({
	name: "BoardMenuActionEdit",
	props: {
		hasMultipleElements: { type: Boolean, required: true },
	},
	setup(props) {
		provide(BOARD_CARD_HAS_MULTIPLE_ELEMENTS, props.hasMultipleElements);

		return {};
	},
});
</script>
