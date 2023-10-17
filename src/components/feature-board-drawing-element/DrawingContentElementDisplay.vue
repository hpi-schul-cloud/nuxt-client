<template>
	<div class="board-open" @click="onOpenElement">
		<div class="board-image-mask">
			<v-img :src="imageSrc" height="185px" cover></v-img>
		</div>
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
				data-testid="board-drawing-element-display-icon"
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
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import image from "@/assets/img/tldraw.png";
import dayjs from "dayjs";
export default defineComponent({
	name: "DrawingContentElementDisplay",
	props: {
		lastUpdatedAt: {
			type: String,
			required: true,
		},
		drawingName: { type: String, required: true },
	},
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
		return {
			onOpenElement,
			imageSrc,
			formattedLastUpdatedAt,
		};
	},
});
</script>
<style scoped lang="scss">
.board-image-mask {
	overflow: hidden;
	&:hover {
		filter: brightness(50%);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
}

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
