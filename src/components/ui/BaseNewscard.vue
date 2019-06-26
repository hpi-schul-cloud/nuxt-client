<template>
	<BaseCard :color="news.color">
		<template v-slot:header-in>
			{{ news.category }}
		</template>

		<div>
			<h3 class="time">Heute 10:15</h3>
			<h2 class="headline">{{ news.headline }}</h2>
		</div>
	</BaseCard>
</template>

<script>
export default {
	props: {
		news: {
			type: Object,
			default: () => ({
				category: "News Bildende Kunst",
				headline: "Headline lorem ipsum dolor",
				color: ["#412363", "#c63e80"],
			}),
		},

		course: {
			type: Object,
			default: () => ({
				newAssignments: 0,
				name: "default name",
				alert: "Default Alert!",
				notification: 0,
			}),
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.time {
	margin: 0 0 var(--space-xxxs) 0;
	font-size: var(--text-base-size);
	color: var(--color-white);
}

.headline {
	margin: 0;
	font-size: var(--heading-4);
	line-height: var(--line-height-sm);
	color: var(--color-white);
}
</style>
