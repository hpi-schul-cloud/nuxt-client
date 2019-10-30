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
				/>
				<text-editor v-model="news.content" class="mb--md" />
				<p>Automatische Veröffentlichung vorplanen (optional)</p>
				<base-input
					v-model="news.date.date"
					type="date"
					label="Veröffentlichungsdatum"
				/>
				<base-input
					v-model="news.date.time"
					type="time"
					label="Veröffentlichungszeit"
				/>
				<base-button design="primary" @click="print">Anlegen</base-button>
			</section>
		</div>
	</div>
</template>

<script>
import TextEditor from "@components/molecules/TextEditor";
export default {
	components: {
		TextEditor,
	},
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
					date: "",
					time: "",
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
