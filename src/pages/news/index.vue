<template>
	<v-container>
		<v-row>
			<v-col>
				<h1 class="text-h2">{{ $t("pages.news.title") }}</h1>
				<p>Lorem Ipsum, normaler Text.</p>
				<p>
					Some icons: <v-icon> fa-plus </v-icon>
					<v-icon> {{ iconMdiAccount }} </v-icon>
				</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-btn large color="primary" to="/news/new">
					<v-icon left> fa-plus </v-icon>
					{{ $t("pages.news.index.new") }}
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				v-for="article of news"
				:key="article.id"
				class="d-flex child-flex"
			>
				<v-card :to="{ name: 'news-id', params: { id: article.id } }">
					<v-card-title>{{ article.title }} </v-card-title>
					<v-card-subtitle> {{ fromNow(article.createdAt) }} </v-card-subtitle>
					<v-card-actions>
						<v-spacer />
						<v-btn
							color="primary"
							text
							:to="{ name: 'news-id', params: { id: article.id } }"
						>
							{{ $t("common.labels.readmore") }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { fromNow } from "@plugins/datetime";
import { mdiAccount } from "@mdi/js";

export default {
	components: {},
	layout: "defaultVuetify",
	data() {
		return {
			fromNow,
			iconMdiAccount: mdiAccount,
		};
	},
	computed: {
		...mapGetters("news", {
			news: "getList",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("news/find", {
				query: {
					$sort: {
						createdAt: -1,
					},
				},
			});
		},
	},
	head() {
		return {
			title: this.$t("pages.news.title"),
		};
	},
};
</script>
