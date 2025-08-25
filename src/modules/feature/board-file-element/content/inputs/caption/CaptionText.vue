<template>
	<div class="d-flex flex-row">
		<v-textarea
			v-model="modelValue"
			data-testid="file-caption-input"
			rows="1"
			auto-grow
			:label="$t('components.cardElement.fileElement.caption')"
			:rules="[rules.validateOnOpeningTag]"
			@click.stop
		/>
		<div class="align-self-center pl-2">
			<button
				data-testid="save-folder-title-in-card"
				@click.prevent.stop="onConfirm"
			>
				<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
				<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@/utils/validation";
import { mdiCheck } from "@icons/material";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	caption?: string;
	isEditMode: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	caption: undefined,
});

const emit = defineEmits<{
	(e: "update:caption", caption: string): void;
}>();

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const modelValue = ref("");

onMounted(() => {
	if (props.caption !== undefined) {
		modelValue.value = props.caption;
	}
});

const rules = reactive({
	validateOnOpeningTag: (value: string) => {
		return validateOnOpeningTag(value);
	},
});

const onConfirm = () => {
	const isNameValid = rules.validateOnOpeningTag(modelValue.value) === true;

	if (isNameValid) {
		emit("update:caption", modelValue.value);
	}
};
</script>
