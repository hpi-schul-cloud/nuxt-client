<template>
	<div v-if="team">
		<section class="section">
			<h4>
				<span>
					<base-link :to="{ name: 'teams' }">Teams</base-link>
				</span>
				<span>/ {{ team.name }}</span>
			</h4>
			<h5>{{ team.description }}</h5>
		</section>

		<section v-if="team.userIds" class="section">
			<h3>Teilnehmer</h3>
			<p>Es befinden sich {{ team.userIds.length }} Teilnehmer im Team</p>
			<base-button
				class="button is-info"
				@click="
					$router.push({ name: 'teams-id-members', params: { id: team._id } })
				"
				>Zur Teilnehmer-Übersicht</base-button
			>
		</section>

		<section class="section">
			<h3>News</h3>
			<base-button
				v-if="hasTeamPermission('CREATE_NEWS')"
				class="is-primary"
				@click="
					$router.push({
						name: 'news-create',
						query: { target: team._id, targetModel: 'teams' },
					})
				"
				>Artikel anlegen</base-button
			>
			<news-card
				v-for="article of newsColored"
				:key="article._id"
				:article="article"
				class="mb-2"
			/>
		</section>

		<section class="section">
			<h3>Dateien & Ordner</h3>
			<h4>Ordner</h4>
			<h4>Dateien</h4>
		</section>

		<section class="section">
			<h3>Termine</h3>
		</section>

		<section class="section">
			<h3>Themen & Aufgaben</h3>
		</section>

		<section v-if="hasTeamPermission('RENAME_TEAM')" class="section">
			<h3>Aktionen</h3>
			<base-button
				v-if="hasTeamPermission('RENAME_TEAM')"
				class="button is-info"
				@click="$router.push({ name: 'teams-id-edit' })"
				>Team bearbeiten</base-button
			>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import NewsCard from "@components/NewsCard";
var moment = require("moment");
import _ from "lodash";

export default {
	components: {
		NewsCard,
	},
	data() {
		return {
			moment,
		};
	},
	computed: {
		...mapGetters("teams", {
			team: "current",
			hasTeamPermission: "hasTeamPermission",
		}),
		...mapGetters("news", {
			news: "list",
		}),
		newsColored() {
			const colors = [
				"#F44336",
				"#E91E63",
				"#3F51B5",
				"#2196F3",
				"#03A9F4",
				"#00BCD4",
				"#009688",
				"#4CAF50",
				"#CDDC39",
				"#FFC107",
				"#FF9800",
				"#FF5722",
			];

			return this.news.map((article) => {
				article.color = colors[_.random(0, colors.length - 1)];
				return article;
			});
		},
	},
	async created(ctx) {
		await this.$store.dispatch("teams/get", this.$route.params.id);
		this.$store.dispatch("news/find", {
			query: {
				target: this.team._id,
				$limit: 6,
				$sort: {
					createdAt: -1,
				},
			},
		});
	},
};
</script>
