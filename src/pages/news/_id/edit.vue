<template>
	<div>
		<div v-if="news">
			<section class="section">
				<base-link :to="{ name: 'news-id', params: { id: news._id } }">
					<h5>{{ news.title }}</h5>
				</base-link>
				<h1>News bearbeiten</h1>
				<base-button class="is-danger" @click="confirmDelete">
					Löschen
				</base-button>
			</section>

			<section class="section">
				<base-input
					v-model="news.title"
					label="Titel"
					name="title"
					type="text"
					maxlength="30"
				></base-input>
				<base-input
					v-model="news.content"
					label="Inhalt"
					name="content"
					type="text"
				></base-input>
				<base-button class="is-primary" @click="save">Speichern</base-button>
			</section>

			<section class="section">
				<h1>{{ news.title }}</h1>
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="news.content" />
			</section>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data: function() {
		return {
			active: false,
		};
	},
	computed: {
		...mapGetters("news", {
			news: "current",
		}),
	},
	created(ctx) {
		this.get(this.$route.params.id);
	},
	methods: {
		...mapActions("news", ["remove"]),
		confirmDelete() {
			this.$dialog.confirm({
				title: "Artikel löschen",
				message: "Möchtest du diesen Artikel wirklich löschen?",
				confirmText: "Artikel löschen",
				onConfirm: async () => {
					try {
						await this.$store.dispatch("news/remove", this.news._id);
						this.$toast.success("Artikel erfolgreich gelöscht!");
						this.$router.push({ name: "news" });
					} catch (e) {
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
						name: this.news.name,
						content: this.news.content,
					},
				]);
				this.$toast.success("Artikel gespeichert");
			} catch (e) {
				this.$toast.error("Fehler beim Speichern");
			}
		},
	},
};
</script>
