<template>
	<div class="resource">
		<div class="resource__img-container">
			<div
				class="resource__img-container--background"
				:style="{
					backgroundImage: `url(${resource.preview.url})`,
				}"
			/>
			<div class="resource__img-container--icons">
				<base-button design="none" @click="$router.go(-1)">
					<base-icon
						class="resource__img-container--icon"
						source="material"
						icon="close"
					/>
				</base-button>

				<base-button design="none" @click="bookmarkHandler">
					<base-icon
						class="resource__img-container--icon"
						source="material"
						:icon="bookmarkIconSelector"
					/>
				</base-button>

				<div>
					<base-button design="none">
						<base-icon
							class="resource__img-container--icon"
							source="material"
							icon="more_vert"
						/>
					</base-button>
					<context-menu
						:show.sync="menuActive"
						anchor="bottom-right"
						:actions="actions"
					/>
				</div>
			</div>

			<img :src="resource.preview.url" alt="content-preview-img" />
		</div>
		<div class="resource__content">
			<div class="resource__header">
				<div class="resource__header--title">{{
					resource.title || resource.name
				}}</div>
				<div class="resource__header--menu"></div>
				<div class="resource__header--subtitle">
					{{ resource.properties["cm:creator"][0] || "" }} (Autor),
					{{
						(resource.properties["ccm:metadatacontributer_provider"] &&
							resource.properties["ccm:metadatacontributer_provider"][0]) ||
							"provider"
					}}
					(Herausgeber)
				</div>
			</div>

			<div class="resource__body">
				{{ resource.description }}
			</div>

			<div class="resource__footer">
				<div class="resource__footer--subcontainer">
					<div class="resource__footer--subcontainer_icon">
						<base-icon source="material" icon="file_copy" />
					</div>
					<div class="resource__footer--subcontainer_text">{{
						resource.name
					}}</div>
				</div>
				<div class="resource__footer--subcontainer">
					<div class="resource__footer--subcontainer_icon">
						<base-icon source="material" icon="calendar_today" />
					</div>
					<div class="resource__footer--subcontainer_text">
						<div
							>erstellt am
							{{ dayjs(resource.properties["cm:createdISO8601"][0]) }}</div
						>
						<div
							>zuletzt geändert am
							{{ dayjs(resource.properties["cm:modifiedISO8601"][0]) }}</div
						>
					</div>
				</div>
			</div>
		</div>
		<div class="resource__floating">
			<floating-fab icon="add" aria-label="floating button" />
		</div>
	</div>
</template>

<script>
import FloatingFab from "@components/molecules/FloatingFab";
import dayjs from "dayjs";

export default {
	components: {
		FloatingFab,
	},

	layout: "loggedInFull",
	async asyncData({ store, params }) {
		return {
			resource: await store.dispatch("content/getResourceMetadata", params.id),
		};
	},
	data() {
		return {
			dayjs,
			isBookmarked: false,
		};
	},
	computed: {
		bookmarkIconSelector() {
			return this.isBookmarked ? "bookmark" : "bookmark_border";
		},
	},
	methods: {
		bookmarkHandler() {
			this.isBookmarked = !this.isBookmarked;
		},
	},
};
</script>

<style lang="scss" scoped>
.resource {
	display: flex;
	width: 100%;
	height: 90vh;
	&__img-container {
		position: relative;
		width: 70%;
		height: 100%;
		background-color: var(--color-tertiary-dark);
		&--background {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100%;
			height: 100%;
			filter: blur(7px);
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			opacity: 0.7;
			transform: translate(-50%, -50%);
		}
		&--icons {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: var(--space-lg);
			color: var(--color-white);
		}
		&--icon {
			padding: var(--space-xs-3);
			font-size: var(--heading-4);
			color: var(--color-white);
			background-color: var(--color-gray-dark);
			border-radius: var(--radius-round);
			opacity: 0.6;
		}
		img {
			position: absolute;
			top: 50%;
			left: 50%;
			max-width: 100%;
			transform: translate(-50%, -50%);
			// height: 100%;
		}
	}
	&__content {
		width: 30%;
		padding: var(--space-lg);
	}
	&__header {
		&--title {
			margin-bottom: var(--space-xs-3);
			font-size: var(--heading-6);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-md);
		}
		&--subtitle {
			margin-bottom: var(--space-xl);
			font-size: var(--text-xs);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-md);
		}
	}
	&__body {
		margin-bottom: var(--space-xl);
		font-size: var(--text-sm);
		line-height: var(--line-height-md);
	}
	&__footer {
		display: flex;
		flex-direction: column;
		width: 100%;
		font-size: var(--text-xs);
		line-height: var(--line-height-md);

		&--subcontainer {
			display: flex;
			width: 100%;
			margin-bottom: var(--space-xs-2);
			&_icon {
				margin-right: var(--space-xs);
			}
		}
	}
}
</style>
