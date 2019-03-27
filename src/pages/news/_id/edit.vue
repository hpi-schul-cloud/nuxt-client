<template>
	<div>
		<div v-if="news">
			<section class="section">
				<BaseLink :to="{ name: 'news-id', params: { id: news._id } }">
					<h5>{{ news.title }}</h5>
				</BaseLink>
				<h1>News bearbeiten</h1>
				<BaseButton class="is-danger" @click="active = true">
					Löschen
				</BaseButton>
			</section>

			<section class="section">
				<BaseInput
					v-model="news.title"
					label="Titel"
					name="title"
					type="text"
					maxlength="30"
				></BaseInput>
				<BaseInput
					v-model="news.content"
					label="Inhalt"
					name="content"
					type="text"
				></BaseInput>
				<BaseButton class="is-primary" @click="save">Speichern</BaseButton>
			</section>

			<section class="section">
				<h1>{{ news.title }}</h1>
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="news.content" />
			</section>
		</div>

		<BaseModal ref="modal" :active.sync="active">
			<div class="modal-header">
				<h3>Löschen?</h3>
			</div>

			<div class="modal-body">
				Bist du sicher, dass du diesen Artikel löschen möchtest?
			</div>

			<div class="modal-footer">
				<BaseButton class="is-light" @click="$refs.modal.close">
					Abbrechen
				</BaseButton>
				<BaseButton @click="confirmDelete">
					Löschen
				</BaseButton>
			</div>
		</BaseModal>
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
			// TODO
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
