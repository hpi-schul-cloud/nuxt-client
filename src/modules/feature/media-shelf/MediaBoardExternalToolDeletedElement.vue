<template>
	<MediaBoardElementDisplay :element="elementDisplayData" :is-unavailable="true">
		<template #imageOverlay>
			<div class="d-flex ga-1 flex-column pa-3">
				<WarningChip data-testid="warning-chip-no-longer-available">
					{{ $t("common.medium.chip.noLongerAvailable") }}
				</WarningChip>
			</div>
		</template>
		<template #menu>
			<MediaBoardExternalToolElementMenu @delete:element="onDelete" />
		</template>
	</MediaBoardElementDisplay>
</template>

<script setup lang="ts">
import { MediaElementDisplay } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";
import MediaBoardExternalToolElementMenu from "./MediaBoardExternalToolElementMenu.vue";
import { DeletedElementResponse } from "@/serverApi/v3";
import { WarningChip } from "@ui-chip";
import { computed, PropType, Ref } from "vue";

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

const elementDisplayData: Ref<MediaElementDisplay> = computed(() => ({
	title: props.element?.content.title,
	description: props.element?.content.description,
	thumbnail: undefined,
	domain: "",
}));
</script>
