<template>
	<v-card
		class="mb-4"
		data-testid="drawing-element"
		outlined
		dense
		ref="drawingElement"
		:ripple="false"
		tabindex="0"
		elevation="0"
		@keydown.up.down="onKeydownArrow"
		role="button"
		target="_blank"
	>
		<div class="drawing-element-content" @click="redirectToSanitizedUrl">
			<InnerContent
				v-if="!isEditMode"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:docName="element.id"
			/>

			<InnerContent
				v-if="isEditMode"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:docName="element.id"
				><BoardMenu scope="element">
					<BoardMenuActionMoveUp @click="onMoveDrawingElementEditUp" />
					<BoardMenuActionMoveDown @click="onMoveDrawingElementEditDown" />
					<BoardMenuActionDelete @click="onDeleteElement" />
				</BoardMenu>
			</InnerContent>
		</div>
		<v-alert
			v-if="isTeacher"
			light
			text
			type="info"
			dismissible
			:close-icon="mdiClose"
			class="mb-0"
		>
			<div class="alert-text">
				{{ $t("components.cardElement.notification.visibleAndEditable") }}
			</div>
		</v-alert>
	</v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRef } from "vue";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { DrawingElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler } from "@data-board";
import InnerContent from "./InnerContent.vue";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import AuthModule from "@/store/auth";
import { injectStrict, AUTH_MODULE_KEY } from "@/utils/inject";
import { mdiClose } from "@mdi/js";

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

		const redirectToSanitizedUrl = () => {
			window.open(sanitizedUrl.value, "_blank");
		};
		useBoardFocusHandler(element.value.id, drawingElement);

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};
		const onMoveDrawingElementEditDown = () => emit("move-down:edit");
		const onMoveDrawingElementEditUp = () => emit("move-up:edit");
		const onDeleteElement = () => emit("delete:element", element.value.id);

		const isTeacher = computed(() => {
			return userRoles.value.includes("teacher");
		});

		return {
			drawingElement,
			redirectToSanitizedUrl,
			onDeleteElement,
			onKeydownArrow,
			onMoveDrawingElementEditDown,
			onMoveDrawingElementEditUp,
			isTeacher,
			mdiClose,
		};
	},
});
</script>
<style lang="scss" scoped>
::v-deep .v-btn__content .v-icon,
.alert-text {
	color: var(--v-black-base) !important;
}
</style>
