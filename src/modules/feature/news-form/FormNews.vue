<template>
	<div>
		<form v-bind="$attrs" @submit.prevent="save">
			<VTextField
				v-model="data.title"
				:focus="true"
				:placeholder="
					$t('components.organisms.FormNews.input.title.placeholder')
				"
				name="title"
				type="text"
				:required="true"
				data-testid="news_title"
				:label="$t('components.organisms.FormNews.input.title.label')"
				:rules="[validateOnOpeningTag]"
			/>
			<transition name="fade">
				<div v-if="data.title">
					<ck-editor
						v-model="data.content"
						class="mb--md mt--xl-3"
						:placeholder="
							$t('components.organisms.FormNews.editor.placeholder')
						"
						type="classic"
						mode="news"
						@update:value="onUpdateValue"
					/>

					<transition name="fade">
						<div v-if="data.content">
							<p class="mt--xl-3">
								{{ $t("components.organisms.FormNews.label.planned_publish") }}
							</p>
							<base-input
								v-model="data.date.date"
								type="date"
								:label="$t('common.labels.date')"
								:class="{ hideCurrentDate: !data.date.date }"
								data-testid="news_date"
								placeholder="JJJJ-MM-TT"
							/>
							<base-input
								v-model="data.date.time"
								type="time"
								:label="$t('common.labels.time')"
								:class="{ hideCurrentTime: !data.date.time }"
								data-testid="news_time"
								placeholder="HH:MM"
							/>
						</div>
					</transition>
					<form-actions>
						<template #primary>
							<v-btn
								color="primary"
								variant="flat"
								type="submit"
								data-testid="btn_news_submit"
								:disabled="status === 'pending'"
							>
								<v-icon size="20" class="mr-1">{{ mdiCheck }}</v-icon>
								{{ $t("common.actions.save") }}
							</v-btn>
							<v-btn
								v-if="news && news.id"
								variant="text"
								color="error"
								@click="remove"
							>
								<v-icon size="20" class="mr-1">{{ mdiDelete }}</v-icon>
								{{ $t("common.actions.delete") }}
							</v-btn>
							<v-btn variant="text" @click="cancel">
								<v-icon size="20" class="mr-1">{{ mdiClose }}</v-icon>
								{{ $t("common.actions.discard") }}
							</v-btn>
						</template>
					</form-actions>
				</div>
			</transition>
		</form>
		<base-dialog
			v-if="isConfirmDialogActive"
			:active="isConfirmDialogActive"
			v-bind="confirmDialogProps"
			@update:active="isConfirmDialogActive = false"
		/>
	</div>
</template>

<script lang="ts">
import { createInputDateTime, fromInputDateTime } from "@/plugins/datetime";
import { newsModule, notifierModule } from "@/store";
import { useOpeningTagValidator } from "@/utils/validation/openingTagValidator";
import { CkEditor } from "@feature-editor";
import { mdiAlert, mdiCheck, mdiClose, mdiDelete } from "@icons/material";
import { defineComponent } from "vue";
import FormActions from "./FormActions.vue";

export default defineComponent({
	setup() {
		const { validateOnOpeningTag } = useOpeningTagValidator();

		return {
			validateOnOpeningTag,
		};
	},
	inheritAttrs: false,
	components: {
		FormActions,
		CkEditor,
	},
	props: {
		news: {
			type: Object,
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
	data(): {
		data: {
			title: string;
			content: string;
			date: { date: string; time: string };
		};
		mdiClose: string;
		mdiCheck: string;
		mdiDelete: string;
		confirmDialogProps: Record<string, unknown>;
		isConfirmDialogActive: boolean;
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
			confirmDialogProps: {},
			isConfirmDialogActive: false,
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
			const dateTimeCombined: any = fromInputDateTime(
				this.data.date.date,
				this.data.date.time
			);
			return dateTimeCombined.toISOString();
		},
		errors(): { title: string | undefined; content: string | undefined } {
			const title = this.data.title
				? undefined
				: this.$t(
						"components.organisms.FormNews.errors.missing_title"
					).toString();

			const titleOpeningTag =
				this.validateOnOpeningTag(this.data.title) === true
					? undefined
					: this.$t("common.validation.containsOpeningTag").toString();

			const content = this.data.content
				? undefined
				: this.$t(
						"components.organisms.FormNews.errors.missing_content"
					).toString();

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
				notifierModule.show({
					text: String(errors[0]),
					status: "error",
					timeout: 5000,
				});
				return errors[0];
			}
			this.$emit("save", { ...this.data, displayAt: this.displayAt });
		},
		updateFromParent({ title, content, displayAt }: any) {
			this.data.title = title;
			this.data.content = content;
			if (displayAt) {
				[this.data.date.date, this.data.date.time] =
					createInputDateTime(displayAt);
			}
		},
		onUpdateValue(newValue: string) {
			this.data.content = newValue;
		},
		async remove() {
			this.dialogConfirm({
				icon: mdiAlert,
				iconColor: "rgba(var(--v-theme-error))",
				message: this.$t(
					"components.organisms.FormNews.remove.confirm.message"
				),
				confirmText: this.$t(
					"components.organisms.FormNews.remove.confirm.confirm"
				),
				cancelText: this.$t(
					"components.organisms.FormNews.remove.confirm.cancel"
				),
				onConfirm: () => this.$emit("delete"),
			});
		},
		async cancel() {
			this.dialogConfirm({
				message: this.$t(
					"components.organisms.FormNews.cancel.confirm.message"
				),
				icon: mdiAlert,
				cancelText: this.$t("common.actions.cancel"),
				confirmText: this.$t(
					"components.organisms.FormNews.cancel.confirm.confirm"
				),
				iconColor: "rgba(var(--v-theme-error))",
				onConfirm: () => this.$emit("cancel"),
			});
		},
		dialogConfirm(confirmDialogProps: Record<string, unknown>) {
			this.confirmDialogProps = confirmDialogProps;
			this.isConfirmDialogActive = true;
		},
	},
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

// hide default current date/time in MacOS/Safari if input date/time is indeed empty
:deep() {
	.hideCurrentDate {
		input[type="date"]::-webkit-datetime-edit-day-field,
		input[type="date"]::-webkit-datetime-edit-month-field,
		input[type="date"]::-webkit-datetime-edit-year-field {
			opacity: 0;
		}
	}

	.hideCurrentTime {
		input[type="time"]::-webkit-datetime-edit-hour-field,
		input[type="time"]::-webkit-datetime-edit-minute-field {
			opacity: 0;
		}
	}
}
</style>
