<template>
	<base-card v-bind="$attrs">
		<div class="content-card">
			<template v:slot:content>
				<div class="content">
					<base-link :href="url" target="_blank" :no-style="true">
						<div class="content__img">
							<div class="img-container">
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
						<div class="content__title">{{ title }}</div>
					</base-link>
					<div class="content__description">{{ description }}</div>
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
								icon="add_circle_outline"
							/>
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
	},
};
</script>

<style lang="scss" scoped>
@import "@utils/multiline-ellipsis.scss";

.content-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 23rem;
}
.img-container {
	position: relative;
	min-height: 200px;
}
.content {
	display: flex;
	flex-direction: column;
	height: 100%;
	&__img {
		min-height: 200px;
		&-thumbnail {
			width: 100%;
			height: 200px;
			object-fit: cover;
			border-radius: var(--radius-sm) var(--radius-sm) 0 0;
		}
		&-icon {
			position: absolute;
			top: 40%;
			left: 40%;
			padding: var(--space-xs);
			font-size: var(--heading-1);
			color: var(--color-gray-dark);
			background-color: var(--color-white);
			border-radius: var(--radius-round);
			opacity: 0.8;
		}
	}
	&__title {
		min-height: 2.5rem;
		margin: var(--space-xs) var(--space-sm) var(--space-xs-3) var(--space-sm);
		font-weight: var(--font-weight-bold);
		color: var(--color-tertiary);
		text-align: center;

		@include excerpt(
			$font-size: 20px,
			$line-height: var(--line-height-sm),
			$lines-to-show: 2
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
		padding: var(--space-xs-3);

		&-icon {
			font-size: var(--text-lg);
			color: var(--color-tertiary);
		}
	}
}
</style>
