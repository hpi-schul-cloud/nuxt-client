<template>
	<v-container>
		<!-- <base-breadcrumb :inputs="breadcrumbs" /> -->
		<v-breadcrumbs :items="breadcrumbItems" :large="true">
			<template v-slot:item="{ item }">
				<v-breadcrumbs-item
					:href="item.href"
					:disabled="item.disabled"
					class="text-lg"
				>
					{{ item.text }}
				</v-breadcrumbs-item>
			</template>
			<template v-slot:divider>
				<v-icon> {{ iconMdiChevronRight }} </v-icon>
			</template>
		</v-breadcrumbs>
		<v-row>
			<v-col>
				<h1 class="text-h3">
					{{ $t("pages.administration.school.index.title") }}
				</h1>
				<h2 class="text-h4">
					{{ $t("pages.administration.school.schoolYear") }} 2020/21
				</h2>
				<p>
					{{
						$t(
							"pages.administration.school.longText.provideStudentsAndTheirParents"
						)
					}}
				</p>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row>
			<v-col>
				<v-btn large color="primary" to="/news/new">
					<v-icon left> fa-plus </v-icon>
					{{ $t("pages.news.index.new") }}
				</v-btn>
				<v-icon> fa-plus </v-icon>
				<v-icon> {{ iconMdiAccount }} </v-icon>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				v-for="article of news"
				:key="article._id"
				class="d-flex child-flex"
			>
				<v-card :to="{ name: 'news-id', params: { id: article._id } }">
					<v-card-title>{{ article.title }} </v-card-title>
					<v-card-subtitle> {{ fromNow(article.createdAt) }} </v-card-subtitle>
					<v-card-actions>
						<v-spacer />
						<v-btn
							color="primary"
							text
							:to="{ name: 'news-id', params: { id: article._id } }"
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
import { mdiAccount, mdiChevronRight } from "@mdi/js";

export default {
	components: {},
	layout: "defaultVuetify",
	data() {
		return {
			breadcrumbItems: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
				{
					text: this.$t("pages.administration.school.index.title"),
					disabled: true,
				},
			],
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.school.index.title"),
				},
			],
			fromNow,
			iconMdiAccount: mdiAccount,
			iconMdiChevronRight: mdiChevronRight,
		};
	},
	computed: {
		...mapGetters("news", {
			news: "list",
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
			title: `${this.$t("pages.administration.school.index.title")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>
