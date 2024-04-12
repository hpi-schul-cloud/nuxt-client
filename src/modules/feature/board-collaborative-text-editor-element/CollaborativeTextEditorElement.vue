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
			<InnerContent :docName="element.id">
				<template v-if="isEditMode && isTeacher">
					<BoardMenu scope="element">
						<BoardMenuActionMoveUp
							@click="onMoveCollaborativeTextEditorElementEditUp"
						/>
						<BoardMenuActionMoveDown
							@click="onMoveCollaborativeTextEditorElementEditDown"
						/>
						<BoardMenuActionDelete @click="onDeleteElement" />
					</BoardMenu>
				</template>
			</InnerContent>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { CollaborativeTextEditorElementResponse } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useBoardFocusHandler } from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import { computed, PropType, ref, toRef } from "vue";
import InnerContent from "./InnerContent.vue";

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
const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const userRoles = ref(authModule.getUserRoles);

const sanitizedUrl = computed(() =>
	sanitizeUrl(`/tldraw?roomName=${element.value.id}`)
);

const redirectToSanitizedUrl = () => {
	window.open(sanitizedUrl.value, "_blank");
};
useBoardFocusHandler(element.value.id, collaborativeTextEditorElement);

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};
const onMoveCollaborativeTextEditorElementEditDown = () =>
	emit("move-down:edit");
const onMoveCollaborativeTextEditorElementEditUp = () => emit("move-up:edit");
const onDeleteElement = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", props.element.id);
	}
};

const isTeacher = computed(() => {
	return userRoles.value.includes("teacher");
});
</script>
