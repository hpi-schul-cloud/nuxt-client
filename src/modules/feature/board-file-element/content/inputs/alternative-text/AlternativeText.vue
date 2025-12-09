<template>
	<VTextField
		v-model="altTextRef"
		data-testid="file-alttext-input"
		:persistent-hint="true"
		:hint="t('components.cardElement.fileElement.altDescription')"
		:label="t('components.cardElement.fileElement.alternativeText')"
		:rules="rules"
		@click.stop
		@keydown.enter.stop
	/>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@util-validators";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	alternativeText?: string;
};

const props = withDefaults(defineProps<Props>(), {
	alternativeText: undefined,
});

const emit = defineEmits<{
	(e: "update:alternativeText", alternativeText: string): void;
}>();

const { t } = useI18n();

const { validateOnOpeningTag } = useOpeningTagValidator();

const altTextInput = ref<string | undefined>(undefined);
const altTextRef = computed({
	get: () => {
		if (altTextInput.value !== undefined) {
			return altTextInput.value;
		}
		return props.alternativeText ?? "";
	},
	set: (value) => (altTextInput.value = value),
});

const rules = [(value: string) => validateOnOpeningTag(value)];

watch(altTextRef, (newValue) => {
	const isValid = rules.every((rule) => rule(newValue) === true);

	if (isValid) {
		emit("update:alternativeText", newValue);
	}
});
</script>
