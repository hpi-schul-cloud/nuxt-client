<template>
	<BaseCard :color="color">
		<template v-slot:header-in>
			{{ category }}
		</template>
		<template
			><div class="content" :style="background_style"></div
		></template>
		<template v-slot:footer>
			<h2 class="time">{{ dayjs(createdAt).fromNow() }} </h2>
			<h3 class="headline">{{ headline }}</h3>
			<p class="news-content"><slot /></p>
		</template>
	</BaseCard>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	props: {
		category: { type: String, required: true },
		headline: { type: String, required: true },
		createdAt: { type: String, required: true },
		createdBy: { type: String, required: true },
		color: {
			type: Array,
			default: () => ["#412363", "#c63e80"],
		},
	},
	data() {
		return {
			dayjs,
		};
	},
	computed: {
		//TODO change image link when we know which image should be used.
		background_style() {
			return (
				"background-image: linear-gradient(to left, rgba(245, 246, 252, 0.0), " +
				this.color[0] +
				"),url(https://source.unsplash.com/daily);"
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.time {
	margin: var(--space-xxs) 0 var(--space-xxxs) 0;
	font-size: var(--text-sm);
	font-weight: var(--font-weight-light);
	color: var(--color-gray);
}

.headline {
	margin: 0;
	font-size: var(--heading-4);
	line-height: var(--line-height-sm);
	color: var(--color-black);
}
.news-content {
	display: -webkit-box;
	max-height: 150px;
	overflow: hidden;
	font-size: var(--text-sm);
	color: var(--color-black);
	text-overflow: ellipsis;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
}
.content {
	display: block;
	height: 100%;
	background-size: 100%;
}
</style>
