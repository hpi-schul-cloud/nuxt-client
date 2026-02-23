<template>
	<VForm ref="newsForm" @submit.prevent.stop="onSave">
		<VTextField
			v-model="newsTitle"
			autofocus
			:placeholder="t('components.organisms.FormNews.input.title.placeholder')"
			data-testid="news_title"
			:label="t('components.organisms.FormNews.input.title.label')"
			:rules="[validateOnOpeningTag, isRequired(t('components.organisms.FormNews.errors.missing_title'))]"
		/>

		<div class="mt-5">
			<ClassicEditor
				ref="classicEditor"
				v-model="newsContent"
				class="mb-4 mt-13"
				:placeholder="t('components.organisms.FormNews.editor.placeholder')"
				:aria-described-by-id="'news-content-error'"
				@update:value="onUpdateContent"
				@blur="shouldNewsContentValidation = true"
			/>
			<VMessages
				id="news-content-error"
				:active="!newsContent && shouldNewsContentValidation"
				color="error"
				:messages="t('components.organisms.FormNews.errors.missing_content')"
				class="mt-1 opacity-100 news-content-error"
			>
				<template #message="{ message }">
					<VDivider class="border-opacity-100 mb-2" />
					{{ message }}
				</template>
			</VMessages>
		</div>

		<div>
			<p class="mt-13">
				{{ t("components.organisms.FormNews.label.planned_publish") }}
			</p>
			<DatePicker
				:date="newsDate"
				:label="t('common.labels.date')"
				data-testid="news_date"
				@update:date="onUpdateDate"
			/>
			<VTextField
				v-model="newsTime"
				v-time-input-mask
				:prepend-inner-icon="mdiClockOutline"
				:label="t('common.labels.time')"
				data-testid="news_time"
			/>
		</div>

		<div class="d-flex ga-3 mt-2">
			<VSpacer />
			<VBtn variant="text" :text="t('common.actions.discard')" @click="onCancel" />
			<VBtn v-if="showDeleteButton" variant="text" color="error" :text="t('common.actions.delete')" @click="onDelete" />
			<VBtn
				color="primary"
				variant="flat"
				type="submit"
				data-testid="btn_news_submit"
				:disabled="status === 'pending'"
				:text="t('common.actions.save')"
			/>
		</div>
	</VForm>
	<ConfirmationDialog>
		<template v-if="showDialogWarning" #alert>
			<WarningAlert> {{ t("components.organisms.FormNews.cancel.confirm.message") }}</WarningAlert>
		</template>
	</ConfirmationDialog>
</template>

<script setup lang="ts">
import { createInputDateTime, fromInputDateTime } from "@/plugins/datetime";
import { Status } from "@/store/types/commons";
import { FormNews } from "@/store/types/news";
import { isValidOrFocusFirstInvalidInput } from "@/utils/validation";
import { ClassicEditor } from "@feature-editor";
import { mdiClockOutline } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DatePicker } from "@ui-date-time-picker";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { isRequired, useOpeningTagValidator } from "@util-validators";
import dayjs, { Dayjs } from "dayjs";
import { ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { VMessages } from "vuetify/components";

type Props = {
	title?: string;
	content?: string;
	displayAt?: string;
	showDeleteButton?: boolean;
	status: Status;
};

const props = withDefaults(defineProps<Props>(), {
	title: "",
	content: "",
	displayAt: undefined,
	showDeleteButton: false,
});

const emit = defineEmits<{
	(e: "save", formNews: FormNews): void;
	(e: "delete"): void;
	(e: "cancel"): void;
}>();

const { validateOnOpeningTag } = useOpeningTagValidator();
const { askConfirmation } = useConfirmationDialog();
const { t } = useI18n();

const showDialogWarning = ref(false);
const newsTitle = ref("");
const newsContent = ref("");
const newsDate = ref("");
const newsTime = ref("");
const newsForm = useTemplateRef("newsForm");
const classicEditor = useTemplateRef("classicEditor");
const shouldNewsContentValidation = ref(false);

watch(
	props,
	(newProps) => {
		newsTitle.value = newProps.title ?? "";
		newsContent.value = newProps.content ?? "";
		if (newProps.displayAt) {
			[newsDate.value, newsTime.value] = createInputDateTime(newProps.displayAt);
		} else {
			newsDate.value = "";
			newsTime.value = "";
		}
	},
	{ immediate: true }
);

watch(
	newsDate,
	() => {
		/**
		 * current news object,
		 * updated on every change.
		 * also defined as the v-model event
		 *
		 * @type {object}
		 */
		if (newsDate.value && !newsTime.value) {
			newsTime.value = "00:00";
		}
	},
	{ deep: true }
);

const getDisplayAt = () => {
	if (!newsDate.value || !newsTime.value) {
		return undefined;
	}
	const dateTimeCombined = fromInputDateTime(newsDate.value, newsTime.value);
	const dateTimeCombinedString = dateTimeCombined as unknown as Dayjs;
	return dateTimeCombinedString.toISOString();
};

const onSave = async () => {
	shouldNewsContentValidation.value = true;
	const isValid = await isValidOrFocusFirstInvalidInput(newsForm);
	if (!isValid) return;
	if (!newsContent.value && isValid) {
		classicEditor.value?.focus();
		return;
	}
	emit("save", { title: newsTitle.value, content: newsContent.value, displayAt: getDisplayAt() });
};

const onUpdateDate = (newDate: string | null) => {
	newsDate.value = newDate ? dayjs(newDate).format("YYYY-MM-DD") : "";
};

const onUpdateContent = (newContent: string) => {
	newsContent.value = newContent;
};

const onDelete = async () => {
	showDialogWarning.value = false;

	const shouldCancel = await askConfirmation({
		message: t("components.organisms.FormNews.remove.confirm.message"),
		confirmActionLangKey: "components.organisms.FormNews.remove.confirm.confirm",
	});

	if (shouldCancel) emit("delete");
};

const onCancel = async () => {
	showDialogWarning.value = true;

	const shouldCancel = await askConfirmation({
		message: t("components.organisms.FormNews.cancel.confirm.title"),
		confirmActionLangKey: "components.organisms.FormNews.cancel.confirm.confirm",
	});

	if (shouldCancel) emit("cancel");
};
</script>
<style lang="scss" scoped>
.news-content-error {
	letter-spacing: 0.4px;
}
</style>
