<template>
	<div>
		<section class="section">
			<button
				class="button is-info"
				@click="$router.push({ name: 'teams-create' })"
				>Neues Team erstellen</button
			>
		</section>
		<section class="section">
			<card v-for="(team, i) of teams" :key="i">
				<div slot="header" class="card-image"></div>
				<div class="card-content">
					<div class="media">
						<div class="media-content">
							<p class="title is-4">{{ team.name }}</p>
							<!-- <p class="subtitle is-6">
								<span v-for="(tag, index) of data.tags" :key="index" class="tag">
									{{ tag }}
								</span>
							</p> -->
						</div>
					</div>

					<div class="content">
						<p>{{ team.description }}</p>
					</div>
				</div>
				<div slot="footer">
					<div class="footer-actions">
						<base-link :to="{ name: 'teams-id', params: { id: team._id } }"
							>Anschauen</base-link
						>
					</div>
				</div>
			</card>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import isAuthenticated from "@middleware/is-authenticated";
import Card from "@components/ui/BaseCard";

export default {
	components: {
		Card,
	},
	head() {
		return {
			title: "Teams",
		};
	},
	middleware: [isAuthenticated],
	computed: {
		...mapGetters("teams", {
			teams: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("teams/find");
		},
	},
};
</script>
