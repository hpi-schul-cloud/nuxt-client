<template>
	<div v-if="news">
		<section class="section">
			<NuxtLink :to="{ name: 'news-id', params: { id: news._id } }">
				<h5>{{ news.title }}</h5>
			</NuxtLink>
			<h1>News bearbeiten</h1>
			<button class="button is-danger" @click="confirmDelete">Löschen</button>
		</section>
		<section class="section">
			<BField label="Name">
				<BInput v-model="news.title" type="text" maxlength="30"></BInput>
			</BField>
			<BField label="Beschreibung">
				<BInput v-model="news.content" type="textarea"></BInput>
			</BField>
			<button class="button is-primary" @click="save()">Speichern</button>
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
						this.$toast.open("Artikel gelöscht");
						this.$router.push({ name: "news" });
					} catch (e) {
						this.$toast.open({
							message: "Fehler beim Löschen",
							type: "is-danger",
						});
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
				this.$toast.open({
					message: "Artikel gespeichert",
					type: "is-success",
				});
			} catch (e) {
				this.$toast.open({
					message: "Fehler beim Speichern",
					type: "is-danger",
				});
			}
		},
	},
};
</script>
