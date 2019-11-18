<template>
	<div>
		<section class="mt--lg section">
			<base-button
				class="button is-info"
				@click="$router.push({ name: 'teams-create' })"
				>Neues Team erstellen
			</base-button>
		</section>

		<section v-if="myInvitations.length > 0" class="section">
			<h2>Einladungen</h2>
			<div class="grid">
				<div v-for="(team, i) of myInvitations" :key="i" class="tile">
					<base-card class="teams-card">
						<div slot="header" class="card-image"></div>
						<div class="card-content">
							<div class="media">
								<div class="media-content">
									<p class="title is-4">{{ team.name }}</p>
								</div>
							</div>

							<div class="content">
								<p>{{ team.description }}</p>
							</div>
						</div>
						<div slot="footer">
							<div class="footer-actions">
								<a class="link" @click="acceptInvitation(team)">Akzeptieren</a>
							</div>
						</div>
					</base-card>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>Meine Teams</h2>
			<p v-if="teams.length === 0">Du bist noch in keinen Teams.</p>
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

export default {
	data() {
		return {
			myInvitations: [],
		};
	},
	computed: {
		...mapGetters("teams", {
			teams: "list",
		}),
	},
	async created(ctx) {
		this.find();
		try {
			this.myInvitations = (await this.$store.dispatch(
				"teams/getMyInvitations"
			)).data;
		} catch {
			this.$toast.error("Fehler beim Laden der Einladungen");
		}
	},
	methods: {
		async acceptInvitation(team) {
			try {
				await this.$store.dispatch("teams/acceptInvitation", team._id);
				this.$toast.success('Willkommen im Team "' + team.name + '"');
				this.$router.push({ name: "teams-id", params: { id: team._id } });
			} catch (e) {
				this.$toast.error("Fehler beim Akzeptieren der Einladung");
			}
		},
		find() {
			this.$store.dispatch("teams/find");
		},
	},
	head() {
		return {
			title: "Teams",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.grid {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}

.tile {
	display: flex;
	margin: var(--space-sm);
}

.teams-card {
	position: relative;
	width: 240px;
	padding: var(--space-sm);
	margin: var(--space-md);
	cursor: pointer;
	border-radius: var(--radius-sm);
	box-shadow: var(--shadow-sm);
}
</style>
