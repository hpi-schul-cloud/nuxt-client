<template>
	<VCard
		v-show="hasLinkedContent || isEditMode"
		ref="elementCard"
		class="mb-4"
		data-testid="board-hp5-element"
		elevation="0"
		variant="outlined"
		:ripple="false"
		tabindex="0"
		role="button"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
		@keyup.enter="onClickElement"
		@click="onClickElement"
	>
		<ContentElementBar
			:has-grey-background="true"
			icon="$h5pOutline"
			:has-row-style="isSmallOrLargerListBoard"
		>
			<template #display>
				<v-img
					:src="H5PImage"
					:aspect-ratio="isSmallOrLargerListBoard ? 1.77777 : undefined"
					:cover="isSmallOrLargerListBoard"
				/>
			</template>
			<template #title> {{ contentTitle }} </template>
			<template #menu>
				<H5pElementMenu
					v-if="isEditMode"
					:display-name="undefined /* TODO add content name */"
					:column-index="columnIndex"
					:row-index="rowIndex"
					:element-index="elementIndex"
					:is-not-first-element="isNotFirstElement"
					:is-not-last-element="isNotLastElement"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
					@edit:element="onEdit"
				/>
			</template>
		</ContentElementBar>
	</VCard>
</template>

<script setup lang="ts">
import H5PImage from "@/assets/img/h5p/default_h5p_display.svg";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import { H5pElementResponse } from "@/serverApi/v3";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { injectStrict } from "@/utils/inject";
import { useBoardFocusHandler } from "@data-board";
import { useH5PEditorApi } from "@data-h5p";
import { ContentElementBar } from "@ui-board";
import { computed, onMounted, Ref, ref, toRef } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import H5pElementMenu from "./H5pElementMenu.vue";

const props = defineProps<{
	element: H5pElementResponse;
	isEditMode: boolean;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
}>();

const emit = defineEmits<{
	(e: "delete:element", id: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const { t } = useI18n();
const { smAndUp } = useDisplay();
const { getContentTitle } = useH5PEditorApi();

const element: Ref<H5pElementResponse> = toRef(props, "element");

const elementCard: Ref<HTMLElement | null> = ref(null);
useBoardFocusHandler(element.value.id, elementCard);

const hasLinkedContent = computed(() => !!element.value.content.contentId);

const router = useRouter();
const editorWindow: Ref<Window | null> = ref(null);

const isListLayout: Ref<boolean> = ref(injectStrict(BOARD_IS_LIST_LAYOUT));

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});

const contentTitle = ref<string>("");

const openEditorWindow = () => {
	const route = router.resolve({
		name: "h5pEditor",
		params: {
			contentId: element.value.content.contentId ?? undefined,
		},
		query: {
			parentType: H5PContentParentType.BOARD_ELEMENT,
			parentId: element.value.id,
		},
	});

	editorWindow.value = window.open(route.href, "_blank");
};

const openPlayerWindow = () => {
	if (!element.value.content.contentId) {
		return;
	}

	const route = router.resolve({
		name: "h5pPlayer",
		params: {
			contentId: element.value.content.contentId,
		},
		query: {
			parentType: H5PContentParentType.BOARD_ELEMENT,
		},
	});

	editorWindow.value = window.open(route.href, "_blank");
};

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onMoveElementDown = () => {
	emit("move-down:edit");
};

const onMoveElementUp = () => {
	emit("move-up:edit");
};

const onDeleteElement = () => emit("delete:element", element.value.id);

const onEdit = () => {
	openEditorWindow();
};

const onClickElement = () => {
	if (hasLinkedContent.value) {
		openPlayerWindow();
	} else {
		openEditorWindow();
	}
};

onMounted(async () => {
	const contentId: string | null = element.value.content.contentId;
	if (contentId) {
		const title = await getContentTitle(contentId);
		contentTitle.value = title ?? t("components.cardElement.h5pElement");
	}
});
</script>
