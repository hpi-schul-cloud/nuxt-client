<template>
	<div class="d-flex flex-row">
		<v-textarea
			v-model="nameRef"
			data-testid="file-name-input"
			rows="1"
			auto-grow
			:label="$t('common.labels.fileName')"
			:rules="[rules.required, rules.validateOnOpeningTag]"
			@click.stop
		/>
		<div class="align-self-center pl-2">
			<button data-testid="save-file-name" @click.prevent.stop="onConfirm">
				<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
				<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getFileExtension, removeFileExtension } from "@/utils/fileHelper";
import { useOpeningTagValidator } from "@/utils/validation";
import { mdiCheck } from "@icons/material";
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

const rules = reactive({
	validateOnOpeningTag: (value: string) => {
		const fileExtension = getFileExtension(props.name);
		const nameWithExtension = `${value}.${fileExtension}`;

		return validateOnOpeningTag(nameWithExtension);
	},
	required: (value: string) => !!value || t("common.validation.required"),
});

const addFileExtension = (name: string) => {
	const fileExtension = getFileExtension(props.name);
	const nameWithExtension = `${name}.${fileExtension}`;

	return nameWithExtension;
};

const onConfirm = () => {
	const nameWithExtension = addFileExtension(nameRef.value);

	const isNameValid =
		rules.validateOnOpeningTag(nameWithExtension) === true &&
		rules.required(nameRef.value) === true;

	if (isNameValid) {
		emit("update:name", nameWithExtension);
	}
};
</script>
