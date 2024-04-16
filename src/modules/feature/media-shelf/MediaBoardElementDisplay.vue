<template>
	<div class="bg-white rounded">
		<VCard
			ref="card"
			class="pa-4"
			variant="outlined"
			tabindex="0"
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
				<v-img
					v-if="element.thumbnail"
					:src="element.thumbnail"
					class="flex-fill"
					min-height="100px"
					cover
					data-testid="media-element-thumbnail"
				/>
				<v-img
					v-else
					src="@/assets/img/media-board/default_img_media_shelf.png"
					class="flex-fill bg-white"
					min-height="100px"
					cover
					data-testid="media-element-default-thumbnail"
				/>
				<ContentElementBar :has-grey-background="true">
					<template #title>
						{{ element.title }}
					</template>
					<template #description>
						<div class="description">
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
import { MediaElementDisplay } from "./data/types";

defineProps({
	element: {
		type: Object as PropType<MediaElementDisplay>,
	},
});

const card = ref(null);
const isHovered = useElementHover(card);
</script>

<style scoped lang="scss">
$card-height: 366px;
$card-width: 344px;

.element {
	min-width: $card-width;
	max-width: $card-width;
	min-height: $card-height;
	max-height: $card-height;
}

.placeholder {
	background-color: lightgray;
}

.description {
	height: calc(3em * var(--line-height-md));
	overflow: hidden;
}
</style>
