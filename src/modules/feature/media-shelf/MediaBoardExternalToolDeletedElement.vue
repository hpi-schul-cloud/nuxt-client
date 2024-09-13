<template>
	<MediaBoardElementDisplay
		:element="elementDisplayData"
		class="not-clickable"
		:isDeletedPlaceholder="true"
	>
		<template #imageOverlay>
			<div class="d-flex ga-1 flex-column pa-3">
				<WarningChip data-testid="warning-chip-no-longer-available">
					{{ $t("common.medium.chip.noLongerAvailable") }}
				</WarningChip>
			</div>
		</template>
		<template #menu>
			<div class="clickable">
				<MediaBoardExternalToolElementMenu @delete:element="onDelete" />
			</div>
		</template>
	</MediaBoardElementDisplay>
</template>

<script setup lang="ts">
import { DeletedElementResponse } from "@/serverApi/v3";
import { WarningChip } from "@ui-chip";
import { computed, PropType, Ref } from "vue";
import { MediaElementDisplay } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";
import MediaBoardExternalToolElementMenu from "./MediaBoardExternalToolElementMenu.vue";

const props = defineProps({
	element: {
		type: Object as PropType<DeletedElementResponse>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
}>();

const onDelete = async () => {
	emit("delete:element", props.element.id);
};

const elementDisplayData: Ref<MediaElementDisplay> = computed(() => {
	return {
		title: props.element?.content.title,
		description: props.element?.description,
		thumbnail: undefined,
	};
});
</script>

<style scoped>
.not-clickable {
	pointer-events: none;
}

.clickable {
	pointer-events: auto;
}
</style>
