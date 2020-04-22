<!-- eslint-disable max-lines -->

<template>
	<div class="resource">
		<div class="content">
			<div class="icons">
				<base-button class="icon" design="icon" @click="goBack">
					<base-icon source="material" icon="close" class="icon-svg" />
				</base-button>
				<!--
				<base-button design="icon" @click="bookmarkHandler">
					<base-icon
						class="resource__img-container--icon"
						source="material"
						:icon="bookmarkIconSelector"
					/>
				</base-button>
				-->
			</div>
			<div class="preview">
				<div class="preview-background-color" />
				<div
					class="preview-background"
					:style="{
						backgroundImage: `url(${resource.preview.url})`,
					}"
				/>
				<img :src="resource.preview.url" alt="content preview image" />
			</div>
		</div>
		<div class="sidebar">
			<div class="content-container">
				<div class="actions">
					<!-- <base-button v-if="!isMobile" design="text icon">
						<base-icon source="material" icon="more_vert" />
					</base-button> -->
				</div>
				<div class="title">
					<span>
						{{ resource.title || resource.name }}
					</span>
					<!-- <base-button v-if="isMobile" design="text icon">
						<base-icon source="material" icon="more_vert" />
					</base-button> -->
				</div>
				<div class="author-provider">
					<span v-if="author">
						{{ author }} ({{ $t("pages.content._id.metadata.author") }}),
					</span>
					<span v-if="provider">
						{{ provider }} ({{ $t("pages.content._id.metadata.provider") }})
					</span>
				</div>
				<div class="description">
					{{ description }}
				</div>
				<div class="metadata">
					<div v-if="createdAt || updatedAt" class="meta-container">
						<div class="meta-icon">
							<base-icon source="custom" icon="calender" />
						</div>

						<div class="meta-text">
							<div v-if="createdAt">
								{{ $t("pages.content._id.metadata.createdAt") }}
								{{ createdAt }}
							</div>
							<div v-if="updatedAt">
								{{ $t("pages.content._id.metadata.updatedAt") }}
								{{ updatedAt }}
							</div>
						</div>
					</div>
					<div v-if="filename" class="meta-container">
						<div class="meta-icon">
							<base-icon
								:source="getTypeIcon(resource.mimetype).iconSource"
								:icon="getTypeIcon(resource.mimetype).icon"
							/>
						</div>
						<div class="meta-text">
							{{ filename }}
						</div>
					</div>
					<div class="meta-container">
						<div class="meta-icon">
							<base-icon source="fa" icon="file-o" />
						</div>
						<div class="meta-text">
							{{ resource.ref.id }}
						</div>
					</div>
				</div>
			</div>
			<base-button design="primary" class="floating-button">
				<base-icon source="material" icon="add" />
				{{ $t("pages.content._id.addToTopic") }}
			</base-button>
		</div>
	</div>
</template>

<script>
import dayjs from "dayjs";
import contentMeta from "@mixins/contentMeta";

const getMetadataAttribute = (properties, key) => {
	if (Array.isArray(properties[key])) {
		return properties[key][0];
	}
	return null;
};

export default {
	layout: "loggedInFull",
	mixins: [contentMeta],
	props: {
		resource: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			dayjs,
			isBookmarked: false,
			menuActive: false,
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
		bookmarkIconSelector() {
			return this.isBookmarked ? "bookmark" : "bookmark_border";
		},
		provider() {
			return getMetadataAttribute(
				this.resource.properties,
				"ccm:metadatacontributer_provider"
			);
		},
		author() {
			return getMetadataAttribute(this.resource.properties, "cm:creator");
		},
		createdAt() {
			return dayjs(
				getMetadataAttribute(this.resource.properties, "cm:created")
			);
		},
		updatedAt() {
			return dayjs(
				getMetadataAttribute(this.resource.properties, "cm:modified")
			);
		},
		type() {
			return this.getTypeI18nName(this.resource.mimetype);
		},
		description() {
			return this.resource.description;
		},
		filename() {
			return this.resource.filename;
		},
		// isMobile() {
		// 	return this.$mq === "mobile" || this.$mq === "tablet";
		// },
	},
	methods: {
		bookmarkHandler() {
			this.isBookmarked = !this.isBookmarked;
		},
		goBack() {
			this.$router.back();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.resource {
	display: grid;
	grid-template-areas: "content meta";
	grid-template-rows: auto;
	grid-template-columns: auto 40%;
	min-width: 100vw;
	min-height: 100vh;
	box-shadow: var(--shadow-md);

	@media (max-width: 768px) {
		grid-template-areas:
			"content"
			"meta";
		grid-template-columns: auto;
	}

	.content {
		position: relative;
		grid-area: content;

		.icons {
			position: absolute;
			top: 0;
			z-index: var(--layer-dropdown);
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: var(--space-md);

			.icon {
				padding: var(--space-xs-4);
				font-size: var(--heading-4);
				color: var(--color-white);
				/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
				background-color: rgba(68, 68, 68, 0.6);
				border-radius: var(--radius-round);
			}
		}

		.preview {
			position: relative;
			height: 100%;

			.preview-background-color {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: var(--layer-behind);
				width: 100%;
				height: 100%;
				background-color: var(--color-tertiary);
			}

			.preview-background {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: var(--layer-page);
				filter: blur(0.7rem);
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				opacity: 0.3;
			}

			img {
				position: absolute;
				z-index: var(--layer-page);
				object-position: center;
				object-fit: contain;
				width: 100%;
				height: 100%;

				@include breakpoint(tablet) {
					min-height: auto;
				}
			}
		}
	}

	.sidebar {
		position: relative;
		z-index: var(--layer-dropdown);
		display: flex;
		flex-direction: column;
		grid-area: meta;
		align-items: center;
		justify-content: space-between;
		max-height: 100vh;
		padding-bottom: var(--space-xl);
		overflow-y: scroll;
		background-color: var(--color-white);
		box-shadow: -8px 0 17px -7px rgba(0, 0, 0, 0.75);

		.content-container {
			width: 80%;
		}

		.actions {
			display: flex;
			justify-content: flex-end;
		}

		.title {
			display: flex;
			justify-content: space-between;
			margin: var(--space-lg) 0 var(--space-sm) 0;
			font-size: var(--heading-5);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-md);
		}

		.author-provider {
			font-size: var(--text-xs);
			font-weight: var(--font-weight-bold);
		}

		.description {
			margin: var(--space-xl-2) 0;
			font-size: var(--text-md);
		}

		.metadata {
			display: flex;
			flex-direction: column;
			font-size: var(--text-xs);

			.meta-container {
				display: flex;
				align-items: flex-start;
				margin-bottom: var(--space-lg);
				.meta-icon {
					margin-right: var(--space-md);
					font-size: var(--text-md);
				}
			}
		}

		.floating-button {
			position: sticky;
			bottom: 0;
			z-index: var(--layer-fab);
			padding: var(--space-xs);
			cursor: pointer;
			border-radius: var(--radius-md);
			box-shadow: var(--shadow-md);
		}
	}
}
</style>
