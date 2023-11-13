<template>
	<div class="drawing-content-element-display" @click="openElement">
		<div class="content-image-mask">
			<v-img :src="imageSrc" height="185px" cover />
		</div>
		<div class="content-info grey lighten-4">
			<div class="content">
				<v-icon class="content-icon grey--text text--darken-3" medium>
					$mdiPresentation
				</v-icon>
				<span
					class="subtitle-1 board-subtitle d-inline-block text-truncate black--text text--darken-2"
				>
					{{ $t("components.cardElement.drawingElement") }}
				</span>
			</div>
			<div class="last-updated">
				<span
					class="subtitle-1 text-edit d-inline-block text-truncate black--text text--darken-2"
				>
					{{ $t("components.cardElement.lastUpdatedAt") }}
					{{ formattedLastUpdatedAt }}
				</span>
			</div>
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

		const openElement = () => {
			const urlRoom = `/tldraw?roomName=${props.drawingName}`;
			window.open(urlRoom, "_blank");
			emit("open:element");
		};

		const formattedLastUpdatedAt = computed(() => {
			return dayjs(props.lastUpdatedAt).format("DD.MM HH:mm");
		});

		return {
			openElement,
			imageSrc,
			formattedLastUpdatedAt,
		};
	},
});
</script>
<style scoped lang="scss">
.content-image-mask {
	overflow: hidden;
	&:hover {
		filter: brightness(50%);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
}

.text-edit {
	font-weight: 400;
	padding: 5px 0px 5px 15px;
}
.content {
	display: flex;
	align-items: center;
	padding: 10px 0px 0px 15px;
}

.board-subtitle {
	font-weight: 700;
	margin-left: 10px;
}
</style>
