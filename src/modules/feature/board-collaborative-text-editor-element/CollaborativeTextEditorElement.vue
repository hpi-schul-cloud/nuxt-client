<template>
	<v-card
		class="mb-4"
		data-testid="collaborative-text-editor-element"
		variant="outlined"
		ref="collaborativetextEditorElement"
		:ripple="false"
		tabindex="0"
		elevation="0"
		@keydown.up.down="onKeydownArrow"
		role="button"
		@click="redirectToEditorUrl"
	>
		<ContentElementBar :hasGreyBackground="true" :icon="mdiTextBoxEditOutline">
			<template #display>
				<v-img
					:src="image"
					:alt="$t('components.cardElement.collaborativeTextEditorElement')"
					cover
					class="rounded-t"
				/>
			</template>
			<template #title>
				{{ $t("components.cardElement.collaborativeTextEditorElement") }}
			</template>
			<template #menu>
				<CollaborativeTextEditorElementMenu
					v-if="isEditMode"
					@move-down:element="onMoveDown"
					@move-up:element="onMoveUp"
					@delete:element="onDelete"
				/>
			</template>
		</ContentElementBar>
	</v-card>
</template>

<script setup lang="ts">
import image from "@/assets/img/collaborativeEditor.svg";
import {
	CollaborativeTextEditorElementResponse,
	CollaborativeTextEditorParentType,
} from "@/serverApi/v3";
import { useBoardFocusHandler } from "@data-board";
import { mdiTextBoxEditOutline } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { PropType, ref, toRef } from "vue";
import CollaborativeTextEditorElementMenu from "./components/CollaborativeTextEditorElementMenu.vue";
import { useCollaborativeTextEditorApi } from "./composables/CollaborativeTextEditorApi.composable";

const props = defineProps({
	element: {
		type: Object as PropType<CollaborativeTextEditorElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});

const emit = defineEmits([
	"delete:element",
	"move-down:edit",
	"move-up:edit",
	"move-keyboard:edit",
]);

const collaborativeTextEditorElement = ref<HTMLElement | null>(null);
const element = toRef(props, "element");
useBoardFocusHandler(element.value.id, collaborativeTextEditorElement);

const { getUrl } = useCollaborativeTextEditorApi();

const redirectToEditorUrl = async () => {
	const windowReference = window.open();

	getUrl(
		element.value.id,
		CollaborativeTextEditorParentType.ContentElement
	).then((url) => {
		if (url && windowReference) {
			windowReference.location = url;
		}
	});
};

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onDelete = () => emit("delete:element", props.element.id);
const onMoveUp = () => emit("move-up:edit");
const onMoveDown = () => emit("move-down:edit");
</script>
