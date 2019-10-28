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
				<p>Automatische Veröffentlichung vorplanen (optional)</p>
				<base-input v-model="news.date.date" type="date" label="Veröffentlichungsdatum"></base-input>
				<base-input v-model="news.date.time" type="time" label="Veröffentlichungszeit"></base-input>
				<base-button design="primary" @click="print">Anlegen</base-button>
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
export default {
	head() {
		return {
			title: "News erstellen",
		};
	},
	data: function() {
		return {
			news: {
				title: "",
				content: "",
				date: {
					date: '',
					time: '',
				},
			},
		};
	},
	methods: {
		async save() {
			try {
				const news = await this.$store.dispatch("news/create", {
					title: this.news.title,
					content: this.news.content,
					schoolId: this.$user.schoolId,
					target: this.$route.query.target,
					targetModel: this.$route.query.Model,
				});
				this.$toast.success("Artikel erstellt");
				this.$router.push({ name: "news-id", params: { id: news._id } });
			} catch (e) {
				console.error(e);
				this.$toast.error("Fehler beim Erstellen");
			}
		},
	},
};
</script>
