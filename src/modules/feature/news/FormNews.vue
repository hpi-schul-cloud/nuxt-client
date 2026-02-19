<template>
	<VForm @submit.prevent="save">
		<VTextField
			v-model="newsTitle"
			autofocus
			:placeholder="t('components.organisms.FormNews.input.title.placeholder')"
			name="title"
			data-testid="news_title"
			:label="t('components.organisms.FormNews.input.title.label')"
			:rules="[validateOnOpeningTag, isRequired()]"
		/>
		<VFadeTransition>
			<div v-if="newsTitle">
				<ClassicEditor
					v-model="newsContent"
					class="mb-4 mt-13"
					:placeholder="t('components.organisms.FormNews.editor.placeholder')"
					@update:value="onUpdateContent"
				/>
				<VFadeTransition>
					<div v-if="newsContent">
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
				</VFadeTransition>
				<FormActions>
					<template #primary>
						<VBtn
							color="primary"
							variant="flat"
							type="submit"
							data-testid="btn_news_submit"
							:disabled="status === 'pending'"
							:text="t('common.actions.save')"
						/>
						<VBtn
							v-if="showDeleteButton"
							variant="text"
							color="error"
							:text="t('common.actions.delete')"
							@click="onDelete"
						/>
						<VBtn variant="text" :text="t('common.actions.discard')" @click="onCancel" />
					</template>
				</FormActions>
			</div>
		</VFadeTransition>
	</VForm>
	<ConfirmationDialog>
		<template v-if="showDialogWarning" #alert>
			<WarningAlert> {{ t("components.organisms.FormNews.cancel.confirm.message") }}</WarningAlert>
		</template>
	</ConfirmationDialog>
</template>

<script setup lang="ts">
import FormActions from "./FormActions.vue";
import { createInputDateTime, fromInputDateTime } from "@/plugins/datetime";
import { Status } from "@/store/types/commons";
import { FormNews } from "@/store/types/news";
import { notifyError } from "@data-app";
import { ClassicEditor } from "@feature-editor";
import { mdiClockOutline } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DatePicker } from "@ui-date-time-picker";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { isRequired, useOpeningTagValidator } from "@util-validators";
import dayjs, { Dayjs } from "dayjs";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

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

const errors = computed(() => {
	const title = newsTitle.value ? undefined : t("components.organisms.FormNews.errors.missing_title").toString();

	const titleOpeningTag =
		validateOnOpeningTag(newsTitle.value) === true ? undefined : t("common.validation.containsOpeningTag").toString();

	const content = newsContent.value ? undefined : t("components.organisms.FormNews.errors.missing_content").toString();

	return {
		title: title || titleOpeningTag,
		content,
	};
});

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
	[newsDate, newsTime],
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

const save = () => {
	const errorsArray = Object.values(errors.value).filter(Boolean);
	if (errorsArray.length && errorsArray[0]) {
		notifyError(String(errorsArray[0]));
		return errorsArray[0];
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
