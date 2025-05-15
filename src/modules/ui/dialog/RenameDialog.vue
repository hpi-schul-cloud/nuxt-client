<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:message="t('ui.rename.dialog.title', { entity: entityName })"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<v-text-field
				v-model="nameRef"
				class="mt-8"
				density="compact"
				flat
				:aria-label="$t('common.labels.name.new')"
				:placeholder="$t('common.labels.name.new')"
				:label="t('common.labels.name.new')"
				:rules="[validateOnOpeningTag]"
			/>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@/utils/validation";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import Dialog from "./Dialog.vue";

// Destructure props to avoid directly referencing `props`
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

const onCancel = () => {
	emit("cancel");
};
const onConfirm = () => {
	emit("confirm", nameRef.value);
};
</script>
