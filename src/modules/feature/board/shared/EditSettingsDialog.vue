<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-edit-settings"
		max-width="480"
		@keydown.esc="onClose"
		@click:outside="onClose"
	>
		<v-card ref="editSettings">
			<template #title>
				<h2 class="text-h4 mt-2 dialog-title">
					{{ modalTitle }}
				</h2>
			</template>
			<template #text>
				<div>
					{{ t("components.board.menu.editing.settings.modal.subtitle") }}
				</div>
				<div>
					<v-radio-group v-model="selectedOption" hide-details class="mt-6">
						<v-radio
							v-for="(option, index) in radioOptions"
							:key="index"
							:value="option.value"
							class="align-start mb-2"
							:data-testid="option.dataTestid"
						>
							<template #label>
								<div class="inline-flex flex-column mt-2">
									<i18n-t :keypath="option.labelHeader">
										<b>{{ t(option.labelInlineFormattedText) }}</b>
									</i18n-t>
									<div>
										<span class="radio-label">
											{{ t(option.labelDescription) }}
										</span>
									</div>
								</div>
							</template>
						</v-radio>
					</v-radio-group>
				</div>
			</template>
			<template #actions>
				<div class="mr-4 mb-3">
					<v-btn
						ref="cancelButton"
						class="ms-auto mr-2"
						:text="t('common.actions.cancel')"
						data-testid="edit-settings-cancel-btn"
						@click="onClose"
					/>
					<v-btn
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
		</v-card>
	</VDialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { VCard } from "vuetify/components";
import { useDisplay } from "vuetify";

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
	(e: "save", value: string): void;
}>();

const { t } = useI18n();
const { xs } = useDisplay();

const selectedOption = ref<
	"editableWithoutReadPermission" | "editableWithReadPermission"
>("editableWithoutReadPermission");

const modalTitle = computed(() =>
	t("components.board.menu.editing.settings.title")
);

const radioOptions = computed(() => [
	{
		value: "editableWithoutReadPermission",
		labelHeader: "components.board.menu.editing.settings.modal.options.first",
		labelInlineFormattedText: "common.words.not",
		labelDescription:
			"components.board.menu.editing.settings.modal.options.defaultSetting",
		dataTestid: "edit-settings-option-1",
	},
	{
		value: "editableWithReadPermission",
		labelHeader: "components.board.menu.editing.settings.modal.options.second",
		labelInlineFormattedText: "common.words.also",
		labelDescription: "",
		dataTestid: "edit-settings-option-2",
	},
]);

const onClose = () => {
	emit("close");
};

const onSave = () => {
	emit("save", selectedOption.value);
	emit("close");
};

const editSettings = ref<VCard>();
useFocusTrap(editSettings, {
	immediate: true,
});
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
