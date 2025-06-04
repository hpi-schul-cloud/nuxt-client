<template>
	<div class="d-flex flex-row">
		<v-text-field
			v-model="titleRef"
			:rules="[rules.validateOnOpeningTag]"
			:label="t('pages.folder.ariaLabels.menu.action.edit')"
			type="text"
			data-testid="folder-title-text-field-in-card"
			:autofocus="true"
			class="text"
			@keydown="onKeydown"
		/>

		<div class="align-self-center pl-2">
			<button data-testid="save-folder-title-in-card" @click="onConfirm">
				<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
				<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
			</button>
		</div>

		<div class="align-self-center menu">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useOpeningTagValidator } from "@/utils/validation";
import { mdiCheck } from "@icons/material";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { title } = defineProps({
	title: { type: String, required: true },
});

const emit = defineEmits<{
	(e: "update:title", title: string): void;
}>();

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const rules = reactive({
	validateOnOpeningTag: (value: string) => {
		return validateOnOpeningTag(value);
	},
});

const defaultTitle = t("pages.folder.untitled");
const titleRef = ref("");

watch(
	() => title,
	(newTitle) => {
		titleRef.value = newTitle || defaultTitle;
	},
	{ immediate: true }
);

const isTitleValid = computed(() => {
	return rules.validateOnOpeningTag(titleRef.value) === true;
});

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
