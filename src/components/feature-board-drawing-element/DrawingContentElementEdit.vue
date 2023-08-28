<template>
	<div class="grey lighten-4">
		<v-img src="@/assets/img/tldraw.png" height="175px" cover></v-img>
		<v-list-item class="px-0" data-testid="drawing-element-edit" inactive>
			<v-list-item-content class="py-0">
				<div
					class="board-content"
					style="display: flex; align-items: center; padding: 20px"
				>
					<v-icon
						class="grey--text text--darken-2"
						data-testid="board-submission-element-display-icon"
						medium
					>
						$mdiPresentation
					</v-icon>
					<span
						class="subtitle-1 d-inline-block text-truncate black--text text--darken-2"
						style="font-weight: 700; margin-left: 10px"
						data-testid="board-drawing-element-display-content"
					>
						{{ $t("components.cardElement.drawingElement") }}
					</span>
				</div>
			</v-list-item-content>

			<DrawingContentElementMenu
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				:elementId="elementId"
				@open:element="onOpenElement"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@delete:element="onDeleteElement"
			/>
		</v-list-item>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DrawingContentElementMenu from "./DrawingContentElementMenu.vue";

export default defineComponent({
	name: "DrawingContentElementEdit",
	components: { DrawingContentElementMenu },
	props: {
		elementId: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"open:element",
	],
	setup(props, { emit }) {
		const onOpenElement = () => {
			const urlWithRoom = `/tldraw?roomName=${props.elementId}`;
			window.open(urlWithRoom, "_blank");
			emit("open:element");
		};
		const onMoveElementDown = () => {
			emit("move-down:element");
		};

		const onMoveElementUp = () => {
			emit("move-up:element");
		};

		const onDeleteElement = () => {
			emit("delete:element");
		};
		return {
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
			onOpenElement,
		};
	},
});
</script>
