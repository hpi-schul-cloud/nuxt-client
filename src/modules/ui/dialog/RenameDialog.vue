<template>
	<Dialog
		:is-dialog-open="isDialogOpen"
		:message="t('ui.rename.dialog.title', { entity: entityName })"
		@cancel="onCancel"
		@update:is-dialog-open="onUpdateIsDialogOpen"
		@confirm="onConfirm"
	>
		<template #content>
			<v-text-field
				v-model="modelValue"
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
import { ModelRef } from "vue";
import { useI18n } from "vue-i18n";
import Dialog from "./Dialog.vue";

defineProps({
	isDialogOpen: { type: Boolean, required: true },
	entityName: { type: String, required: false, default: "" },
});
const { t } = useI18n();

const emit = defineEmits(["update:name", "cancel", "update:isDialogOpen"]);

const modelValue: ModelRef<string | undefined> = defineModel({
	type: String,
});

const { validateOnOpeningTag } = useOpeningTagValidator();

const onCancel = () => {
	emit("cancel");
};
const onConfirm = () => {
	emit("update:name", modelValue.value);
};
const onUpdateIsDialogOpen = (value: boolean) => {
	if (!value) {
		emit("cancel");
	}
};
</script>
