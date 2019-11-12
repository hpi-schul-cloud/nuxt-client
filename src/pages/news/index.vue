<template>
	<div>
		<user-has-permission permission="NEWS_CREATE">
			<base-button
				class="create-news-btn"
				design="primary"
				@click="$router.push({ name: 'news-new' })"
			>
				Artikel anlegen
			</base-button>
		</user-has-permission>

		<div class="view-toggles">
			<!-- TODO: Find correct Icons! and show correct one on active -->
			<base-button
				:design="isList ? 'icon text' : 'icon'"
				@click="toDisplayStyle('grid')"
			>
				<base-icon source="material" icon="view_column" />
			</base-button>
			<base-button
				:design="isList ? 'icon' : 'icon text'"
				@click="toDisplayStyle('list')"
			>
				<base-icon source="material" icon="view_list" />
			</base-button>
		</div>

		<user-has-permission permission="NEWS_CREATE">
			<template #true>
				<tabs>
					<tab name="Veröffentlicht">
						<grid-news :news="published" :list-view="isList" />
					</tab>
					<tab name="Unveröffentlicht">
						<grid-news :news="unpublished" :list-view="isList" />
					</tab>
				</tabs>
			</template>
			<template #false>
				<grid-news :news="published" :list-view="isList" />
			</template>
		</user-has-permission>
	</div>
</template>

<script>
import Tabs from "@components/organisms/Tabs/Tabs";
import Tab from "@components/organisms/Tabs/Tab";
import GridNews from "@components/molecules/GridNews";
import UserHasPermission from "@components/helpers/UserHasPermission";

export default {
	head() {
		return {
			title: "News",
		};
	},
	components: {
		GridNews,
		Tab,
		Tabs,
		UserHasPermission,
	},
	data: function() {
		return {
			isList: false,
		};
	},
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
	methods: {
		toDisplayStyle(newStyle) {
			this.isList = newStyle === "list";
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.view-toggles {
	display: none;

	@include breakpoint(tablet) {
		display: inline;
		float: right;
	}
}

.create-news-btn {
	margin-left: var(--space-md);
}
</style>
