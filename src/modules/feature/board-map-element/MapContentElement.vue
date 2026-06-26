<template>
	<VCard
		ref="mapContentElement"
		class="mb-4"
		data-testid="board-map-element"
		:ripple="false"
		variant="outlined"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<MapContentElementDisplay
			v-if="!isEditMode"
			:content="computedElement.content"
		>
			<template #menu>
				<BoardMenu
					:scope="BoardMenuScope.MAP_ELEMENT"
					has-background
					:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
				>
					<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
					<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
					<KebabMenuActionDelete @click="onDelete" />
				</BoardMenu>
			</template>
		</MapContentElementDisplay>

		<div v-if="isEditMode" class="map-edit-wrapper">
			<div class="map-edit-menu">
				<BoardMenu
					:scope="BoardMenuScope.MAP_ELEMENT"
					has-background
					:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
				>
					<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
					<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
					<KebabMenuActionDelete @click="onDelete" />
				</BoardMenu>
			</div>
			<MapContentElementEdit
				:model-value="modelValue"
				@update:model-value="onMapUpdate"
			/>
		</div>
	</VCard>
</template>

<script setup lang="ts">
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { MapElementContent, MapElementResponse } from "@api-server";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { PropType, ref, toRef } from "vue";
import MapContentElementDisplay from "./components/MapContentElementDisplay.vue";
import MapContentElementEdit from "./components/MapContentElementEdit.vue";

const props = defineProps({
	element: {
		type: Object as PropType<MapElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isDetailView: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, required: false },
	isNotLastElement: { type: Boolean, required: false },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits<{
	(e: "delete:element", id: string): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
}>();

const mapContentElement = ref(null);
const element = toRef(props, "element");

useBoardFocusHandler(element.value.id, mapContentElement);

const { modelValue, computedElement } = useContentElementState(props);

const onMapUpdate = (newContent: MapElementContent) => {
	Object.assign(modelValue.value, newContent);
};

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onMoveDown = () => emit("move-down:edit");
const onMoveUp = () => emit("move-up:edit");

const onDelete = async () => {
	const shouldDelete = await askDeletionForType("components.cardElement.mapElement");
	if (shouldDelete) {
		emit("delete:element", element.value.id);
	}
};
</script>

<style scoped>
.map-edit-wrapper {
	position: relative;
}

.map-edit-menu {
	position: absolute;
	top: 8px;
	right: 8px;
	z-index: 1000;
}
</style>
