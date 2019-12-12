<template>
	<div>
		<user-has-permission permission="NEWS_CREATE">
			<floating-fab icon="add" to="/news/new" />
		</user-has-permission>

		<user-has-permission permission="NEWS_CREATE">
			<template #true>
				<div>
					<list-grid-view-toggle v-model="viewType" class="view-toggle" />
					<tabs>
						<tab name="Veröffentlicht">
							<grid-news :news="published" :list-view="isListView" />
						</tab>
						<tab name="Unveröffentlicht">
							<grid-news :news="unpublished" :list-view="isListView" />
						</tab>
					</tabs>
				</div>
			</template>
			<template #false>
				<grid-news :news="published" :list-view="isListView" />
			</template>
		</user-has-permission>
	</div>
</template>

<script>
import FloatingFab from "@components/molecules/FloatingFab";
import GridNews from "@components/molecules/GridNews";
import ListGridViewToggle from "@components/molecules/ListGridViewToggle";
import Tab from "@components/atoms/Tab";
import Tabs from "@components/organisms/Tabs/Tabs";
import UserHasPermission from "@components/helpers/UserHasPermission";

export default {
	components: {
		FloatingFab,
		GridNews,
		ListGridViewToggle,
		Tab,
		Tabs,
		UserHasPermission,
	},
	layout: "loggedInFull",
	async asyncData({ store }) {
		return {
			published: (await store.dispatch("news/find", {
				query: {
					sort: "-displayAt",
					$populate: ["createdBy"],
				},
			})).data,
			unpublished: (await store.dispatch("news/find", {
				query: {
					sort: "-displayAt",
					unpublished: true,
				},
			})).data,
		};
	},
	data: function() {
		return {
			viewType: "grid",
		};
	},
	computed: {
		isListView() {
			return this.viewType === "list";
		},
	},
	head() {
		return {
			title: this.$t("pages.news.title"),
		};
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.create-news-btn {
	margin-left: var(--space-md);
}

.view-toggle {
	display: block;
	margin-left: var(--space-md);
	text-align: right;
}
</style>
