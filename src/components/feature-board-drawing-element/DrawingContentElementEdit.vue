<template>
	<div class="drawing-content-element-edit" @click="onOpenElement">
		<div class="edit-image-mask rounded-mb" />
		<v-img :src="imageSrc" class="hover-image" height="185px" cover />
		<div class="menu">
			<slot />
		</div>
		<v-list-item
			class="edit-content-info px-0"
			data-testid="drawing-element-edit"
			:inactive="true"
		>
			<v-list-item-content class="py-0">
				<div class="content py-2 px-3">
					<v-icon
						class="edit-icon text-grey-darken-3"
						data-testid="board-drawing-element-icon"
						size="medium"
					>
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
			</v-list-item-content>
		</v-list-item>
	</div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { computed, defineComponent } from "vue";
import image from "@/assets/img/tldraw.png";

export default defineComponent({
	name: "DrawingContentElementEdit",

	props: {
		lastUpdatedAt: {
			type: String,
			required: true,
		},
		docName: { type: String, required: true },
	},

	setup(props, { emit }) {
		const imageSrc = image;
		const formattedLastUpdatedAt = computed(() => {
			return dayjs(props.lastUpdatedAt).format("DD.MM HH:mm");
		});

		const onOpenElement = () => {
			const urlWithRoom = `/tldraw?roomName=${props.docName}`;
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
.drawing-content-element-edit {
	position: relative;

	&:hover {
		.hover-image {
			filter: brightness(80%);
		}

		.menu {
			opacity: 1;
		}
	}

	.edit-image-mask {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.hover-image {
		height: 185px;
		width: 100%;
		object-fit: cover;
		transition: filter 0.3s;
	}

	.menu {
		position: absolute;
		padding: 5px;
		right: 0;
		top: 0;
		opacity: 1;
		transition: opacity 0.3s;
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
