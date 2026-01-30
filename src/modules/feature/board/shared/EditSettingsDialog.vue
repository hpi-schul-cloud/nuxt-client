<template>
	<SvsDialog
		v-model="isOpen"
		data-testid="dialog-edit-settings"
		title="components.board.menu.editing.settings.title"
		:cancel-btn-lang-key="isDraftMode ? 'common.labels.close' : 'common.actions.cancel'"
		confirm-btn-lang-key="common.actions.save"
		:no-confirm="isDraftMode"
		@cancel="onClose"
		@confirm="onSave"
	>
		<template #content>
			<WarningAlert v-if="isDraftMode">
				{{ t("components.board.dialog.readerCanEdit.alert.text") }}
			</WarningAlert>
			<template v-else>
				<p data-testid="edit-settings-subtitle">
					{{ t("components.board.dialog.readerCanEdit.subtitle") }}
				</p>
				<VRadioGroup v-model="selectedOption" hide-details class="mt-6">
					<VRadio
						v-for="(option, index) in radioOptions"
						:key="index"
						:value="option.value"
						class="align-start mb-2"
						:data-testid="option.dataTestid"
					>
						<template #label>
							<div class="inline-flex flex-column mt-2">
								<i18n-t :keypath="option.labelHeader" scope="global">
									<b>{{ t(option.labelInlineFormattedText) }}</b>
								</i18n-t>
								<div class="radio-label">
									{{ t(option.labelDescription) }}
								</div>
							</div>
						</template>
					</VRadio>
				</VRadioGroup>
			</template>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	isDraftMode: boolean;
	isEditableSelected: boolean;
}>();

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
	(e: "save", value: boolean): void;
}>();

const { t } = useI18n();

type EditOption = "notEditable" | "editable";
const selectedOption = ref<EditOption>("notEditable");

const radioOptions = computed(() => [
	{
		value: "notEditable",
		labelHeader: "components.board.dialog.readerCanEdit.options",
		labelInlineFormattedText: "common.words.not",
		labelDescription: "components.board.dialog.readerCanEdit.options.defaultSetting",
		dataTestid: "edit-settings-option-1",
	},
	{
		value: "editable",
		labelHeader: "components.board.dialog.readerCanEdit.options",
		labelInlineFormattedText: "common.words.also",
		labelDescription: "",
		dataTestid: "edit-settings-option-2",
	},
]);

const onClose = () => {
	emit("close");
};

const onSave = () => {
	const payload = selectedOption.value === "editable";
	if (payload !== props.isEditableSelected) {
		emit("save", payload);
	}

	emit("close");
};

watch(
	() => props.isEditableSelected,
	(isEditableSelected: boolean) => {
		if (isEditableSelected) {
			selectedOption.value = "editable";
		} else {
			selectedOption.value = "notEditable";
		}
	},
	{ immediate: true }
);
</script>

<style lang="scss" scoped>
.dialog-title {
	max-width: 460px;
	white-space: normal;
}
.radio-label {
	font-size: 14px;
	line-height: var(--line-height-lg);
	opacity: var(--v-medium-emphasis-opacity);
}
.alert-text {
	line-height: var(--line-height-lg);
	letter-spacing: normal;
}
</style>
