<template>
	<BaseCard v-bind="$props">
		<template v-slot:header-in>
			{{ category }}
		</template>

		<template v-if="picture" v-slot:topContainer
			><div class="inner-card" :style="background_style"></div
		></template>
		<template v-slot:bottomContainer>
			<h2 class="time">{{ dayjs(createdAt).fromNow() }} von {{ createdBy }}</h2>
			<h3 class="headline">{{ headline }}</h3>
			<p class="news-content"><slot /></p>
		</template>
		<template v-slot:footer>
			<div v-if="eventDate">
				<hr class="line" />
				<base-icon
					source="material"
					icon="event"
					fill="var(--color-gray-dark)"
				/>
				<div class="event-date">
					{{ dayjs(eventDate).format("DD.MM.YYYY") }} um
					{{ dayjs(eventDate).format("H") }} Uhr
				</div>
			</div>
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
		picture: { type: String, default: "" },
		eventDate: { type: String, default: "" },
		color: {
			type: Array,
			default: () => ["#412363", "#c63e80"],
		},
		isLandscape: {
			type: Boolean,
		},
	},
	data() {
		return {
			dayjs,
		};
	},
	computed: {
		background_style() {
			return (
				"background-image: linear-gradient(to left, rgba(245, 246, 252, 0.0), " +
				this.color[0] +
				"),url(" +
				this.picture +
				");"
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
@import "@mixins/multiline-ellipsis.scss";

.time {
	margin: 0;
	font-size: var(--text-xs);
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
	display: inline-block;
	width: 100%;
	font-size: var(--text-sm);
	color: var(--color-black);

	@include multiLineEllipsis(
		$lineHeight: 1.2em,
		$lineCount: 3,
		$bgColor: white
	);
}
.inner-card {
	display: block;
	height: 100%;
	background-size: 100%;
	border-radius: var(--radius-sm) var(--radius-sm);
}
.event-date {
	display: inline;
	font-size: var(--text-xs);
	color: var(--color-gray-dark);
}
.line {
	height: 1px;
	background: var(--color-gray);
	border: 0;
}
</style>
