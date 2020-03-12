<template>
	<div class="resource">
		<div class="content">
			<div class="icons">
				<base-button design="icon" @click="goBack">
					<base-icon source="material" icon="close" />
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
			<div class="actions">
				<base-button design="text icon">
					<base-icon source="material" icon="more_vert" />
				</base-button>
			</div>
			<h1 class="h5">{{ resource.title || resource.name }}</h1>
			<div>
				<span v-if="author">
					{{ author }} ({{ $t("pages.content._id.metadata.author") }})
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
					<base-icon source="custom" icon="calender" />

					<span v-if="createdAt">
						{{ $t("pages.content._id.metadata.createdAt") }}
						{{ createdAt }}
					</span>
					<span v-if="updatedAt">
						{{ $t("pages.content._id.metadata.updatedAt") }}
						{{ updatedAt }}
					</span>
				</div>
				<div v-if="filename" class="meta-container">
					<base-icon
						:source="getTypeIcon(resource.mimetype).iconSource"
						:icon="getTypeIcon(resource.mimetype).icon"
					/>
					<span>
						{{ filename }}
					</span>
				</div>
				<div class="meta-container">
					<base-icon source="fa" icon="file-o" />
					<span>
						{{ id }}
					</span>
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
	async asyncData({ store, params }) {
		const resource = await store.dispatch(
			"content/getResourceMetadata",
			params.id
		);

		return {
			id: params.id,
			resource,
		};
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
	grid-template-areas: "content" "meta";
	grid-template-rows: auto;
	grid-template-columns: auto;
	min-height: 100vh;

	@include breakpoint(tablet) {
		grid-template-areas: "content meta";
		grid-template-columns: 3fr 2fr;
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
		}

		.preview {
			position: relative;
			height: 100%;

			.preview-background {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: var(--layer-behind);
				margin: var(--radius-md);
				filter: blur(var(--radius-md));
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				opacity: 0.7;
			}

			img {
				object-position: center;
				object-fit: contain;
				width: 100%;
				height: 100%;
				min-height: 50vh;

				@include breakpoint(tablet) {
					min-height: auto;
				}
			}
		}
	}

	.sidebar {
		grid-area: meta;
		padding: var(--space-sm) var(--space-xl);
		background-color: var(--color-white);

		.actions {
			display: flex;
			justify-content: flex-end;
		}

		.description {
			margin: var(--space-xl) 0;
		}
	}
}
</style>
