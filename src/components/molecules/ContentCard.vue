<template>
	<base-card v-bind="$attrs">
		<div class="content-card">
			<template v:slot:content>
				<div class="content">
					<div class="content__img">
						<div class="img-container">
							<base-icon
								class="content__img-checkbox"
								source="material"
								:icon="checkboxSelector"
								@click="checkboxHandler"
							/>

							<div class="content__img-background-gradient" />

							<img
								:src="thumbnail"
								alt="content-thumbnail"
								class="content__img-thumbnail"
							/>

							<base-icon
								class="content__img-icon"
								source="material"
								icon="photo"
							/>
						</div>
					</div>
					<base-link :href="url" target="_blank" :no-style="true">
						<h6 class="content__title">{{ title }}</h6>
					</base-link>
				</div>
			</template>
			<template v:slot:footer>
				<div class="footer">
					<div class="footer__separator"></div>
					<div class="footer__content">
						<base-icon
							class="footer__content-icon"
							source="material"
							icon="bookmark_border"
						/>

						<div>
							<base-icon
								class="footer__content-icon"
								source="material"
								icon="more_vert"
							/>
						</div>
					</div>
				</div>
			</template>
		</div>
	</base-card>
</template>

<script>
import BaseLink from "@components/base/BaseLink";

export default {
	components: {
		BaseLink,
	},
	props: {
		id: { type: String, default: "" },
		description: { type: [String, Array], default: "" },
		licenses: { type: Array, default: () => [] },
		mimeType: { type: String, default: "" },
		originId: { type: String, default: "" },
		providerName: { type: String, default: "" },
		tags: { type: Array, default: () => [] },
		thumbnail: { type: String, default: "" },
		title: { type: String, default: "" },
		url: { type: String, default: "" },
	},
	data() {
		return {
			isChecked: false,
		};
	},
	computed: {
		reportMail() {
			const mailContent = {
				subject: this.$t("components.molecules.ContentCard.report.subject"),
				body: this.$t("components.molecules.ContentCard.report.body"),
			};
			const querystring = Object.keys(mailContent)
				.map((key) => key + "=" + encodeURIComponent(mailContent[key]))
				.join("&");
			const email = this.$t("components.molecules.ContentCard.report.email");
			return `mailto:${email}?${querystring}`;
		},
		checkboxSelector() {
			return this.isChecked ? "check_box" : "check_box_outline_blank";
		},
	},
	methods: {
		checkboxHandler() {
			this.isChecked = !this.isChecked;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@utils/multiline-ellipsis.scss";

.content-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.img-container {
	position: relative;
	min-height: 200px;
}
.content {
	display: flex;
	flex-direction: column;
	&__img {
		&-thumbnail {
			width: 100%;
			height: 200px;
			background-color: var(--color-black);
			border-radius: var(--radius-md) var(--radius-md) 0 0;
			opacity: 0.8;
			object-fit: cover;
		}
		&-background-gradient {
			position: absolute;
			z-index: var(--layer-page);
			width: 100%;
			height: 50%;
			background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
			border-radius: var(--radius-md) var(--radius-md) 0 0;
			opacity: 0.8;
		}
		&-icon {
			position: absolute;
			top: 40%;
			left: 40%;
			z-index: var(--layer-dropdown);
			padding: var(--space-xs);
			font-size: var(--heading-1);
			color: var(--color-gray-dark);
			background-color: var(--color-white);
			border-radius: var(--radius-round);
			opacity: 0.8;
		}
		&-checkbox {
			position: absolute;
			top: 5%;
			left: 90%;
			z-index: var(--layer-dropdown);
			color: var(--color-white);
			cursor: pointer;
		}
	}
	&__title {
		min-height: 62px;
		margin: var(--space-xs) var(--space-sm);
		color: var(--color-tertiary);

		@include excerpt(
			$font-size: var(--heading-6),
			$line-height: var(--line-height-sm),
			$lines-to-show: 3
		);
	}
	&__description {
		padding: 0 var(--space-xs);
		margin-bottom: var(--space-xs);

		@include excerpt(
			$font-size: var(--text-sm),
			$lines-to-show: 3,
			$line-height: 1.2rem
		);
	}
}
.footer {
	display: flex;
	flex-direction: column;
	height: 13%;
	padding: 0 var(--space-xs);
	&__separator {
		border-top: 1px solid var(--color-gray);
	}
	&__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		padding: var(--space-xs-2);

		&-icon {
			font-size: var(--text-lg);
			color: var(--color-tertiary);
		}
	}
}
</style>
