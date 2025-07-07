<template>
	<v-card
		ref="linkContentElement"
		class="mb-4"
		:target="target"
		data-testid="board-link-element"
		:class="{ 'd-none': isHidden }"
		:variant="outlined"
		:ripple="false"
		:aria-label="ariaLabel"
		:href="sanitizedUrl"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
		@click="onClick"
	>
		<LinkContentElementDisplay
			v-if="computedElement.content.url"
			:url="computedElement.content.url"
			:title="computedElement.content.title"
			:image-url="computedElement.content.imageUrl"
			:is-edit-mode="isEditMode"
			><BoardMenu
				:scope="BoardMenuScope.LINK_ELEMENT"
				has-background
				:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					scope-language-key="components.cardElement.LinkElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</LinkContentElementDisplay>
		<LinkContentElementCreate v-if="isCreating" @create:url="onCreateUrl"
			><BoardMenu :scope="BoardMenuScope.LINK_ELEMENT" has-background>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					scope-language-key="components.cardElement.LinkElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</LinkContentElementCreate>
	</v-card>
</template>

<script setup lang="ts">
import { LinkElementResponse } from "@/serverApi/v3";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { useElementFocus } from "@util-board";
import { computed, ComputedRef, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useMetaTagExtractorApi } from "../composables/MetaTagExtractorApi.composable";
import { usePreviewGenerator } from "../composables/PreviewGenerator.composable";
import { ensureProtocolIncluded } from "../util/url.util";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";

const props = defineProps({
	element: {
		type: Object as PropType<LinkElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isDetailView: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, requried: false },
	isNotLastElement: { type: Boolean, requried: false },
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

const { t } = useI18n();
const linkContentElement = ref(null);
const isLoading = ref(false);
const element = toRef(props, "element");

const outlined = computed(() => {
	return props.isEditMode === true || computedElement.value.content.url !== ""
		? "outlined"
		: "text";
});

useBoardFocusHandler(element.value.id, linkContentElement);

const { modelValue, computedElement } = useContentElementState(props, {
	autoSaveDebounce: 100,
});

const sanitizedUrl = computed(() =>
	props.element.content.url ? sanitizeUrl(props.element.content.url) : ""
);

const target: ComputedRef<string> = computed(() => {
	if (props.element.content.url) {
		const url = new URL(sanitizedUrl.value);

		if (
			url.host === window.location.host &&
			url.pathname === window.location.pathname
		) {
			return "_self";
		}
	}

	return "_blank";
});

const isCreating = computed(
	() => props.isEditMode && !computedElement.value.content.url
);

const isHidden = computed(
	() => props.isEditMode === false && !computedElement.value.content.url
);

const { getMetaTags } = useMetaTagExtractorApi();

const { createPreviewImage } = usePreviewGenerator(element.value.id);

const onCreateUrl = async (originalUrl: string) => {
	isLoading.value = true;

	try {
		const validUrl = ensureProtocolIncluded(originalUrl);
		const { url, title, description, originalImageUrl } =
			await getMetaTags(validUrl);

		modelValue.value.url = url;
		modelValue.value.title = title;
		modelValue.value.description = description;

		if (originalImageUrl) {
			modelValue.value.imageUrl = await createPreviewImage(originalImageUrl);
		}
	} finally {
		isLoading.value = false;
	}
};

const ariaLabel = computed(() => {
	const contentUrl = computedElement.value.content.url;

	return contentUrl
		? `${contentUrl}, ${t("common.ariaLabel.newTab")}`
		: undefined;
});

const onKeydownArrow = (event: KeyboardEvent) => {
	if (isCreating.value === false && props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onMoveDown = () => emit("move-down:edit");

const onMoveUp = () => emit("move-up:edit");

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", element.value.id);
	}
};

const { focusNodeFromHash } = useElementFocus();
const onClick = () => {
	if (sanitizedUrl.value === window.location.href) {
		focusNodeFromHash();
	}
};
</script>
