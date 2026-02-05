<template>
	<form v-bind="$attrs" @submit.prevent="save">
		<VTextField
			v-model="data.title"
			:focus="true"
			:placeholder="t('components.organisms.FormNews.input.title.placeholder')"
			name="title"
			:required="true"
			data-testid="news_title"
			:label="t('components.organisms.FormNews.input.title.label')"
			:rules="[validateOnOpeningTag]"
		/>
		<VFadeTransition>
			<div v-if="data.title">
				<ClassicEditor
					v-model="data.content"
					class="mb-4 mt-13"
					:placeholder="t('components.organisms.FormNews.editor.placeholder')"
					@update:value="onUpdateValue"
				/>
				<VFadeTransition>
					<div v-if="data.content">
						<p class="mt-13">
							{{ t("components.organisms.FormNews.label.planned_publish") }}
						</p>
						<DatePicker
							:date="data.date.date"
							:label="t('common.labels.date')"
							:class="{ hideCurrentDate: !data.date.date }"
							data-testid="news_date"
							@update:date="onUpdateDate"
						/>
						<TimePicker
							:time="data.date.time"
							:label="t('common.labels.time')"
							:class="{ hideCurrentTime: !data.date.time }"
							data-testid="news_time"
							@update:time="(newTime) => (data.date.time = newTime)"
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
						>
							<v-icon size="20" class="mr-1">{{ mdiCheck }}</v-icon>
							{{ t("common.actions.save") }}
						</VBtn>
						<VBtn v-if="news && news.id" variant="text" color="error" @click="onDelete">
							<v-icon size="20" class="mr-1">{{ mdiDelete }}</v-icon>
							{{ t("common.actions.delete") }}
						</VBtn>
						<VBtn variant="text" @click="onCancel">
							<v-icon size="20" class="mr-1">{{ mdiClose }}</v-icon>
							{{ t("common.actions.discard") }}
						</VBtn>
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

<script lang="ts">
import FormActions from "./FormActions.vue";
import { createInputDateTime, fromInputDateTime } from "@/plugins/datetime";
import { newsModule } from "@/store";
import { News } from "@/store/types/news";
import { notifyError } from "@data-app";
import { ClassicEditor } from "@feature-editor";
import { mdiCalendar, mdiCheck, mdiClose, mdiDelete } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DatePicker, TimePicker } from "@ui-date-time-picker";
import { useOpeningTagValidator } from "@util-validators";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	components: {
		FormActions,
		ClassicEditor,
		ConfirmationDialog,
		WarningAlert,
		DatePicker,
		TimePicker,
	},
	inheritAttrs: false,
	props: {
		news: {
			type: Object as PropType<News>,
			default: () => ({
				title: "",
				content: "",
				date: {
					date: undefined,
					time: undefined,
				},
			}),
		},
	},
	emits: ["update:news", "save", "delete", "cancel"],
	setup() {
		const { validateOnOpeningTag } = useOpeningTagValidator();
		const { askConfirmation } = useConfirmationDialog();
		const { t } = useI18n();

		return {
			askConfirmation,
			validateOnOpeningTag,
			t,
		};
	},
	data(): {
		data: {
			title: string;
			content: string;
			date: { date: string; time: string };
		};
		mdiClose: string;
		mdiCheck: string;
		mdiDelete: string;
		mdiCalendar: string;
		isConfirmDialogActive: boolean;
		showDialogWarning: boolean;
	} {
		return {
			data: {
				title: "",
				content: "",
				date: {
					date: "",
					time: "",
				},
			},
			mdiClose,
			mdiCheck,
			mdiDelete,
			mdiCalendar,
			isConfirmDialogActive: false,
			showDialogWarning: false,
		};
	},
	computed: {
		status(): string {
			return newsModule.getStatus;
		},
		displayAt(): string | undefined {
			if (!this.data.date.date || !this.data.date.time) {
				return undefined;
			}
			const dateTimeCombined = fromInputDateTime(this.data.date.date, this.data.date.time);
			const dateTimeCombinedString = dateTimeCombined as unknown as Dayjs;
			return dateTimeCombinedString.toISOString();
		},
		errors(): { title: string | undefined; content: string | undefined } {
			const title = this.data.title
				? undefined
				: this.t("components.organisms.FormNews.errors.missing_title").toString();

			const titleOpeningTag =
				this.validateOnOpeningTag(this.data.title) === true
					? undefined
					: this.t("common.validation.containsOpeningTag").toString();

			const content = this.data.content
				? undefined
				: this.t("components.organisms.FormNews.errors.missing_content").toString();

			return {
				title: title || titleOpeningTag,
				content,
			};
		},
	},
	watch: {
		news(to) {
			this.updateFromParent(to);
		},
		data: {
			deep: true,
			handler(to) {
				/**
				 * current news object,
				 * updated on every change.
				 * also defined as the v-model event
				 *
				 * @type {object}
				 */
				if (this.data.date.date && !this.data.date.time) {
					this.data.date.time = "00:00";
				}
				this.$emit("update:news", to);
			},
		},
	},
	created() {
		this.updateFromParent(this.news);
	},
	methods: {
		save() {
			const errors = Object.values(this.errors).filter((a) => a);
			if (errors.length && errors[0]) {
				notifyError(String(errors[0]));
				return errors[0];
			}
			this.$emit("save", { ...this.data, displayAt: this.displayAt });
		},
		updateFromParent({ title, content, displayAt }: News) {
			this.data.title = title;
			this.data.content = content;
			if (displayAt) {
				[this.data.date.date, this.data.date.time] = createInputDateTime(displayAt);
			}
		},
		onUpdateDate(newDate: string | null) {
			this.data.date.date = newDate ? dayjs(newDate).format("YYYY-MM-DD") : "";
		},
		onUpdateValue(newValue: string) {
			this.data.content = newValue;
		},
		async onDelete() {
			this.showDialogWarning = false;

			const shouldCancel = await this.askConfirmation({
				message: this.t("components.organisms.FormNews.remove.confirm.message"),
				confirmActionLangKey: "components.organisms.FormNews.remove.confirm.confirm",
			});

			if (shouldCancel) this.$emit("delete");
		},
		async onCancel() {
			this.showDialogWarning = true;

			const shouldCancel = await this.askConfirmation({
				message: this.t("components.organisms.FormNews.cancel.confirm.title"),
				confirmActionLangKey: "components.organisms.FormNews.cancel.confirm.confirm",
			});

			if (shouldCancel) this.$emit("cancel");
		},
	},
});
</script>

<style lang="scss" scoped>
// hide default current date/time in MacOS/Safari if input date/time is indeed empty
:deep(.hideCurrentDate) {
	input[type="date"]::-webkit-datetime-edit-day-field,
	input[type="date"]::-webkit-datetime-edit-month-field,
	input[type="date"]::-webkit-datetime-edit-year-field {
		opacity: 0;
	}
}

:deep(.hideCurrentTime) {
	input[type="time"]::-webkit-datetime-edit-hour-field,
	input[type="time"]::-webkit-datetime-edit-minute-field {
		opacity: 0;
	}
}
</style>
