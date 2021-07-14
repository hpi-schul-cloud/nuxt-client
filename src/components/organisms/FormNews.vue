<template>
	<form v-on="$listeners" @submit.prevent="save">
		<title-input
			v-model="data.title"
			:focus="true"
			:placeholder="$t('components.organisms.FormNews.input.title.placeholder')"
			name="title"
			type="text"
			:required="true"
			data-testid="news_title"
			:label="$t('components.organisms.FormNews.input.title.label')"
		/>
		<transition name="fade">
			<div v-if="data.title">
				<text-editor
					v-model="data.content"
					class="mb--md mt--xl-3"
					:error="errors.content"
					:required="true"
					:placeholder="$t('components.organisms.FormNews.editor.placeholder')"
				/>
				<transition name="fade">
					<div v-if="data.content">
						<p class="mt--xl-3">
							{{ $t("components.organisms.FormNews.label.planned_publish") }}
						</p>
						<base-input
							v-model="data.date.date"
							type="date"
							:label="$t('components.organisms.FormNews.label.date')"
							data-testid="news_date"
							placeholder="JJJJ-MM-TT"
						/>
						<base-input
							v-model="data.date.time"
							type="time"
							:label="$t('components.organisms.FormNews.label.time')"
							data-testid="news_time"
							placeholder="HH:MM"
						/>
					</div>
				</transition>
				<form-actions>
					<template #primary>
						<base-button
							design="primary"
							type="submit"
							data-testid="btn_news_submit"
							:disabled="status === 'pending'"
						>
							<base-icon source="material" icon="check" />
							{{ $t("common.actions.save") }}
						</base-button>
						<base-button
							v-if="news && news.id"
							design="danger text"
							type="button"
							@click="remove"
						>
							<base-icon source="material" icon="delete" />
							{{ $t("common.actions.remove") }}
						</base-button>
						<base-button design="text" @click="cancel">
							<base-icon source="material" icon="clear" />
							{{ $t("common.actions.discard") }}
						</base-button>
					</template>
				</form-actions>
			</div>
		</transition>
	</form>
</template>

<script lang="ts">
import Vue from "vue";
import { fromInputDateTime, createInputDateTime } from "@plugins/datetime";
import NewsModule from "@/store/news";

import TextEditor from "@components/molecules/TextEditor.vue";
import TitleInput from "@components/molecules/TitleInput.vue";
import FormActions from "@components/molecules/FormActions.vue";

export default Vue.extend({
	components: {
		TextEditor,
		TitleInput,
		FormActions,
	},
	model: {
		prop: "news",
		event: "update:news",
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
		};
	},
	computed: {
		status(): string {
			return NewsModule.getStatus;
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
				: this.$ts("components.organisms.FormNews.errors.missing_title");
			const content = this.data.content
				? undefined
				: this.$ts("components.organisms.FormNews.errors.missing_content");
			return {
				title,
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
				return this.$toast.error(errors[0]);
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
		async remove() {
			this.$dialog.confirm({
				icon: "warning",
				actionDesign: "success",
				iconColor: "var(--color-danger)",
				invertedDesign: true,
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
			this.$dialog.confirm({
				message: this.$t(
					"components.organisms.FormNews.cancel.confirm.message"
				),
				icon: "warning",
				cancelText: this.$t(
					"components.organisms.FormNews.cancel.confirm.cancel"
				),
				confirmText: this.$t(
					"components.organisms.FormNews.cancel.confirm.confirm"
				),
				actionDesign: "success",
				iconColor: "var(--color-danger)",
				invertedDesign: true,
				onConfirm: () => this.$emit("cancel"),
			});
		},
	},
});
</script>

<style lang="scss" scoped>
@import "@styles";

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
