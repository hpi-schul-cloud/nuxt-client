<template>
	<div>
		<v-img :src="imageSrc" height="185px" cover></v-img>
		<v-list-item
			class="px-0"
			data-testid="drawing-element-edit"
			:inactive="true"
		>
			<v-list-item-content class="py-0">
				<div class="board-last-updated">
					<span
						class="subtitle-1 text-edit d-inline-block text-truncate grey--text text--darken-2"
						data-testid="board-drawing-element-display-last-updated"
					>
						{{ $t("components.cardElement.lastUpdatedAt") }}
						{{ formattedLastUpdatedAt }}
					</span>
				</div>
				<div class="board-content">
					<v-icon
						class="grey--text text--darken-2"
						data-testid="board-submission-element-display-icon"
						medium
					>
						$mdiPresentation
					</v-icon>
					<span
						class="subtitle-1 board-subtitle d-inline-block text-truncate black--text text--darken-2"
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
				:drawingName="drawingName"
				@open:element="onOpenElement"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@delete:element="onDeleteElement"
			/>
		</v-list-item>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import DrawingContentElementMenu from "@/components/feature-board-drawing-element/DrawingContentElementMenu.vue";
import image from "@/assets/img/tldraw.png";
import dayjs from "dayjs";
export default defineComponent({
	name: "DrawingContentElementDisplay",
	components: { DrawingContentElementMenu },
	props: {
		lastUpdatedAt: {
			type: String,
			required: true,
		},
		drawingName: { type: String, required: true },
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
		const imageSrc = image;
		const formattedLastUpdatedAt = computed(() => {
			return dayjs(props.lastUpdatedAt).format("DD.MM HH:mm");
		});
		const onOpenElement = () => {
			const urlWithRoom = `/tldraw?roomName=${props.drawingName}`;
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
			imageSrc,
			formattedLastUpdatedAt,
			onOpenElement,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
		};
	},
});
</script>
<style scoped>
.text-edit {
	font-weight: 400;
	padding: 10px 10px 0px 20px;
}

.board-content {
	display: flex;
	align-items: center;
	padding: 10px 0px 20px 20px;
}

.board-subtitle {
	font-weight: 700;
	margin-left: 10px;
}
</style>
>
