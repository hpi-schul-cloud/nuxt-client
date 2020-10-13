<template>
	<base-card class="mt--md news-card">
		<template v-slot:header>
			<div :style="{ backgroundColor: article.color }">
				<div class="news-card__heading">
					<h4 style="margin: 0">{{ article.title }}</h4>
				</div>
			</div>
		</template>
		<template v-slot:default>
			<div class="news-card__content">
				<span>{{ dayjs(article.createdAt).fromNow() }}</span>
				<div class="mt--md">
					<BaseLink :to="{ name: 'news-id', params: { id: article._id } }">
						Weiterlesen
					</BaseLink>
				</div>
			</div>
		</template>
	</base-card>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/de";
dayjs.locale("de");

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
			dayjs,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.news-card {
	padding: 0 !important;
	&__heading {
		padding: var(--space-md);
		h4 {
			color: var(--color-white);
			text-shadow: 1px 0 5px rgba(0, 0, 0, 0.6);
		}
	}
	&__content {
		padding: var(--space-md);
	}
}
</style>
