<template>
	<base-card v-bind="$attrs">
		<div class="content-card">
			<template v:slot:content>
				<div class="content">
					<div class="content__img">
						<div class="img-container">
							<base-button
								design="none"
								class="content__img-checkbox"
								@click="checkboxHandler"
							>
								<base-icon source="material" :icon="checkboxIconSelector" />
							</base-button>

							<div class="content__img-background-gradient" />

							<img
								:src="thumbnail"
								alt="content-thumbnail"
								class="content__img-thumbnail"
							/>

							<img class="content__img-icon" src="@assets/icons/ic_image.svg" />
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
						<base-button design="text icon" @click="bookmarkHandler">
							<base-icon
								class="footer__content-icon"
								source="material"
								:icon="bookmarkIconSelector"
							/>
						</base-button>

						<div class="footer__icon-container">
							<div class="footer_more">
								<base-button design="text icon" @click="openMenu">
									<base-icon
										class="footer__content-icon"
										source="material"
										icon="more_vert"
									/>
								</base-button>
								<context-menu
									:show.sync="menuActive"
									anchor="bottom-right"
									:actions="actions"
									@copy="handleCopy"
									@share="handleShare"
									@delete="handleDelete"
									@report="handleReport"
								/>
							</div>
						</div>
						<add-content-modal :show-copy-modal.sync="copyModalActive" />
					</div>
				</div>
			</template>
		</div>
	</base-card>
</template>

<script>
import BaseLink from "@components/base/BaseLink";
import ContextMenu from "@components/molecules/ContextMenu";
import AddContentModal from "@components/molecules/AddContentModal";

export default {
	components: {
		BaseLink,
		ContextMenu,
		AddContentModal,
	},
	props: {
		id: { type: String, default: "" },
		thumbnail: { type: String, default: "" },
		title: { type: String, default: "" },
		url: { type: String, default: "" },
	},
	data() {
		return {
			isChecked: false,
			menuActive: false,
			isBookmarked: false,
			copyModalActive: false,
			actions: [
				{
					event: "copy",
					text: this.$t("components.molecules.ContentCardMenu.action.copy"),
					icon: "file_copy",
				},
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
		handleCopy() {
			this.copyModalActive = true;
			this.$store.dispatch("courses/find");
		},
		handleShare() {},
		handleDelete() {},
		handleReport() {},
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
			width: 3.5rem;
			padding: var(--space-sm);
			color: var(--color-gray-dark);
			background-color: var(--color-white);
			border-radius: var(--radius-round);
			opacity: 0.6;
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
</style>
