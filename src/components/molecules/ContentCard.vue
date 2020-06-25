<template>
	<base-card v-bind="$attrs">
		<div class="content-card">
			<base-link
				class="title-link"
				:to="{
					name: 'content-id',
					params: { id: resource.ref.id },
					query: { course: $route.query.course, topic: $route.query.topic },
				}"
				:no-style="true"
			>
				<template v:slot:content>
					<div class="content">
						<div class="content__img">
							<div class="img-container">
								<div class="content__img-background-gradient" />

								<img
									:src="resource.preview.url"
									alt="content-thumbnail"
									class="content__img-thumbnail"
								/>
								<base-icon
									:source="getTypeIcon(resource.mimetype).iconSource"
									:icon="getTypeIcon(resource.mimetype).iconLarge"
									class="content__img-icon"
								/>
							</div>
						</div>
						<h6 class="content__title">{{ resource.name }}</h6>
					</div>
				</template>
			</base-link>
			<template v:slot:footer>
				<div class="footer">
					<div class="footer__separator"></div>
					<div class="footer__content">
						<div class="footer__icon-container">
							<add-content-button
								:resource="resource"
								btn-design="text icon"
								btn-icon-class="footer__content-icon"
								btn-icon="add_circle_outline"
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
import AddContentButton from "@components/molecules/AddContentButton";
import contentMeta from "@mixins/contentMeta";

export default {
	components: {
		BaseLink,
		AddContentButton,
	},
	mixins: [contentMeta],
	props: {
		client: { type: String, default: "Schul-Cloud" },
		resource: { type: Object, default: () => {} },
	},
	data() {
		return {
			isChecked: false,
			menuActive: false,
			isBookmarked: false,
			copyModalActive: false,
			actions: [
				{
					event: "share",
					text: this.$t("components.molecules.ContentCardMenu.action.share"),
					icon: "share",
				},
				{
					event: "delete",
					text: this.$t("components.molecules.ContentCardMenu.action.delete"),
					icon: "delete_outline",
				},
				{
					event: "report",
					text: this.$t("components.molecules.ContentCardMenu.action.report"),
					icon: "report",
				},
			],
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
		checkboxIconSelector() {
			return this.isChecked ? "check_box" : "check_box_outline_blank";
		},
		bookmarkIconSelector() {
			return this.isBookmarked ? "bookmark" : "bookmark_border";
		},
	},
	methods: {
		checkboxHandler() {
			this.isChecked = !this.isChecked;
		},
		bookmarkHandler() {
			this.isBookmarked = !this.isBookmarked;
		},
		openMenu() {
			this.menuActive = true;
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
	height: 200px;
	color: var(--color-white);
	background-color: var(--color-black);
	border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.content {
	display: flex;
	flex-direction: column;
	min-height: 300px;
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
			font-size: var(--space-xl-3);
			border-radius: var(--radius-round);
			box-shadow: var(--shadow-m);
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
		margin: 0 var(--space-xs-4);
		border-top: 1px solid var(--color-gray);
	}
	&__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		padding: var(--space-xs-4) 0;

		&-icon {
			font-size: var(--text-lg);
			color: var(--color-tertiary);
		}
	}
	&_more {
		position: relative;
	}
	&__icon-container {
		position: relative;
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}
}

.title-link {
	border: none;
}
</style>
