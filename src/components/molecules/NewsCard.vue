<template>
	<base-link :to="{ name: 'news-id', params: { id: id } }">
		<BaseCard v-bind="$props" :class="{ 'landscape-mode': isLandscape }">
			<template v:slot:header>
				<div v-if="category" class="header">
					<div
						:class="
							!isLandscape ? 'header__tab' : 'header__tab landscape-mode__tab'
						"
						:style="tabBackground"
					>
						<div class="header__tab-content">
							{{ category }}
						</div>
					</div>
				</div>
			</template>

			<template v:slot:content>
				<div :class="{ 'landscape-mode__content': isLandscape }">
					<template v-if="picture">
						<div
							:class="
								!isLandscape
									? 'content__picture'
									: 'content__picture landscape-mode__content-picture'
							"
						>
							<img :src="picture" role="presentation" />
							<div
								class="content__picture-overlay"
								:style="overlayBackground"
							></div>
						</div>
					</template>
					<div
						:class="
							!isLandscape
								? 'content__text'
								: 'content__text landscape-mode__content-text'
						"
					>
						<p class="content__text-info"
							>{{ dayjs(createdAt).fromNow() }} von {{ createdBy }}</p
						>
						<p class="content__text-title">{{ title }}</p>
						<p class="content__text-content">
							<slot>
								{{ content }}
							</slot>
						</p>
					</div>
				</div>
			</template>

			<template v-slot:footer>
				<div v-if="eventDate" class="footer">
					<hr class="footer__line" />
					<base-icon
						source="material"
						icon="event"
						fill="var(--color-gray-dark)"
					/>
					<div class="footer__event-date">
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
		category: { type: String, default: undefined },
		title: { type: String, required: true },
		content: { type: String, required: true },
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
			type: String,
			default: "#412363",
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
		overlayBackground() {
			return `background-image: linear-gradient(to left, rgba(245, 246, 252, 0.0) 0%, ${this.color} 70%);`;
		},
		tabBackground() {
			return `background-color: ${this.color};`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@mixins/multiline-ellipsis.scss";

.header {
	display: flex;
	align-items: center;
	width: 100%;
	overflow: hidden;
	border-top-left-radius: var(--radius-sm);
	&__tab {
		width: 50%;
		padding-left: var(--space-sm);
		overflow-x: hidden;
		border-top-right-radius: var(--radius-sm);
		transform: skewX(25deg);
		transform-origin: bottom;
		&::before {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			content: "";
			background: var(--color-black);
			opacity: 0.5;
		}
		&-content {
			width: 100%;
			padding: var(--space-xs-4) 0;
			font-size: var(--text-sm);
			color: var(--color-white);
			transform: skewX(-25deg);
			transform-origin: bottom left;
		}
	}
}
.content {
	width: 100%;
	height: 100%;
	&__picture {
		position: relative;
		height: 100%;
		border-radius: var(--radius-sm) var(--radius-sm);
		&-overlay {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: var(--layer-popover);
			width: 100%;
			height: 98%;
		}
		img {
			width: 100%;
			height: 11rem;
			object-fit: cover;
			border-radius: var(--radius-sm);
		}
	}
	&__text {
		&-info {
			padding-top: var(--space-xs);
			font-size: var(--text-sm);
			color: var(--color-gray-dark);
		}
		&-title {
			font-weight: var(--font-weight-bold);
			color: var(--color-black);

			@include excerpt(
				$font-size: var(--heading-4),
				$line-height: var(--line-height-sm),
				$lines-to-show: 1
			);
		}
		&-content {
			color: var(--color-black);

			@include excerpt(
				$font-size: var(--text-sm),
				$line-height: var(--line-height-lg),
				$lines-to-show: 3
			);
		}
	}
}

.footer {
	&__line {
		height: 1px;
		background: var(--color-gray);
		border: 0;
	}
	&__event-date {
		display: inline;
		font-size: var(--text-sm);
		color: var(--color-gray-dark);
	}
}

.landscape-mode {
	width: 100%;
	&__content {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		&-picture {
			flex: 0 1 33%;
			img {
				height: 8.2rem;
			}
		}
		&-text {
			flex: 1;
			margin-left: var(--space-sm);
		}
	}
	&__tab {
		width: 25%;
	}
}
</style>
