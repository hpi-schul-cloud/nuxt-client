<template>
	<form v-on="$listeners" @submit.prevent="submitHandler">
		<base-input
			v-model="data.title"
			:label="$t('components.organisms.FormNews.label.title')"
			name="title"
			type="text"
			:error="errors.title"
			:success="!errors.title"
			:required="true"
			data-testid="news_title"
		/>
		<text-editor
			v-model="data.content"
			class="mb--md"
			:error="errors.content"
			:required="true"
		/>
		<p>{{ $t("components.organisms.FormNews.label.planned_publish") }}</p>
		<base-input
			v-model="data.date.date"
			type="date"
			:label="$t('components.organisms.FormNews.label.date')"
			data-testid="news_date"
		/>
		<base-input
			v-model="data.date.time"
			type="time"
			:label="$t('components.organisms.FormNews.label.time')"
			data-testid="news_time"
		/>
		<!-- @slot Add your action buttons here, predefined actions are `#actions="{ remove, cancel }"` -->
		<slot name="actions" :remove="remove" :cancel="cancel"> </slot>
	</form>
</template>

<script>
import dayjs from "dayjs";
import TextEditor from "@components/molecules/TextEditor";

export default {
	components: {
		TextEditor,
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
		/**
		 * Which Action to execute on Form Submit.
		 * Submit using a `<BaseButton type="submit">Submit</BaseButton>`
		 */
		action: {
			type: String,
			required: true,
			validator: (v) => ["create", "patch"].includes(v),
		},
	},
	data() {
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
		publishDate() {
			if (!this.data.date.date || !this.data.date.time) {
				return undefined;
			}
			const date = dayjs(
				`${this.data.date.date} ${this.data.date.time}`,
				"YYYY-MM-DD HH:MM"
			);
			return date.toISOString();
		},
		errors() {
			const title = this.data.title
				? undefined
				: this.$t("components.organisms.FormNews.errors.missing_title");
			const content = this.data.content
				? undefined
				: this.$t("components.organisms.FormNews.errors.missing_content");
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
				this.$emit("update:news", to);
			},
		},
	},
	created() {
		this.updateFromParent(this.news);
	},
	methods: {
		submitHandler() {
			switch (this.action) {
				case "create": {
					this.create();
					break;
				}
				case "patch": {
					this.patch();
					break;
				}
			}
		},
		updateFromParent({ title, content, displayAt }) {
			this.data.title = title;
			this.data.content = content;
			if (displayAt) {
				const date = dayjs(displayAt);
				this.data.date.date = date.format("YYYY-MM-DD");
				this.data.date.time = date.format("HH:mm");
			}
		},
		async create() {
			const errors = Object.values(this.errors).filter((a) => a);
			if (errors.length) {
				return this.$toast.error(errors[0]);
			}
			try {
				const news = await this.$store.dispatch("news/create", {
					title: this.data.title,
					content: this.data.content,
					displayAt: this.publishDate,
					schoolId: this.$user.schoolId,
					target: this.$route.query.target || this.$route.query.contextId,
					targetModel:
						this.$route.query.targetmodel || this.$route.query.context,
				});
				this.$toast.success(
					this.$t("components.organisms.FormNews.success.create")
				);
				this.$router.push({ name: "news-id", params: { id: news._id } });
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormNews.errors.create")
				);
			}
		},
		async patch() {
			const errors = Object.values(this.errors).filter((a) => a);
			if (errors.length) {
				return this.$toast.error(errors[0]);
			}
			try {
				await this.$store.dispatch("news/patch", [
					this.$route.params.id,
					{
						title: this.data.title,
						content: this.data.content,
						displayAt: this.publishDate,
					},
				]);
				this.$toast.success(
					this.$t("components.organisms.FormNews.success.patch")
				);
				this.$router.push({
					name: "news-id",
					params: { id: this.$route.params.id },
				});
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormNews.errors.patch")
				);
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
				onConfirm: this.confirmRemoveHandler,
			});
		},
		async confirmRemoveHandler() {
			try {
				await this.$store.dispatch("news/remove", this.$route.params.id);
				this.$toast.success(
					this.$t("components.organisms.FormNews.success.remove")
				);
				this.$router.push({ name: "news" });
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormNews.errors.remove")
				);
			}
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
				onConfirm: this.confirmCancelHandler,
			});
		},
		async confirmCancelHandler() {
			const cancelTarget = this.$route.params.id
				? {
						name: "news-id",
						params: { id: this.$route.params.id },
				  }
				: {
						name: "news",
				  };
			this.$router.push(cancelTarget);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
