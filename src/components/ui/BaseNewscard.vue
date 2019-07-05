<template>
	<BaseCard :color="color">
		<template v-slot:header-in>
			{{ category }}
		</template>

		<div>
			<h3 class="time">Heute 10:15</h3>
			<h2 class="headline">{{ headline }}</h2>
		</div>
		<template v-slot:footer>
			<h2 class="time"
				>vor 17 Tagen von ... gepostet
				<!-- TODO automate Posted ... days ago --></h2
			>
			<h3 class="headline">{{ headline }}</h3>
			<p class="news-content"><slot /></p>
		</template>
	</BaseCard>
</template>

<script>
export default {
	props: {
		category: { type: String, required: true },
		headline: { type: String, required: true },
		color: {
			type: Array,
			default: () => ["#412363", "#c63e80"],
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.time {
	margin: 0 0 var(--space-xxxs) 0;
	font-size: var(--text-sm);
	color: var(--color-black);
}

.headline {
	margin: 0;
	font-size: var(--heading-4);
	line-height: var(--line-height-sm);
	color: var(--color-black);
}
.news-content {
	overflow: wrap;
	font-size: var(--text-sm);
	color: var(--color-black);
}
</style>
