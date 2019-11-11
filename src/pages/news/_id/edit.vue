<template>
	<div>
		<div v-if="news">
			<section class="section">
				<base-breadcrumb
					:inputs="[
						{
							to: { name: 'news' },
							text: 'News',
						},
						{
							to: { name: 'news-id', params: { id: $route.params.id } },
							text: news.title,
						},
						{
							text: 'bearbeiten',
						},
					]"
				/>
				<h3>News bearbeiten</h3>
			</section>

			<base-input
				v-model="news.title"
				label="Titel"
				name="title"
				type="text"
				maxlength="30"
			/>
			<text-editor v-model="news.content" class="mb--md" />

			<!-- <p>Automatische Veröffentlichung vorplanen (optional)</p>
			<base-input
				v-model="news.date.date"
				type="date"
				label="Veröffentlichungsdatum"
			/>
			<base-input
				v-model="news.date.time"
				type="time"
				label="Veröffentlichungszeit"
			/> -->

			<form-actions>
				<template v-slot:secondary>
					<base-button design="danger text" @click="confirmDelete">
						Löschen
					</base-button>
				</template>
				<template v-slot:primary>
					<base-button design="primary" @click="save">Speichern</base-button>
				</template>
			</form-actions>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TextEditor from "@components/molecules/TextEditor";
import FormActions from "@components/molecules/FormActions";

export default {
	components: {
		TextEditor,
		FormActions,
	},
	head() {
		return {
			title: `${(this.orgNews || {}).title || "News"} bearbeiten`,
		};
	},
	data: function() {
		return {
			news: {
				title: "",
				content: "",
			},
			active: false,
		};
	},
	computed: {
		...mapGetters("news", {
			orgNews: "current",
		}),
	},
	watch: {
		orgNews(to) {
			this.news = { ...to };
		},
	},
	created(ctx) {
		this.get(this.$route.params.id);
	},
	methods: {
		...mapActions("news", ["remove"]),
		confirmDelete() {
			this.$dialog.confirm({
				title: "Artikel löschen",
				message: "Möchtest du diesen Artikel wirklich unwiederruflich löschen?",
				confirmText: "Artikel löschen",
				onConfirm: async () => {
					try {
						await this.$store.dispatch("news/remove", this.$route.params.id);
						this.$toast.success("Artikel erfolgreich gelöscht!");
						this.$router.push({ name: "news" });
					} catch (e) {
						console.error(e);
						this.$toast.error("Fehler beim Löschen des Artikels.");
					}
				},
			});
		},
		get(id) {
			this.$store.dispatch("news/get", id);
		},
		async save() {
			try {
				await this.$store.dispatch("news/patch", [
					this.$route.params.id,
					{
						title: this.news.title,
						content: this.news.content,
					},
				]);
				this.$toast.success("Artikel gespeichert");
				this.$router.push({
					name: "news-id",
					params: { id: this.$route.params.id },
				});
			} catch (e) {
				this.$toast.error("Fehler beim Speichern");
			}
		},
	},
};
</script>
