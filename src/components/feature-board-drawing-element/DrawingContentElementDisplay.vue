<template>
	<div class="drawing-content-element-display" @click="openElement">
		<div class="content-image-mask rounded-md">
			<v-img :src="imageSrc" height="185px" cover />
		</div>
		<div class="content-info bg-grey-lighten-4">
			<div class="content py-2 px-3">
				<v-icon class="content-icon text-grey-darken-3" size="medium">
					$mdiPresentation
				</v-icon>
				<span
					class="text-subtitle-1 board-subtitle d-inline-block text-truncate text-black-darken-2"
				>
					{{ $t("components.cardElement.drawingElement") }}
				</span>
			</div>
			<div class="last-updated">
				<span
					class="text-subtitle-1 text-edit d-inline-block text-truncate text-black-darken-2 py-1 px-3"
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
		docName: { type: String, required: true },
	},
	setup(props, { emit }) {
		const imageSrc = image;

		const openElement = () => {
			const urlRoom = `/tldraw?roomName=${props.docName}`;
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
.drawing-content-element-display {
	&:hover {
		.content-image-mask {
			filter: brightness(80%);
		}
	}

	.content-image-mask {
		overflow: hidden;
	}

	.text-edit {
		font-weight: 400;
	}

	.content {
		display: flex;
		align-items: center;
	}

	.board-subtitle {
		font-weight: 700;
		margin-left: 10px;
	}
}
</style>
