<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:message="t('ui.rename.dialog.title', { entity: entityName })"
		:confirm-btn-disabled="!isNameValid"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<v-text-field
				v-model="nameRef"
				data-testid="rename-dialog-input"
				class="mt-8"
				density="compact"
				flat
				:aria-label="$t('common.labels.name.new')"
				:label="t('common.labels.name.new')"
				:rules="[rules.required, rules.validateOnOpeningTag]"
			/>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@/utils/validation";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import Dialog from "./Dialog.vue";

const { name } = defineProps({
	name: { type: String, required: false, default: "" },
	entityName: { type: String, required: false, default: "" },
});

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const emit = defineEmits(["confirm", "cancel"]);

const nameRef = ref<string>("");

watch(
	() => name,
	(newName) => {
		nameRef.value = newName;
	},
	{ immediate: true }
);

const { t } = useI18n();

const { validateOnOpeningTag } = useOpeningTagValidator();

const rules = reactive({
	required: (value: string) => !!value || t("common.validation.required"),
	validateOnOpeningTag: (value: string) => {
		return validateOnOpeningTag(value);
	},
});

const isNameValid = computed(() => {
	return (
		rules.required(nameRef.value) === true &&
		rules.validateOnOpeningTag(nameRef.value) === true
	);
});

const onCancel = () => {
	emit("cancel");
};
const onConfirm = () => {
	if (isNameValid.value) {
		emit("confirm", nameRef.value);
	}
};
</script>
