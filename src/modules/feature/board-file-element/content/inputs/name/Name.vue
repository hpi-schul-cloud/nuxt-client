<template>
	<v-textarea
		v-model="nameRef"
		data-testid="file-name-input"
		rows="1"
		auto-grow
		:label="$t('components.cardElement.fileElement.caption')"
		:hide-details="true"
		:rules="[rules.required, rules.validateOnOpeningTag]"
		@click.stop
	/>
</template>

<script setup lang="ts">
import { getFileExtension, removeFileExtension } from "@/utils/fileHelper";
import { useOpeningTagValidator } from "@/utils/validation";
import { onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	name?: string;
	isEditMode: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
});

const { validateOnOpeningTag } = useOpeningTagValidator();

const emit = defineEmits<{
	(e: "update:name", name: string): void;
}>();

const modelValue = ref("");

const { t } = useI18n();

const nameRef = ref<string>("");

watch(
	() => props.name,
	(newName) => {
		if (newName !== "") {
			nameRef.value = removeFileExtension(newName);
		}
	},
	{ immediate: true }
);

onMounted(() => {
	if (props.name !== undefined) {
		modelValue.value = props.name;
	}
});

watch(nameRef, (newValue) => {
	const fileExtension = getFileExtension(props.name);
	const nameWithExtension = `${newValue}.${fileExtension}`;

	const isNameValid =
		rules.validateOnOpeningTag(nameWithExtension) &&
		rules.required(nameRef.value);

	if (newValue !== props.name && isNameValid) {
		emit("update:name", nameWithExtension);
	}
});

const rules = reactive({
	validateOnOpeningTag: (value: string) => {
		return validateOnOpeningTag(value);
	},
	required: (value: string) => !!value || t("common.validation.required"),
});
</script>
