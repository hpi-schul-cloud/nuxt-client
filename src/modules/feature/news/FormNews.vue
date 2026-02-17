<template>
	<form v-bind="$attrs" @submit.prevent="save">
		<VTextField
			v-model="newsTitle"
			autofocus
			:placeholder="t('components.organisms.FormNews.input.title.placeholder')"
			name="title"
			:required="true"
			data-testid="news_title"
			:label="t('components.organisms.FormNews.input.title.label')"
			:rules="[validateOnOpeningTag]"
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
							v-if="news && news.id"
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
	</form>
	<ConfirmationDialog>
		<template v-if="showDialogWarning" #alert>
			<WarningAlert> {{ t("components.organisms.FormNews.cancel.confirm.message") }}</WarningAlert>
		</template>
	</ConfirmationDialog>
</template>

<script setup lang="ts">
import FormActions from "./FormActions.vue";
import { createInputDateTime, fromInputDateTime } from "@/plugins/datetime";
import { UpdateNewsParams } from "@/serverApi/v3";
import { newsModule } from "@/store";
import { News } from "@/store/types/news";
import { notifyError } from "@data-app";
import { ClassicEditor } from "@feature-editor";
import { mdiClockOutline } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DatePicker } from "@ui-date-time-picker";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { useOpeningTagValidator } from "@util-validators";
import dayjs, { Dayjs } from "dayjs";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ inheritAttrs: false });

type Props = {
	news?: News;
};

const props = withDefaults(defineProps<Props>(), {
	news: () => ({
		title: "",
		content: "",
		date: {
			date: undefined,
			time: undefined,
		},
	}),
});

const emit = defineEmits<{
	(e: "save", news: UpdateNewsParams): void;
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

const status = computed(() => newsModule.getStatus);

const displayAt = computed<string | undefined>(() => {
	if (!newsDate.value || !newsTime.value) {
		return undefined;
	}
	const dateTimeCombined = fromInputDateTime(newsDate.value, newsTime.value);
	const dateTimeCombinedString = dateTimeCombined as unknown as Dayjs;
	return dateTimeCombinedString.toISOString();
});

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
	() => props.news,
	(newNews) => {
		updateFromParent(newNews);
	}
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

onMounted(() => {
	updateFromParent(props.news);
});

const save = () => {
	const errorsArray = Object.values(errors.value).filter((a) => a);
	if (errorsArray.length && errorsArray[0]) {
		notifyError(String(errorsArray[0]));
		return errorsArray[0];
	}
	emit("save", { title: newsTitle.value, content: newsContent.value, displayAt: displayAt.value });
};

const updateFromParent = ({ title, content, displayAt }: News) => {
	newsTitle.value = title;
	newsContent.value = content;
	if (displayAt) {
		[newsDate.value, newsTime.value] = createInputDateTime(displayAt);
	}
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
