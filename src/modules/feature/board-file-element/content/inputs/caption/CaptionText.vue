<template>
	<VTextarea
		v-model="captionRef"
		data-testid="file-caption-input"
		rows="1"
		auto-grow
		:label="t('components.cardElement.fileElement.caption')"
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
	caption?: string;
};

const props = withDefaults(defineProps<Props>(), {
	caption: undefined,
});

const emit = defineEmits<{
	(e: "update:caption", caption: string): void;
}>();

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const captionInput = ref<string | undefined>(undefined);
const captionRef = computed({
	get: () => {
		if (captionInput.value !== undefined) {
			return captionInput.value;
		}
		return props.caption ?? "";
	},
	set: (value) => (captionInput.value = value),
});

const rules = [(value: string) => validateOnOpeningTag(value)];

watch(captionRef, (newValue) => {
	const isValid = rules.every((rule) => rule(newValue) === true);

	if (isValid) {
		emit("update:caption", newValue);
	}
});
</script>
