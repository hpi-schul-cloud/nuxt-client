<template>
	<VCard
		v-show="hasLinkedContent || isEditMode"
		ref="elementCard"
		class="mb-4"
		data-testid="board-hp5-element"
		variant="outlined"
		:aria-label="ariaLabel"
		:ripple="false"
		:role="isEditMode ? undefined : 'link'"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
		@keyup.enter.space="onClickElement"
		@click="onClickElement"
	>
		<ContentElementBar icon="$h5pOutline" :has-row-style="isSmallOrLargerListBoard">
			<template #display>
				<v-img
					v-if="hasLinkedContent"
					:src="H5PImage"
					:aspect-ratio="isSmallOrLargerListBoard ? 1.77777 : undefined"
					:cover="isSmallOrLargerListBoard"
					alt=""
				/>
			</template>
			<template #title>
				{{ hasLinkedContent ? contentTitle : t("components.cardElement.h5pElement.create") }}
			</template>
			<template #menu>
				<H5pElementMenu
					v-if="isEditMode"
					:display-name="contentTitle"
					:column-index="columnIndex"
					:row-index="rowIndex"
					:element-index="elementIndex"
					:is-not-first-element="isNotFirstElement"
					:is-not-last-element="isNotLastElement"
					:has-linked-content="hasLinkedContent"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
					@edit:element="onEdit"
					@download:content="onDownload"
				/>
			</template>
		</ContentElementBar>
		<VCardActions v-if="hasLinkedContent" class="py-2 pl-4">
			<v-spacer />
			<VBtn
				:aria-label="t('components.board.action.download')"
				:disabled="false"
				data-testid="h5p-folder-element-download-button"
				class="float-right download-button"
				:icon="mdiTrayArrowDown"
				size="small"
				variant="text"
				@click="onDownload"
				@keydown.enter="onDownload"
				@keyup.enter.space.stop
			/>
		</VCardActions>
	</VCard>
</template>

<script setup lang="ts">
import H5pElementMenu from "./H5pElementMenu.vue";
import H5PImage from "@/assets/img/h5p/default_h5p_display.svg";
import { downloadFile } from "@/utils/fileHelper";
import { injectStrict } from "@/utils/inject";
import { decodeHtmlEntities } from "@/utils/textFormatting";
import { H5PContentParentType } from "@api-h5p";
import { H5pElementResponse } from "@api-server";
import { useBoardFocusHandler } from "@data-board";
import { useH5PEditorApi } from "@data-h5p";
import { mdiTrayArrowDown } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { computed, onMounted, Ref, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

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

const isSmallOrLargerListBoard = computed(() => smAndUp.value && isListLayout.value);

const contentTitle = ref<string>(t("components.cardElement.h5pElement"));

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

const onDownload = (event?: Event) => {
	if (event) {
		event.stopPropagation();
	}

	if (!element.value.content.contentId) {
		return;
	}

	const url = `/api/v3/h5p-editor/download/${element.value.content.contentId}`;
	downloadFile(url, `${contentTitle.value}.h5p`);
};

const fetchAndSetContentTitle = async (h5pElement: H5pElementResponse) => {
	const contentId: string | null = h5pElement.content.contentId;
	if (contentId) {
		const title = await getContentTitle(contentId);
		const decodedTitle = title ? decodeHtmlEntities(title) : t("components.cardElement.h5pElement");
		contentTitle.value = decodedTitle;
	}
};

const ariaLabel = computed(() => {
	const title = hasLinkedContent.value
		? `${t("components.cardElement.h5pElement")} ${contentTitle.value}`
		: t("components.cardElement.h5pElement.create");
	return `${title}, ${t("common.ariaLabel.newTab")}`;
});

onMounted(async () => {
	await fetchAndSetContentTitle(element.value);
});

watch(element, async (newValue: H5pElementResponse) => {
	await fetchAndSetContentTitle(newValue);
});
</script>

<style scoped lang="scss">
.download-button {
	padding-right: 10px;
}
</style>
