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
					<VDivider class="border-opacity-100 mb-2" role="presentation" />
					{{ message }}
				</template>
			</VMessages>
		</div>

		<p class="mt-13">
			{{ t("components.organisms.FormNews.label.planned_publish") }}
		</p>

		<DatePicker
			:date="newsDate"
			:label="t('common.labels.date')"
			data-testid="news_date"
			@update:date="newsDate = $event"
		/>
		<TimePicker
			:time="newsTime"
			:label="t('common.labels.time')"
			data-testid="news_time"
			@update:time="newsTime = $event"
		/>

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
</template>

<script setup lang="ts">
import { askCancel, askConfirmation } from "@/utils/confirm-dialog.utils";
import { Status } from "@/store/types/commons";
import { FormNews } from "@/store/types/news";
import { formatUtc, toCombinedDateTimeIso, toIsoDate } from "@/utils/date-time.utils";
import { isValidOrFocusFirstInvalidInput } from "@/utils/validation";
import { ClassicEditor } from "@feature-editor";
import { DatePicker, TimePicker } from "@ui-date-time-picker";
import { isRequired, useOpeningTagValidator } from "@util-validators";
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
const { t } = useI18n();

const newsTitle = ref("");
const newsContent = ref("");
const newsDate = ref<string | undefined>("");
const newsTime = ref<string | undefined>("");
const newsForm = useTemplateRef("newsForm");
const classicEditor = useTemplateRef("classicEditor");
const shouldNewsContentValidation = ref(false);

watch(
	() => [props.title, props.content, props.displayAt],
	([newTitle, newContent, newDisplayAt]) => {
		newsTitle.value = newTitle ?? "";
		newsContent.value = newContent ?? "";
		if (newDisplayAt) {
			newsDate.value = toIsoDate(formatUtc(newDisplayAt, "date"));
			newsTime.value = formatUtc(newDisplayAt, "time");
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

const onSave = async () => {
	shouldNewsContentValidation.value = true;
	const isValid = await isValidOrFocusFirstInvalidInput(newsForm);
	if (!isValid) return;
	if (!newsContent.value && isValid) {
		classicEditor.value?.focus();
		return;
	}
	emit("save", {
		title: newsTitle.value,
		content: newsContent.value,
		displayAt: toCombinedDateTimeIso(newsDate.value, newsTime.value),
	});
};

const onDelete = async () => {
	const isConfirmed = await askConfirmation({
		title: "components.organisms.FormNews.remove.confirm.message",
		confirmBtnKey: "components.organisms.FormNews.remove.confirm.confirm",
	});
	if (isConfirmed) emit("delete");
};

const onCancel = async () => (await askCancel()) && emit("cancel");
</script>
<style lang="scss" scoped>
.news-content-error {
	letter-spacing: 0.4px;
}
</style>
