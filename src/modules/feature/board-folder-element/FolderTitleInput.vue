<template>
	<div class="d-flex flex-row">
		<v-text-field
			v-model="titleRef"
			:rules="[rules.validateOnOpeningTag]"
			:label="t('pages.folder.ariaLabels.menu.action.edit')"
			type="text"
			data-testid="folder-title-text-field-in-card"
			class="text"
			@keydown="onKeydown"
		/>

		<div class="align-self-center pl-2">
			<button data-testid="save-folder-title-in-card" @click="onConfirm">
				<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
				<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { mdiCheck } from "@icons/material";
import { useOpeningTagValidator } from "@util-validators";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

interface FolderTitleInputProps {
	title: string;
}

const props = defineProps<FolderTitleInputProps>();

const emit = defineEmits<{
	(e: "update:title", title: string): void;
}>();

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const rules = reactive({
	validateOnOpeningTag: (value: string) => validateOnOpeningTag(value),
});

const defaultTitle = t("pages.folder.untitled");
const titleRef = ref("");

watch(
	() => props.title,
	(newTitle) => {
		titleRef.value = newTitle || defaultTitle;
	},
	{ immediate: true }
);

const isTitleValid = computed(() => rules.validateOnOpeningTag(titleRef.value) === true);

const onConfirm = async () => {
	if (isTitleValid.value) {
		emit("update:title", titleRef.value);
	}

	titleRef.value = titleRef.value || defaultTitle;
};

const onKeydown = (e: KeyboardEvent) => {
	if (e.key === "enter" || e.key === "Enter") {
		onConfirm();
	}
};
</script>
