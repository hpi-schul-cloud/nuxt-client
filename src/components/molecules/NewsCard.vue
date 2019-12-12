<template>
	<base-link :to="{ name: 'news-id', params: { id: id } }" :no-underline="true">
		<base-card v-bind="$props" :class="{ 'landscape-mode': isLandscape }">
			<template v:slot:header>
				<div class="header">
					<card-tab
						:class="
							!isLandscape ? 'header__tab' : 'header__tab landscape-mode__tab'
						"
						:background-style="tabBackground"
					>
						<span v-if="category !== undefined">
							{{ category }}
						</span>
						<span v-else>
							{{ $t("components.molecules.NewsCard.tabDefault") }}
						</span>
					</card-tab>
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
						<h2 class="h4 content__text-title">{{ title }}</h2>
						<p class="content__text-content">
							<slot>
								{{ content | striphtml }}
							</slot>
						</p>
					</div>
				</div>
			</template>

			<template v:slot:footer>
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
		</base-card>
	</base-link>
</template>

<script>
import CardTab from "@components/atoms/CardTab";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	components: {
		CardTab,
	},
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
			default: "#671E41",
		},
		colorGradient: {
			type: String,
			default: "#CE126D",
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
			if (this.colorGradient) {
				return (
					"background-image: linear-gradient(-225deg, " +
					this.color +
					" 0%, " +
					this.colorGradient +
					" 100%);"
				);
			} else {
				return "background-color: " + this.color + ";";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles-default/utility/multiline-ellipsis";

.header {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 30px;
	overflow: hidden;
	border-top-left-radius: var(--radius-sm);
	&__tab {
		width: 80%;
	}
}
.content {
	width: 100%;
	height: 100%;
	&__picture {
		position: relative;
		height: 100%;
		overflow: hidden;
		border-radius: var(--radius-sm);
		&-overlay {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: var(--layer-page);
			width: 100%;
			height: 98%;
			border-radius: var(--radius-sm);
			border-top-left-radius: 0;
		}
		img {
			width: 100%;
			height: 8rem;
			border-radius: var(--radius-sm);
			object-fit: cover;
		}
	}
	&__text {
		&-info {
			padding: var(--space-xs) 0;
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-gray-dark);
		}
		&-title {
			margin: 0 !important;
		}
		&-content {
			margin: 0;
			color: var(--color-black);

			@include excerpt(
				$font-size: var(--text-sm),
				$line-height: 1.5rem,
				$lines-to-show: 5
			);
		}
	}
}

.header + * .content__picture {
	border-top-left-radius: 0;
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
			flex: 0 1 45%;
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
