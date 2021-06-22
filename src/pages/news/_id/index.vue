<template>
	<div>
		<div v-if="current">
			<section class="section">
				<base-breadcrumb
					:inputs="[
						{
							to: { name: 'news' },
							text: 'News',
						},
						{
							to: { name: 'news-id', params: { id: current._id } },
							text: current.title,
						},
					]"
				/>
				<div class="text-sm">
					{{ fromNow(current.displayAt) }} von {{ current.creator.firstName }}
					{{ current.creator.lastName }}
				</div>
				<h1>{{ current.title }}</h1>

				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="current.content"></div>
				<base-button :to="{ name: 'news-id-edit' }">
					<base-icon source="material" icon="edit" />
					{{ $t("pages.news._id.index.edit") }}
				</base-button>
			</section>
		</div>
	</div>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import { mapGetters } from "vuex";

export default {
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	async asyncData({ store, params }) {
		store.dispatch("news/get", params.id);
	},
	data() {
		return {
			fromNow,
		};
	},
	computed: {
		...mapGetters("news", {
			current: "getCurrent",
		}),
	},
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
};
</script>
