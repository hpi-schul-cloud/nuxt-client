<template>
	<div>
		<div v-if="news">
			<h1>Artikel erstellen</h1>

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
				<base-button class="is-primary" @click="save">Anlegen</base-button>
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
			news: {
				title: "",
				content: "",
			},
		};
	},
	methods: {
		async save() {
			try {
				const news = await this.$store.dispatch("news/create", [
					{
						title: this.news.title,
						content: this.news.content,
						schoolId: this.$user.schoolId,
						target: this.$route.query.target,
						targetModel: this.$route.query.Model,
					},
				]);
				this.$toast.success("Artikel erstellt");
				this.$router.push({ name: "news-id", params: { id: news._id } });
			} catch (e) {
				this.$toast.error("Fehler beim Erstellen");
			}
		},
	},
};
</script>
