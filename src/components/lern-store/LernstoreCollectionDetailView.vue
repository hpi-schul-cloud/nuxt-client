<template>
	<div class="resource">
		<base-link
			design="none"
			type="button"
			class="arrow__back"
			:to="{
				name: 'content',
				query: { q: $route.query.q, inline: $route.query.inline },
			}"
		>
			<v-icon class="material-icon" :icon="mdiChevronLeft" />
			{{ $t("pages.content.index.backToOverview") }}
		</base-link>
		<div class="content">
			<div class="wrapper">
				<div class="content-container">
					<h3>
						{{ resource.title || resource.name }}
					</h3>
					<div class="author-provider">
						<span v-if="hasAuthor">
							<base-link :href="'/content/?q=' + author" class="content-link">
								{{ author }}
							</base-link>
							({{ $t("pages.content._id.metadata.author") }})
						</span>
						<span v-if="provider">
							<span v-if="hasAuthor">,</span>
							<base-link :href="'/content/?q=' + provider" class="content-link">
								{{ provider }}
							</base-link>
							({{ $t("pages.content._id.metadata.provider") }})
						</span>
					</div>
					<RenderHTML
						v-if="description"
						class="description text-wrap"
						:html="description"
					/>
					<div class="metadata">
						<div v-if="createdAt || updatedAt" class="meta-container">
							<div class="meta-icon">
								<v-icon class="material-icon" :icon="mdiCalendar" />
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
								<v-icon class="material-icon meta-icon" :icon="mdiPound" />
							</div>
							<template v-if="tags.length > 0">
								<div class="text-wrap">
									<span
										v-for="(tag, index) in tags"
										:key="index"
										class="meta-text"
									>
										<base-link :href="'/content/?q=' + tag" class="tag link">
											#{{ tag }}
										</base-link>
									</span>
								</div>
							</template>
							<template v-if="tags.length === 0">
								<span class="meta-text link">
									{{ $t("pages.content._id.metadata.noTags") }}
								</span>
							</template>
						</div>
					</div>
					<div class="element-cards">
						<h4 class="h4">
							{{ $t("pages.content._id.collection.selectElements") }}
						</h4>
						<transition name="fade">
							<div v-if="true" class="content__container">
								<lern-store-grid
									v-if="elements.data && elements.data.length"
									column-width="14rem"
									class="cards"
									data-testid="lernStoreCardsContainer"
								>
									<content-card
										v-for="(element, i) of elements.data"
										:key="i"
										:selectable="true"
										:resource="element"
									/>
								</lern-store-grid>
							</div>
						</transition>
					</div>
					<v-progress-circular
						v-show="loading"
						indeterminate
						size="115"
						class="spinner mt-16"
					/>
				</div>
				<div class="buttons">
					<user-has-role class="floating-buttons" :role="isNotStudent">
						<add-content-button
							:resource="{}"
							btn-color="primary"
							:btn-label="btnLabel"
							:disabled="!(selected > 0)"
							:multiple="true"
						/>
					</user-has-role>
				</div>
			</div>
			<content-edu-sharing-footer class="content__footer" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import {
	getAuthor,
	getDescription,
	getMetadataAttribute,
	getProvider,
	getTags,
} from "@/utils/helpers";
import { printDateFromTimestamp } from "@/plugins/datetime";
import contentMeta from "@/mixins/contentMeta";
import infiniteScrolling from "@/mixins/infiniteScrolling";
import { contentModule, notifierModule } from "@/store";
import AddContentButton from "@/components/lern-store/AddContentButton";
import ContentCard from "@/components/lern-store/ContentCard";
import ContentEduSharingFooter from "@/components/lern-store/ContentEduSharingFooter";
import UserHasRole from "@/components/helpers/UserHasRole";
import BaseLink from "../base/BaseLink";
import { RenderHTML } from "@feature-render-html";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiCalendar, mdiChevronLeft, mdiPound } from "@icons/material";

const DEFAULT_AUTHOR = "admin";

export default defineComponent({
	components: {
		AddContentButton,
		BaseLink,
		ContentCard,
		ContentEduSharingFooter,
		UserHasRole,
		RenderHTML,
	},
	mixins: [contentMeta, infiniteScrolling],
	props: {
		resource: {
			type: Object,
			default: () => ({}),
		},
		role: { type: String, default: "" },
	},
	data() {
		return {
			checkedMaterials: [],
			btnLabel: `${this.$t("pages.content._id.addToTopic")}`,
			mdiCalendar,
			mdiChevronLeft,
			mdiPound,
		};
	},
	computed: {
		elements() {
			return contentModule.getElementsGetter;
		},
		selected() {
			return contentModule.getSelected;
		},
		loading() {
			return contentModule.getLoading;
		},
		provider() {
			const provider = getProvider(this.resource.properties);
			return provider ? provider.replace(/ {2,}/g, "") : undefined;
		},
		author() {
			return getAuthor(this.resource.properties);
		},
		createdAt() {
			return printDateFromTimestamp(this.resource.properties["cm:created"][0]);
		},
		updatedAt() {
			return printDateFromTimestamp(this.resource.properties["cm:modified"][0]);
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
		selected(selectedElements) {
			const counterLabel = selectedElements > 0 ? ` (${selectedElements})` : "";

			this.btnLabel = `${this.$t(
				"pages.content._id.addToTopic"
			)}${counterLabel}`;
		},
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
		const pageTitle = this.isInline
			? this.$t("pages.content.page.window.title", {
					instance: this.$theme.name,
				})
			: this.$t("common.words.lernstore");
		document.title = buildPageTitle(pageTitle);
	},
	methods: {
		async searchElements() {
			try {
				// Clears the previous collection elements before rendering the new ones
				contentModule.clearElements();
				await contentModule.getElements(this.query);
			} catch {
				notifierModule.show({
					text: this.$t("pages.content.notification.lernstoreNotAvailable"),
					status: "error",
					timeout: 5000,
				});
			}
		},
		async addElements() {
			if (this.query.$skip < this.elements.total) {
				this.query.$skip += this.query.$limit;
				await contentModule.addElements(this.query);
			}
		},
		isNotStudent(roles) {
			return this.role === ""
				? roles.some((role) => !role.startsWith("student"))
				: this.role;
		},
	},
});
</script>

<style>
#main-content.content {
	overflow-x: inherit;
}
</style>
<style lang="scss" scoped>
$tablet-portrait-width: 768px;

.resource {
	width: 100%;
	min-height: calc(100vh - var(--sidebar-item-height));
	margin-top: var(--space-xs);

	.arrow__back {
		margin-top: var(--space-xs);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
		cursor: pointer;
		border: none;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		padding: 0 var(--space-lg);
		height: calc(100vh - 122px);

		.wrapper {
			display: grid;
			grid-template-areas: "cards buttons";
			grid-template-columns: 4fr 1fr;
			// grid-auto-rows: minmax(200px, auto);
			column-gap: 20px;

			.buttons {
				grid-area: buttons;
				max-width: 350px;
				margin-top: var(--space-md);

				.floating-buttons {
					position: -webkit-sticky;
					position: sticky;
					top: var(--space-xl);
					z-index: var(--layer-fab);
					margin-top: var(--space-xl);
					border-radius: var(--radius-md);

					@media (max-width: $tablet-portrait-width) {
						padding-bottom: var(--space-xs);
					}
				}
			}
		}

		.content-container {
			grid-area: cards;
			width: 100%;
			margin-top: var(--space-md);
			margin-bottom: var(--space-lg);
		}

		.external-content-warning {
			color: rgba(var(--v-theme-error));

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

		.actions {
			display: flex;
			justify-content: flex-end;
		}

		.author-provider {
			font-size: var(--text-xs);
			font-weight: var(--font-weight-bold);
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
