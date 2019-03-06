<template>
	<div v-if="news">
		<section class="section">
			<BaseLink :to="{ name: 'news-id', params: { id: news._id } }">
				<h5>{{ news.title }}</h5>
			</BaseLink>
			<h1>News bearbeiten</h1>
			<BaseButton class="is-danger" @click="confirmDelete">Löschen</BaseButton>
		</section>
		<section class="section">
			<BaseInput
				v-model="news.title"
				label="Name"
				type="text"
				maxlength="30"
			></BaseInput>
			<BaseInput
				v-model="news.content"
				label="Beschreibung"
				type="textarea"
			></BaseInput>
			<BaseButton class="is-primary" @click="save()">Speichern</BaseButton>
		</section>
		<section class="section">
			<h1>{{ news.title }}</h1>
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="news.content" />
		</section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
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
				message: "Bist du sicher, dass du diesen Artikel löschen möchtest?",
				confirmText: "Artikel löschen",
				type: "is-danger",
				hasIcon: true,
				onConfirm: async () => {
					try {
						await this.remove(this.news._id);
						this.$toast.success("Artikel gelöscht");
						this.$router.push({ name: "news" });
					} catch (e) {
						this.$toast.error("Fehler beim Löschen");
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
