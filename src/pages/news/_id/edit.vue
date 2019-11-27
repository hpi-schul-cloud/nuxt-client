<template>
	<div>
		<div v-if="news">
			<base-breadcrumb
				:inputs="[
					{
						to: { name: 'news' },
						text: $t('pages.news.title'),
					},
					{
						to: { name: 'news-id', params: { id: $route.params.id } },
						text: news.title,
					},
					{
						text: $t('pages.news._id.edit.title'),
					},
				]"
			/>
			<h1>{{ $t("pages.news._id.edit.title") }}</h1>

			<form-news
				v-slot:actions="{ remove, cancel }"
				action="patch"
				:news="news"
			>
				<form-actions>
					<template v-slot:secondary>
						<base-button
							design="danger text"
							type="button"
							@click.prevent="remove"
						>
							<base-icon source="material" icon="delete" />
							{{ $t("common.actions.remove") }}
						</base-button>
					</template>
					<template v-slot:primary>
						<base-button
							design="primary"
							type="submit"
							data-testid="btn_news_submit"
						>
							<base-icon source="material" icon="check" />
							{{ $t("common.actions.save") }}
						</base-button>
						<base-button design="text" @click.prevent="cancel">
							<base-icon source="material" icon="clear" />
							{{ $t("common.actions.cancel") }}
						</base-button>
					</template>
				</form-actions>
			</form-news>
		</div>
	</div>
</template>

<script>
import FormNews from "@components/organisms/FormNews";
import FormActions from "@components/molecules/FormActions";

export default {
	components: {
		FormNews,
		FormActions,
	},
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	async asyncData({ store, params }) {
		return {
			news: await store.dispatch("news/get", params.id),
		};
	},
	meta: {
		requiredPermissions: ["NEWS_EDIT"],
	},
	head() {
		const hasTitle = (this.news || {}).title;
		return {
			title: hasTitle
				? `${(this.news || {}).title} bearbeiten`
				: this.$t("pages.news._id.edit.title"),
		};
	},
};
</script>
