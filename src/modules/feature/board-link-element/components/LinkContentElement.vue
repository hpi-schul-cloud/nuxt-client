<template>
	<EmptyElement
		v-if="!isEditMode && !computedElement.content.url && canManageLinkElements"
		:icon="mdiLink"
		:title="t('components.cardElement.LinkElement.noLink')"
	/>
	<VCard
		v-else-if="isEditMode || computedElement.content.url"
		ref="linkContentElement"
		class="mb-4"
		data-testid="board-link-element"
		:variant="cardVariant"
		:ripple="false"
		:aria-label="ariaLabel"
		v-bind="isEditMode ? {} : { href: sanitizedUrl, target: target, rel: 'noopener noreferrer' }"
		@keydown.enter.space="onClick"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
		@click="onClick"
	>
		<LinkContentElementDisplay
			v-if="!isEditMode && computedElement.content.url"
			:url="computedElement.content.url"
			:title="computedElement.content.title"
			:image-url="modelValue.imageUrl"
			:is-edit-mode="isEditMode"
		>
			<BoardMenu
				:scope="BoardMenuScope.LINK_ELEMENT"
				has-background
				:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete @click="onDelete" />
			</BoardMenu>
		</LinkContentElementDisplay>
		<LinkContentElementCreate v-if="isEditMode" :existing-url="sanitizedUrl" @create:url="onCreateUrl">
			<BoardMenu :scope="BoardMenuScope.LINK_ELEMENT" has-background>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete @click="onDelete" />
			</BoardMenu>
		</LinkContentElementCreate>
	</VCard>
</template>

<script setup lang="ts">
import { useMetaTagExtractorApi } from "../composables/MetaTagExtractorApi.composable";
import { ensureProtocolIncluded } from "../util/url.util";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { convertDownloadToPreviewUrl, isPreviewPossible } from "@/utils/fileHelper";
import { FileRecordParentType } from "@api-file-storage";
import { LinkElementResponse } from "@api-server";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useBoardAllowedOperations, useBoardFocusHandler, useContentElementState } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { mdiLink } from "@icons/material";
import { BoardMenu, BoardMenuScope, EmptyElement } from "@ui-board";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { useElementFocus } from "@util-board";
import { computed, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	element: LinkElementResponse;
	isEditMode: boolean;
	isDetailView: boolean;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
}>();

const emit = defineEmits<{
	(e: "delete:element", id: string): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
}>();

const { t } = useI18n();
const { allowedOperations } = useBoardAllowedOperations();
const linkContentElement = ref(null);
const isLoading = ref(false);
const element = toRef(props, "element");

const cardVariant = computed(() =>
	props.isEditMode === true || computedElement.value.content.url !== "" ? "outlined" : "text"
);

const canManageLinkElements = computed(() => allowedOperations.value.updateElement);

useBoardFocusHandler(element.value.id, linkContentElement);

const { modelValue, computedElement } = useContentElementState(props, {
	autoSaveDebounce: 100,
});

const sanitizedUrl = computed(() =>
	computedElement.value.content.url ? sanitizeUrl(computedElement.value.content.url) : ""
);

const target = computed<string>(() => {
	if (computedElement.value.content.url) {
		const url = new URL(sanitizedUrl.value);

		if (url.host === window.location.host && url.pathname === window.location.pathname) {
			return "_self";
		}
	}

	return "_blank";
});

const { getMetaTags } = useMetaTagExtractorApi();
const { uploadFromUrl } = useFileStorageApi();

const createPreviewImage = async (externalImageUrl: string): Promise<string | undefined> => {
	const uploadedFileRecord = await uploadFromUrl(externalImageUrl, element.value.id, FileRecordParentType.BOARDNODES);

	if (uploadedFileRecord?.previewStatus && isPreviewPossible(uploadedFileRecord.previewStatus)) {
		return convertDownloadToPreviewUrl(uploadedFileRecord.url);
	}
};

const onCreateUrl = async (originalUrl: string) => {
	isLoading.value = true;

	try {
		const validUrl = ensureProtocolIncluded(originalUrl);
		const { url, title, description, originalImageUrl } = await getMetaTags(validUrl);

		const updates = {
			url,
			title,
			description,
			imageUrl: "",
		};

		if (originalImageUrl) {
			const previewResult = await createPreviewImage(originalImageUrl);
			if (previewResult) updates.imageUrl = previewResult;
		}

		Object.assign(modelValue.value, updates);
	} finally {
		isLoading.value = false;
	}
};

const ariaLabel = computed(() => {
	const contentUrl = computedElement.value.content.url;

	return contentUrl ? `${contentUrl}, ${t("common.ariaLabel.newTab")}` : undefined;
});

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode && computedElement.value.content.url) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onMoveDown = () => emit("move-down:edit");

const onMoveUp = () => emit("move-up:edit");

const onDelete = async () => {
	const shouldDelete = await askDeletionForType("components.cardElement.LinkElement");
	if (shouldDelete) {
		emit("delete:element", element.value.id);
	}
};

const { focusNodeFromHash } = useElementFocus();
const isInternalHashLink = computed(() => {
	if (!sanitizedUrl.value) return false;
	try {
		const url = new URL(sanitizedUrl.value);
		return url.host === window.location.host && url.pathname === window.location.pathname && !!url.hash;
	} catch {
		return false;
	}
});

const onClick = (event: MouseEvent | KeyboardEvent) => {
	if (isInternalHashLink.value) {
		event.preventDefault();
		const url = new URL(sanitizedUrl.value);
		window.history.replaceState(null, "", url.hash);
		focusNodeFromHash();
	}
};
</script>
