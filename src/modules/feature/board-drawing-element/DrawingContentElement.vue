<template>
	<v-card
		class="mb-4"
		data-testid="drawing-element"
		variant="outlined"
		ref="drawingElement"
		:ripple="false"
		elevation="0"
		:href="sanitizedUrl"
		target="_blank"
		@keydown.up.down="onKeydownArrow"
	>
		<div class="drawing-element-content">
			<InnerContent
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:docName="element.id"
			>
				<template v-if="isEditMode">
					<BoardMenu scope="element">
						<BoardMenuActionMoveUp @click="onMoveDrawingElementEditUp" />
						<BoardMenuActionMoveDown @click="onMoveDrawingElementEditDown" />
						<BoardMenuActionDelete @click="onDeleteElement" />
					</BoardMenu>
				</template>
			</InnerContent>
		</div>
	</v-card>
</template>

<script lang="ts">
import { DrawingElementResponse } from "@/serverApi/v3";
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
import { computed, defineComponent, PropType, ref, toRef } from "vue";
import InnerContent from "./InnerContent.vue";

export default defineComponent({
	name: "DrawingContentElement",
	components: {
		BoardMenu,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
		BoardMenuActionDelete,
		InnerContent,
	},
	props: {
		element: {
			type: Object as PropType<DrawingElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const drawingElement = ref<HTMLElement | null>(null);
		const element = toRef(props, "element");
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
		const userRoles = ref(authModule.getUserRoles);

		const sanitizedUrl = computed(() =>
			sanitizeUrl(`/tldraw?roomName=${element.value.id}`)
		);

		useBoardFocusHandler(element.value.id, drawingElement);

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};
		const onMoveDrawingElementEditDown = () => emit("move-down:edit");
		const onMoveDrawingElementEditUp = () => emit("move-up:edit");
		const onDeleteElement = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element", props.element.id);
			}
		};

		const isTeacher = computed(() => {
			return userRoles.value.includes("teacher");
		});
		return {
			drawingElement,
			onDeleteElement,
			onKeydownArrow,
			onMoveDrawingElementEditDown,
			onMoveDrawingElementEditUp,
			isTeacher,
			sanitizedUrl,
		};
	},
});
</script>
