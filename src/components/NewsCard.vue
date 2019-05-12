<template>
	<base-card class="mt-2 news-card">
		<div slot="header" :style="{ backgroundColor: article.color }">
			<div class="news-card__heading">
				<h4 class="mb-0 mt-0">{{ article.title }}</h4>
			</div>
		</div>
		<div class="news-card__content">
			<span>{{ moment(article.createdAt).fromNow() }}</span>
			<div class="mt-2">
				<BaseLink :to="{ name: 'news-id', params: { id: article._id } }"
					>Weiterlesen</BaseLink
				>
			</div>
		</div>
	</base-card>
</template>

<script>
var moment = require("moment");

export default {
	props: {
		article: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			moment,
		};
	},
};
</script>

<style lang="scss">
@import "@variables";

.news-card {
	padding: 0 !important;
	&__heading {
		padding: $size-padding;
		h4 {
			color: var(--color-white);
			text-shadow: 1px 0 5px rgba(0, 0, 0, 0.6);
		}
	}
	&__content {
		padding: $size-padding;
	}
}
</style>
