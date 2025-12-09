<template>
	<div class="d-flex flex-row">
		<v-text-field
			v-model="titleRef"
			:rules="rules"
			:label="t('pages.folder.ariaLabels.menu.action.edit')"
			type="text"
			data-testid="folder-title-text-field-in-card"
			class="text"
		/>
	</div>
</template>

<script lang="ts" setup>
import { isRequired, useOpeningTagValidator } from "@util-validators";
import { computed, ref, watch } from "vue";
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

const rules = [(value: string) => validateOnOpeningTag(value), isRequired(t("common.validation.required"))];

const titleInput = ref<string | undefined>(undefined);
const titleRef = computed({
	get: () => titleInput.value ?? props.title,
	set: (value) => (titleInput.value = value),
});

watch(titleRef, (newValue) => {
	const isTitleValid = rules.every((rule) => rule(newValue) === true);

	if (isTitleValid) {
		emit("update:title", newValue);
	}
});
</script>
