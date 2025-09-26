<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-edit-settings"
		max-width="480"
		@keydown.esc="onClose"
		@click:outside="onClose"
	>
		<VCard ref="editSettings">
			<template #title>
				<h2 class="mt-2 dialog-title">
					{{ modalTitle }}
				</h2>
			</template>
			<template #text>
				<WarningAlert v-if="isDraftMode">
					<span class="alert-text">
						<p>
							{{ t("components.board.dialog.readerCanEdit.alert.text") }}
						</p>
					</span>
				</WarningAlert>
				<template v-else>
					<div data-testid="edit-settings-subtitle">
						{{ t("components.board.dialog.readerCanEdit.subtitle") }}
					</div>
					<div>
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
										<div>
											<span class="radio-label">
												{{ t(option.labelDescription) }}
											</span>
										</div>
									</div>
								</template>
							</VRadio>
						</VRadioGroup>
					</div>
				</template>
			</template>
			<template #actions>
				<div class="mr-4 mb-3">
					<VBtn
						ref="cancelButton"
						class="ms-auto mr-2"
						:text="
							isDraftMode
								? t('common.labels.close')
								: t('common.actions.cancel')
						"
						:variant="isDraftMode ? 'outlined' : 'flat'"
						data-testid="edit-settings-cancel-btn"
						@click="onClose"
					/>
					<VBtn
						v-if="!isDraftMode"
						ref="saveButton"
						class="ms-auto"
						color="primary"
						variant="flat"
						:text="t('common.actions.save')"
						data-testid="edit-settings-save-btn"
						@click="onSave"
					/>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { VCard } from "vuetify/components";
import { useDisplay } from "vuetify";
import { WarningAlert } from "@ui-alert";

type Props = {
	isDraftMode: boolean;
	isEditableSelected: boolean;
};

const props = defineProps<Props>();

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
	(e: "save", value: boolean): void;
}>();

const { t } = useI18n();
const { xs } = useDisplay();

type EditOption = "notEditable" | "editable";
const selectedOption = ref<EditOption>("notEditable");

const modalTitle = computed(() =>
	t("components.board.menu.editing.settings.title")
);

const radioOptions = computed(() => [
	{
		value: "notEditable",
		labelHeader: "components.board.dialog.readerCanEdit.options",
		labelInlineFormattedText: "common.words.not",
		labelDescription:
			"components.board.dialog.readerCanEdit.options.defaultSetting",
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

const editSettings = ref<VCard>();
const { deactivate } = useFocusTrap(editSettings, {
	immediate: true,
});

watch(
	() => isOpen.value,
	(isOpen: boolean) => {
		if (!isOpen) {
			deactivate();
		}
	}
);

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
