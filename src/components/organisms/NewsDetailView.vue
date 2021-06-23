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
							to: { name: 'news-id', params: { id: current.id } },
							text: current.title,
						},
					]"
				/>
				<div class="text-sm">
					{{ fromNow(current.displayAt) }} von {{ current.creator.firstName }}
					{{ current.creator.lastName }}
				</div>
				<h1>{{ current.title }}</h1>

				<!-- eslint-disable-next-line vue/no-v-html  -->
				<div v-html="current.content"></div>
				<base-button class="edit-btn" :to="{ name: 'news-id-edit' }">
					<base-icon source="material" icon="edit" />
					{{ $t("pages.news._id.index.edit") }}
				</base-button>
			</section>
		</div>
	</div>
</template>

<script>
import { fromNow } from "@plugins/datetime";

export default {
	props: {
		current: {
			type: Object,
			required: true,
		},
	},
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	data() {
		return {
			fromNow,
		};
	},
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
};
</script>
