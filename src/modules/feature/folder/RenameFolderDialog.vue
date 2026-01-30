<template>
	<SvsDialog
		v-model="isDialogOpen"
		title="pages.folder.ariaLabels.menu.action.edit"
		:confirm-btn-disabled="!isNameValid"
		data-testid="rename-folder-dialog"
		@confirm="onConfirm"
		@cancel="onCancel"
	>
		<template #content>
			<VTextField
				v-model="nameRef"
				data-testid="rename-dialog-input"
				density="compact"
				flat
				:aria-label="$t('common.labels.name.new')"
				:label="t('common.labels.name.new')"
				:rules="[rules.validateOnOpeningTag]"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";
import { useOpeningTagValidator } from "@util-validators";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { name } = defineProps({
	name: { type: String, required: false, default: "" },
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
	validateOnOpeningTag: (value: string) => validateOnOpeningTag(value),
});

const isNameValid = computed(() => rules.validateOnOpeningTag(nameRef.value) === true);

const onCancel = () => {
	emit("cancel");
};

const onConfirm = () => {
	if (isNameValid.value) {
		emit("confirm", nameRef.value);
	}
};
</script>
