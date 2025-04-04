<template>
	<v-card
		ref="collaborativeTextEditorElement"
		class="text-editor-card mb-4"
		data-testid="collaborative-text-editor-element"
		variant="outlined"
		:ripple="false"
		tabindex="0"
		role="button"
		:aria-label="ariaLabel"
		@keydown.up.down="onKeydownArrow"
		@click="redirectToEditorUrl"
		@keydown.enter.space="redirectToEditorUrl"
		@keydown.stop
	>
		<ContentElementBar
			:has-grey-background="true"
			:has-row-style="isSmallOrLargerListBoard"
			:icon="mdiTextBoxEditOutline"
		>
			<template #display>
				<v-img :src="image" alt="" cover />
			</template>
			<template #title>
				{{ t("components.cardElement.collaborativeTextEditorElement") }}
			</template>
			<template #menu>
				<CollaborativeTextEditorElementMenu
					v-if="isEditMode"
					:column-index="columnIndex"
					:is-not-first-element="isNotFirstElement"
					:is-not-last-element="isNotLastElement"
					:row-index="rowIndex"
					:element-index="elementIndex"
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
import { mdiTextBoxEditOutline } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { computed, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import CollaborativeTextEditorElementMenu from "./components/CollaborativeTextEditorElementMenu.vue";
import { useCollaborativeTextEditorApi } from "./composables/CollaborativeTextEditorApi.composable";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { injectStrict } from "@/utils/inject";
import { useDisplay } from "vuetify";

const props = defineProps({
	element: {
		type: Object as PropType<CollaborativeTextEditorElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, requried: false },
	isNotLastElement: { type: Boolean, requried: false },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits([
	"delete:element",
	"move-down:edit",
	"move-up:edit",
	"move-keyboard:edit",
]);

const { t } = useI18n();

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

const ariaLabel = computed(() => {
	return `${t("components.cardElement.collaborativeTextEditorElement")}, ${t(
		"common.ariaLabel.newTab"
	)}`;
});

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onDelete = () => emit("delete:element", props.element.id);
const onMoveUp = () => emit("move-up:edit");
const onMoveDown = () => emit("move-down:edit");

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});
</script>

<style scoped lang="scss">
.text-editor-card {
	outline-offset: 1px;
}
</style>
