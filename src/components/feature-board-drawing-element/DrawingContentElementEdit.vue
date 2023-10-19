<template>
	<div @click="onOpenElement">
		<div class="board-image-mask" />
		<v-img :src="imageSrc" class="hover-image" height="185px" cover />
		<div class="menu">
			<slot />
		</div>
		<v-list-item
			class="px-0"
			data-testid="drawing-element-edit"
			:inactive="true"
		>
			<v-list-item-content class="py-0 grey lighten-4">
				<div class="board-content">
					<v-icon
						class="grey--text text--darken-3"
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
				<div class="board-last-updated">
					<span
						class="subtitle-1 text-edit d-inline-block text-truncate black--text text--darken-2"
						data-testid="board-drawing-element-display-last-updated"
					>
						{{ $t("components.cardElement.lastUpdatedAt") }}
						{{ formattedLastUpdatedAt }}
					</span>
				</div>
			</v-list-item-content>
		</v-list-item>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
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
			imageSrc,
			formattedLastUpdatedAt,
			onOpenElement,
		};
	},
});
</script>
<style scoped lang="scss">
.board-image-mask {
	width: 100%;
	height: 100%;
	position: absolute;
}

.hover-image:hover {
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	filter: brightness(50%);
}
.menu {
	position: absolute;
	padding: 5px;
	right: 0;
	top: 0;
}
.text-edit {
	font-weight: 400;
	padding: 5px 0px 5px 15px;
}

.board-content {
	display: flex;
	align-items: center;
	padding: 10px 0px 0px 15px;
}

.board-subtitle {
	font-weight: 700;
	margin-left: 10px;
}
</style>
