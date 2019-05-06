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
import BaseCard from "@basecomponents/BaseCard";

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
	margin: 0 0 6px;
	font-size: 16px;
	color: #fff;
}

.headline {
	margin: 0;
	font-size: 26px;
	line-height: 1em;
	color: #fff;
}
</style>
