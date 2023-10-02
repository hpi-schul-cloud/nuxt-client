<template>
	<div>
		<v-img :src="imageSrc" height="185px" cover></v-img>
		<div class="board-last-updated">
			<span
				class="subtitle-1 d-inline-block text-truncate grey--text text--darken-2"
				:style="{ fontWeight: 400, padding: '10px 10px 0px 20px' }"
				data-testid="board-drawing-element-display-last-updated"
			>
				{{ $t("components.cardElement.lastUpdatedAt") }}
				{{ formattedLastUpdatedAt }}
			</span>
		</div>
		<div
			class="board-content"
			:style="{
				display: 'flex',
				alignItems: 'center',
				padding: '10px 0px 20px 20px',
			}"
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
				:style="{ fontWeight: 700, marginLeft: '10px' }"
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
	},
	setup(props) {
		const imageSrc = image;

		const formattedLastUpdatedAt = computed(() => {
			return dayjs(props.lastUpdatedAt).format("DD.MM HH:mm");
		});

		return {
			imageSrc,
			formattedLastUpdatedAt,
		};
	},
});
</script>
