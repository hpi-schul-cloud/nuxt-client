<template>
	<base-card v-bind="$attrs">
		<div class="content-card">
			<template v:slot:content>
				<div class="content">
					<base-link :href="url" target="_blank" :no-style="true">
						<img
							:src="thumbnail"
							alt="content-thumbnail"
							class="content__thumbnail"
						/>
						<div class="content__title">{{ title }}</div>
					</base-link>
					<div class="content__tags">
						<span v-for="(tag, i) in tags" :key="i" class="content__tags-tag">
							{{ tag }}
						</span>
					</div>
					<div class="content__description">{{ description }}</div>
				</div>
			</template>
			<template v:slot:footer>
				<div class="footer">
					<div class="footer__melden">
						<a :href="reportMail" target="_blank" rel="noopener">
							melden <i class="fa fa-flag foo" aria-hidden="true"></i>
						</a>
					</div>
					<div class="footer__info">
						<div> via {{ providerName }} </div>
						<div>
							<i class="fa fa-plus-square"></i>
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
				subject: this.$t("components.organisms.ContentCard.report.subject"),
				body: this.$t("components.organisms.ContentCard.report.body"),
			};
			const querystring = Object.keys(mailContent)
				.map((key) => key + "=" + encodeURIComponent(mailContent[key]))
				.join("&");
			const email = this.$t("components.organisms.ContentCard.report.email");
			return `mailto:${email}?${querystring}`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles-default/utility/multiline-ellipsis";

.content-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 600px;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 100%;
	&__thumbnail {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}
	&__title {
		display: flex;
		margin: var(--space-xs) 0;
		font-weight: var(--font-weight-bold);
		color: var(--color-secondary);

		@include excerpt(
			$font-size: var(--heading-6),
			$line-height: var(--line-height-sm),
			$lines-to-show: 2
		);
	}
	&__tags {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin: var(--space-xs) 0;
		&-tag {
			padding: var(--space-xs-4);
			margin: var(--space-xs-4);
			font-size: var(--text-xs);
			font-weight: var(--font-weight-bold);
			color: var(--color-white);
			background-color: var(--color-tertiary-light);
			border: 1px solid var(--color-tertiary-light);
			border-radius: var(--radius-md);
		}
	}
	&__description {
		@include excerpt($font-size: var(--text-md), $lines-to-show: 5);
	}
}
.footer {
	display: flex;
	flex-direction: column;
	width: 100%;
	&__melden {
		align-self: flex-end;
		font-size: var(--text-md);
		a {
			color: var(--color-gray);
			text-decoration: none;
		}
	}
	&__info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-gray);
		i {
			color: var(--color-secondary);
		}
	}
}
</style>
