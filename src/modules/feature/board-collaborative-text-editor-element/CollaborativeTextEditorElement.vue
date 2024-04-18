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
	>
		<div
			class="collaborative-text-editor-element-content"
			@click="redirectToSanitizedUrl"
		>
			<ContentElementBar
				:hasGreyBackground="true"
				:icon="mdiTextBoxEditOutline"
			>
				<template #display>
					<v-img :src="image" height="185px" alt="" cover class="rounded-t" />
				</template>
				<template #title>
					{{ $t("components.cardElement.collaborativeTextEditorElement") }}
				</template>
				<template #menu v-if="isEditMode && isTeacher">
					<BoardMenu scope="element">
						<BoardMenuActionMoveUp @click="onMoveUp" />
						<BoardMenuActionMoveDown @click="onMoveDown" />
						<BoardMenuActionDelete @click="onDelete" />
					</BoardMenu>
				</template>
			</ContentElementBar>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import image from "@/assets/img/collaborativeEditor.svg";
import { mdiTextBoxEditOutline } from "@mdi/js";
import {
	CollaborativeTextEditorElementResponse,
	CollaborativeTextEditorParentType,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useBoardFocusHandler } from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	ContentElementBar,
} from "@ui-board";
import { PropType, computed, ref, toRef } from "vue";
import { useCollaborativeTextEditorApi } from "./shared/composables/CollaborativeTextEditorApi.composable";

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

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const userRoles = ref(authModule.getUserRoles);

const { getUrl } = useCollaborativeTextEditorApi();

const isTeacher = computed(() => {
	return userRoles.value.includes("teacher");
});

const redirectToSanitizedUrl = async () => {
	const url = await getUrl(
		element.value.id,
		CollaborativeTextEditorParentType.ContentElement
	);
	const sanitizedUrl = sanitizeUrl(url);

	window.open(sanitizedUrl, "_blank");
};

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};
const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", props.element.id);
	}
};

const onMoveUp = () => emit("move-up:edit");
const onMoveDown = () => emit("move-down:edit");
</script>
