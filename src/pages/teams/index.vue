<template>
	<div>
		<section class="section">
			<base-button
				class="button is-info"
				@click="$router.push({ name: 'teams-create' })"
				>Neues Team erstellen
			</base-button>
		</section>
		<section class="section">
			<div class="grid">
				<div v-for="(team, i) of teams" :key="i" class="tile">
					<base-card class="teams-card">
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
					</base-card>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import isAuthenticated from "@middleware/is-authenticated";

export default {
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

<style lang="scss">
@import "@variables";

.grid {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	min-width: $size-content-width-min;
	max-width: $size-content-width-max;
	margin: 0 auto;
}

.tile {
	display: flex;
	margin: 10px;
}

.teams-card {
	position: relative;
	width: 240px;
	padding: 10px;
	margin: 15px;
	cursor: pointer;
	border-radius: 4px;
	box-shadow: $shadow-1;
}
</style>
