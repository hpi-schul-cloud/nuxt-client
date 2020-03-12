<template>
	<div class="resource">
		<div class="header">
			<div class="header-content">
				<base-link href="#" class="back-link" @click="goBack">
					<base-icon source="material" icon="arrow_back" />
					<span>{{ $t("pages.content._id.header.back-navigation") }}</span>
				</base-link>
				<h1 class="h2">{{ resource.title || resource.name }}</h1>
				<div class="actions">
					<base-button design="hero-cta icon">
						<base-icon source="material" icon="file_copy" />
					</base-button>
					<!--
					<base-button design="icon outline">
						<base-icon
							source="material"
							icon="more_vert"
							@click="menuActive = !menuActive"
						/>
					</base-button>
					<context-menu
						:show.sync="menuActive"
						anchor="top-right"
						:actions="actions"
					/>
					-->
				</div>
			</div>
		</div>
		<base-content-container size="large">
			<div class="content" :class="description ? '' : 'no-description'">
				<div class="metadata">
					<div>
						<span v-if="type">{{ type }}</span>
						<span v-if="type && createdAt"> - </span>
						<span v-if="createdAt">
							{{ $t("pages.content._id.metadata.createdAt") }}
							{{ createdAt }}
						</span>
					</div>
					<div>
						<span v-if="author">
							{{ $t("pages.content._id.metadata.author") }}:
							{{ author }}
						</span>
						<span v-if="provider">
							{{ $t("pages.content._id.metadata.provider") }}:
							{{ provider }}
						</span>
					</div>
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
				<div class="description">
					{{ description }}
				</div>
			</div>
		</base-content-container>
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
		type() {
			return this.getTypeI18nName(this.resource.mimetype);
		},
		description() {
			return this.resource.description;
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

.header {
	position: relative;
	min-height: var(--space-xl-5);
	margin-bottom: var(--space-md);
	background-color: var(--color-white);

	&::after {
		position: absolute;
		top: 10px;
		z-index: var(--layer-behind);
		width: 100%;
		height: 100%;
		content: "";
		box-shadow: 0 0 10px var(--color-overlay);
	}

	.back-link {
		font-weight: var(--font-weight-bold);
		color: var(--color-tertiary);
		&:hover {
			color: var(--color-tertiary-dark);
		}
	}

	.header-content {
		padding: 0 var(--space-xl) var(--space-md);

		.actions {
			position: absolute;
			top: calc(100% - var(--space-md));
			right: 10%;
		}
	}
}

.content {
	display: grid;
	grid-template-areas: "meta" "preview" "description";
	grid-template-rows: auto auto 1fr;
	grid-template-columns: 1fr;
	grid-gap: var(--space-md);
	min-height: var(--size-content-width-min);
	padding: 0 var(--space-xl);

	@include breakpoint(tablet) {
		grid-template-areas: "meta meta" "preview description";
		grid-template-rows: auto 1fr;
		grid-template-columns: 1fr 1fr;
	}

	&.no-description {
		grid-template-areas: "meta" "preview";
		grid-template-rows: auto auto;

		@include breakpoint(tablet) {
			grid-template-areas: "meta" "preview";
			grid-template-rows: auto;
			grid-template-columns: auto;
		}
	}

	.metadata {
		grid-area: meta;
		padding: var(--space-xl) 0;
	}

	.preview {
		position: relative;
		grid-area: preview;

		.preview-background {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: var(--layer-behind);
			filter: blur(7px);
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
			max-height: 50vh;

			@include breakpoint(tablet) {
				max-height: auto;
			}
		}
	}

	.description {
		grid-area: description;
	}
}
</style>
