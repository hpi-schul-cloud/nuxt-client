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
			<Card v-for="(team, i) of teams" :key="i">
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
						<BaseLink :to="{ name: 'teams-id', params: { id: team._id } }"
							>Anschauen</BaseLink
						>
					</div>
				</div>					
			</Card>
		</section>
	</div>
</template>

<script>
import isAuthenticated from "@middleware/is-authenticated";
import Card from "@components/ui/BaseCard";

export default {
	head() {
		return {
			title: "Teams",
		};
	},
	components: {
		Card
	},
	data () {
		return {
			teams: []
		}
	},
	middleware: [isAuthenticated],
	async created(ctx) {
		this.teams = (await this.$FeathersVuex.Team.find()).data;
	},
	methods: {
		find() {
			this.$store.dispatch("teams/find");
		},
	},
};
</script>
