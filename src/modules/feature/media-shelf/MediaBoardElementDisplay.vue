<template>
	<div class="bg-white rounded">
		<VCard
			ref="card"
			class="pa-4"
			variant="outlined"
			tabindex="0"
			:data-testid="'media-element-' + element?.title"
			:elevation="isHovered ? 4 : 2"
			:ripple="false"
			:hover="isHovered"
		>
			<VCard
				v-if="element"
				class="element d-flex flex-column justify-end"
				elevation="0"
				variant="outlined"
				:ripple="false"
			>
				<div class="position-relative">
					<v-img
						v-if="element.thumbnail"
						:src="element.thumbnail"
						:aspect-ratio="16 / 9"
						width="100%"
						data-testid="media-element-thumbnail"
					/>
					<v-img
						v-else
						:aspect-ratio="16 / 9"
						width="100%"
						src="@/assets/img/media-board/default_img_media_shelf.png"
						data-testid="media-element-default-thumbnail"
					/>
					<div class="chip-position">
						<slot name="imageOverlay" />
					</div>
				</div>
				<ContentElementBar :has-grey-background="true">
					<template #title>
						<div data-testid="media-element-title">
							{{ element.title }}
						</div>
					</template>
					<template #description>
						<div
							class="description text-body-2"
							data-testid="media-element-description"
						>
							{{ element.description }}
						</div>
					</template>
				</ContentElementBar>
			</VCard>
			<VSkeletonLoader v-else class="element border" type="image, article" />
		</VCard>
	</div>
</template>

<script setup lang="ts">
import ContentElementBar from "@ui-board/content-element/ContentElementBar.vue";
import { useElementHover } from "@vueuse/core";
import { PropType, ref } from "vue";
import { MediaElementDisplay } from "./data";

defineProps({
	element: {
		type: Object as PropType<MediaElementDisplay>,
	},
});

const card = ref(null);
const isHovered = useElementHover(card);
</script>

<style scoped lang="scss">
$card-width: 288px;

.element {
	min-width: $card-width;
	max-width: $card-width;
}

.placeholder {
	background-color: lightgray;
}

.description {
	height: 3.75rem;
	overflow: hidden;
}

.chip-position {
	position: absolute;
	bottom: 0;
	left: 0;
}
</style>
