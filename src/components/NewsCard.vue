<template>
	<base-link class="outer-card" :to="{ name: 'news-id', params: { id: id } }">
		<BaseCard v-bind="$props">
			<template v-slot:header-in>
				{{ category }}
			</template>
			<template v-if="picture" v-slot:topContent>
				<div class="inner-card">
					<div class="overlay" :style="backgroundStyle"> </div>
					<img :src="picture" />
				</div>
			</template>
			<template v-slot:bottomContainer>
				<h2 class="time"
					>{{ dayjs(createdAt).fromNow() }} von {{ createdBy }}</h2
				>
				<h3 class="title">{{ title }}</h3>
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
	</base-link>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/de";
dayjs.locale("de");
export default {
	props: {
		id: { type: String, required: true },
		category: { type: String, required: true },
		title: { type: String, required: true },
		createdAt: {
			type: String,
			required: true,
			validator: (value) => {
				return !value || !!Date.parse(value);
			},
		},
		createdBy: { type: String, required: true },
		picture: { type: String, default: "" },
		eventDate: {
			type: String,
			default: "",
			validator: (value) => {
				return !value || !!Date.parse(value);
			},
		},
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
		backgroundStyle() {
			return (
				"background-image: linear-gradient(to left, rgba(245, 246, 252, 0.0) 0%, " +
				this.color[0] +
				" 70%);"
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
@import "@mixins/multiline-ellipsis.scss";
.outer-card {
	width: 100%;
}
.time {
	margin: 0;
	font-size: var(--text-xs);
	font-weight: var(--font-weight-light);
	color: var(--color-gray);
}
.title {
	overflow: hidden;
	font-size: var(--heading-4);
	font-weight: var(--font-weight-bold);
	line-height: var(--line-height-sm);
	color: var(--color-black);
	text-overflow: ellipsis;
	white-space: nowrap;
}
.news-content {
	display: inline-block;
	width: 100%;
	margin: 0;
	font-size: var(--text-sm);
	color: var(--color-black);

	@include excerpt(
		$font-size: var(--text-sm),
		$line-height: var(--line-height-md),
		$lines-to-show: 3,
		$excerpt-bg: var(--color-white)
	);
}
.inner-card {
	position: relative;
	display: block;
	height: 100%;
	overflow: hidden;
	background-size: 100%;
	border-radius: var(--radius-sm) var(--radius-sm);
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	img {
		position: absolute;
		top: 0;
		right: 0;
		z-index: var(--layer-behind);
		width: 80%;
		height: 100%;
		object-fit: cover;
	}
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
