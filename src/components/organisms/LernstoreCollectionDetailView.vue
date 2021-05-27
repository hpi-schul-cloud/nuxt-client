<!-- eslint-disable max-lines -->

<template>
	<div class="resource">
		<base-link
			design="none"
			type="button"
			class="arrow__back"
			:to="{
				name: 'content',
				query: { q: this.$route.query.q, inline: this.$route.query.inline },
			}"
		>
			<base-icon source="material" icon="navigate_before" />
			{{ $t("pages.content.index.backToOverview") }}
		</base-link>
		<div class="content">
			<div class="content-container">
				<h3>
					{{ resource.title || resource.name }}
				</h3>
				<div class="author-provider">
					<span v-if="hasAuthor">
						<base-link :href="'/content/?q=' + author" class="content-link">{{
							author
						}}</base-link>
						({{ $t("pages.content._id.metadata.author") }})
					</span>
					<span v-if="provider">
						<span v-if="hasAuthor">,</span>
						<base-link :href="'/content/?q=' + provider" class="content-link">{{
							provider
						}}</base-link>
						({{ $t("pages.content._id.metadata.provider") }})
					</span>
				</div>
				<!-- eslint-disable vue/no-v-html -->
				<div
					v-if="description"
					class="description text-wrap"
					v-html="description"
				></div>
				<div class="metadata">
					<div v-if="createdAt || updatedAt" class="meta-container">
						<div class="meta-icon">
							<base-icon source="material" icon="event" />
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
					<div :style="{ margin: '0px' }" class="meta-container">
						<div>
							<base-icon class="meta-icon" source="custom" icon="hashtag" />
						</div>
						<template v-if="tags.length > 0">
							<div class="text-wrap">
								<span
									v-for="(tag, index) in tags"
									:key="index"
									class="meta-text"
								>
									<base-link :href="'/content/?q=' + tag" class="tag link"
										>#{{ tag }}</base-link
									>
								</span>
							</div>
						</template>
						<template v-if="tags.length === 0">
							<span class="meta-text link">{{
								$t("pages.content._id.metadata.noTags")
							}}</span>
						</template>
					</div>
				</div>
				<div class="element-cards">
					<h4 class="h4">
						{{ $t("pages.content._id.collection.selectElements") }}
					</h4>
					<transition name="fade">
						<div class="content__container">
							<base-grid
								v-if="elements.data && elements.data.length"
								column-width="14rem"
								class="cards"
								data-testid="lernStoreCardsContainer"
							>
								<content-card
									v-for="(element, i) of elements.data"
									:key="i"
									:resource="element"
								/>
							</base-grid>
						</div>
					</transition>
				</div>
				<base-spinner
					v-show="loading"
					class="spinner mt--xl-2"
					color="var(--color-tertiary)"
					size="xlarge"
				/>
			</div>
			<content-edu-sharing-footer class="content__footer" />
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ContentCard from "@components/organisms/ContentCard";
import ContentEduSharingFooter from "@components/molecules/ContentEduSharingFooter";

import contentMeta from "@mixins/contentMeta";
import BaseLink from "../base/BaseLink";

import {
	getMetadataAttribute,
	getProvider,
	getDescription,
	getAuthor,
	getTags,
} from "@utils/helpers";
import { printDate } from "@plugins/datetime";
import infiniteScrolling from "@mixins/infiniteScrolling";

const DEFAULT_AUTHOR = "admin";

export default {
	components: {
		BaseLink,
		ContentCard,
		ContentEduSharingFooter,
	},
	layout: "loggedInFull",
	mixins: [contentMeta, infiniteScrolling],
	props: {
		resource: {
			type: Object,
			default: () => {},
		},
		role: { type: String, default: "" },
	},
	computed: {
		...mapState("content", {
			elements: (state) => {
				return state.elements;
			},
			loading: (state) => {
				return state.loading;
			},
		}),
		provider() {
			const provider = getProvider(this.resource.properties);
			return provider ? provider.replace(/ {2,}/g, "") : undefined;
		},
		author() {
			return getAuthor(this.resource.properties);
		},
		createdAt() {
			return printDate(this.resource.createdAt);
		},
		updatedAt() {
			return printDate(this.resource.modifiedAt);
		},
		hasAuthor() {
			return this.author && this.author !== DEFAULT_AUTHOR;
		},
		description() {
			return getDescription(
				this.resource.description,
				this.resource.properties
			);
		},
		tags() {
			return getTags(this.resource.properties);
		},
		collectionUUID() {
			return getMetadataAttribute(
				this.resource.properties,
				"ccm:replicationsourceuuid"
			);
		},
		query() {
			const query = {
				$limit: 24,
				$skip: 0,
				collection: this.collectionUUID,
			};
			if (this.isInline) {
				query.inline = 1;
			}
			return query;
		},
		isInline() {
			return !!this.$route.query.inline;
		},
	},
	watch: {
		elements() {
			return this.elements;
		},
		bottom(bottom) {
			const { skip, total } = this.elements;
			if (bottom && !this.loading && skip < total) {
				this.addElements();
			}
		},
		loading() {
			return this.loading;
		},
	},
	mounted() {
		this.searchElements();
		this.activateTransition = true;
	},
	methods: {
		async searchElements() {
			try {
				// Clears the previous collection elements before rendering the new ones
				this.$store.commit("content/clearElements");
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("content/getElements", this.query);
			} catch (error) {
				this.$toast.error(
					this.$t("pages.content.notification.lernstoreNotAvailable")
				);
			}
		},
		async addElements() {
			if (this.query.$skip < this.elements.total) {
				this.query.$skip += this.query.$limit;
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("content/addElements", this.query);
			}
		},
		isNotStudent(roles) {
			return this.role === ""
				? roles.some((role) => !role.startsWith("student"))
				: this.role;
		},
	},
	head() {
		return this.isInline
			? {
					title: this.$t("pages.content.page.window.title", {
						instance: this.$theme.name,
					}),
			  }
			: { title: this.$t("global.sidebar.lernstore") };
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

$tablet-portrait-width: 768px;

.resource {
	width: 100%;
	min-height: calc(100vh - var(--sidebar-item-height));
	margin-top: var(--space-xs);

	.arrow__back {
		margin-top: var(--space-xs);
		font-weight: var(--font-weight-bold);
		color: var(--color-tertiary);
		text-decoration: none;
		cursor: pointer;
		border: none;
		&:visited {
			color: var(--color-tertiary);
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		padding: 0 var(--space-lg);
		overflow-y: hidden;

		.content-container {
			width: 100%;
			margin-top: var(--space-md);
			margin-bottom: var(--space-lg);
		}

		.external-content-warning {
			color: var(--color-danger);

			.external-content-title {
				margin-top: var(--space-md);
				font-weight: var(--font-weight-bold);
			}
		}

		.cards {
			margin-left: 0;
		}

		.spinner {
			position: relative;
			left: 50%;
			// stylelint-disable
			margin-left: -4em;
			// stylelint-enable
		}

		.content-button {
			width: 100%;
			margin-bottom: var(--space-md);
		}

		.actions {
			display: flex;
			justify-content: flex-end;
		}

		.author-provider {
			font-size: var(--text-xs);
			font-weight: var(--font-weight-bold);
			.content-link {
				color: var(--color-tertiary);
				text-decoration: underline;
			}
		}

		.description {
			margin: var(--space-xl-2) 0;
			font-size: var(--text-md);
		}

		.text-wrap {
			display: flex;
			flex-flow: row wrap;
			word-break: break-word;
		}
	}

	.metadata {
		display: flex;
		flex-direction: column;
		padding-bottom: var(--space-sm-2);
		font-size: var(--text-sm);
		line-height: var(--line-height-lg);

		.meta-container {
			display: flex;
			align-items: flex-start;
			margin-bottom: var(--space-lg);
			.meta-icon {
				margin-right: var(--space-md);
				font-size: var(--text-lg);
				.icon {
					max-height: var(--text-lg);
				}
			}
			.link {
				margin-right: var(--space-xs);
				color: var(--color-tertiary);
			}
			.tertiary-color {
				color: var(--color-black);
				text-decoration: none;
				:hover {
					color: var(--color-black);
				}
			}
		}
	}

	.element-cards {
		.content__container {
			margin-top: var(--space-lg);
		}
	}
}
</style>
