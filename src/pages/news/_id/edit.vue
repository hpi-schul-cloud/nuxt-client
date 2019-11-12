<template>
	<div>
		<div v-if="news">
			<base-breadcrumb
				:inputs="[
					{
						to: { name: 'news' },
						text: 'News',
					},
					{
						to: { name: 'news-id', params: { id: $route.params.id } },
						text: news.title,
					},
					{
						text: 'bearbeiten',
					},
				]"
			/>
			<h1>News bearbeiten</h1>

			<form-news v-slot:actions="{ patch, remove }" :news="news">
				<form-actions>
					<template v-slot:secondary>
						<base-button
							design="danger text"
							type="button"
							@click.prevent="remove"
						>
							Löschen
						</base-button>
					</template>
					<template v-slot:primary>
						<base-button design="primary" type="submit" @click.prevent="patch">
							Speichern
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
	head() {
		return {
			title: `${(this.news || {}).title || "News"} bearbeiten`,
		};
	},
	async asyncData({ store, params }) {
		return {
			news: await store.dispatch("news/get", params.id),
		};
	},
};
</script>
