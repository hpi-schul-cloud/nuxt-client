<template>
	<div class="resource">
		<div
			ref="icons"
			class="icons"
			:style="{ 'justify-content': getIconsJustifyContent }"
		>
			<base-button
				:class="[
					closeButtonStyleSelector ? 'close-transparent' : 'close-icon',
					'icon',
				]"
				design="icon"
				aria-label="btnLabel"
				@click="goBack"
			>
				<base-icon source="material" icon="close" />
			</base-button>
		</div>
		<div class="content">
			<lern-store-player v-if="shouldShowPlayer" :node-id="resource.ref.id"/>
			<div v-else class="preview">
				<div
					class="preview-background"
					:style="{
						backgroundImage: `url(${backgroundImage})`,
					}"
				/>
				<img
					:src="backgroundImage"
					class="preview-img"
					:alt="$t('pages.content.preview_img.alt')"
					role="img"
				/>
				<div class="preview-background-color" />
			</div>
		</div>
		<div ref="sidebar" class="sidebar">
			<div class="content-container">
				<div class="actions"></div>
				<div class="title">
					<span>
						{{ resource.title || resource.name }}
					</span>
				</div>
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
				<div v-if="shouldShowPlayer" class="external-content-warning">
					<p class="text-s external-content-title">
						{{ $t("pages.content.material.showMaterialHint") }}
					</p>
				</div>
				<div v-else>
					<base-button
						v-if="isMerlin"
						design="outline"
						class="content-button"
						@click="
							() => {
								goToMerlinContent(merlinTokenReference);
							}
						"
					>
						<base-icon source="custom" icon="open_new_window" />
						{{ $t("pages.content.material.toMaterial") }}
					</base-button>
					<base-button
						v-else
						design="outline"
						:href="downloadUrl"
						class="content-button"
						target="_blank"
					>
						<base-icon source="custom" icon="open_new_window" />
						{{ $t("pages.content.material.toMaterial") }}
					</base-button>
					<!-- This will be replaced with Modal -->
					<div v-if="isBrandenburg" class="external-content-warning">
						<p class="text-s external-content-title">
							{{ $t("pages.content.material.leavePageWarningMain") }}
						</p>
						<p class="text-xs">
							{{ $t("pages.content.material.leavePageWarningFooter") }}
						</p>
					</div>
				</div>
				<!-- eslint-disable vue/no-v-html -->
				<div class="description text-wrap" v-html="description"></div>
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
					<div class="meta-container">
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
					<div v-show="collectionLink !== ''" class="meta-container">
						<div class="meta-icon">
							<base-icon source="material" icon="ic_collection" />
						</div>
						<base-link
							design="none"
							type="button"
							class="meta-text link"
							:to="collectionLink"
						>
							<span>{{ $t("pages.content.card.collection") }}</span>
						</base-link>
					</div>
				</div>
			</div>
			<user-has-role class="floating-buttons" :role="isNotStudent">
				<add-content-button
					:resource="resource"
					btn-design="hero-cta"
					btn-class="floating-button"
					btn-size="large"
					btn-icon-class="footer__content-icon"
					btn-icon="add_circle_outline"
					:btn-label="$t('pages.content._id.addToTopic')"
					:multiple="false"
				/>
			</user-has-role>
		</div>
	</div>
</template>

<script>
/* eslint-disable max-lines */
import AddContentButton from "@components/organisms/AddContentButton";
import LernStorePlayer from "@components/molecules/LernStorePlayer";
import UserHasRole from "@components/helpers/UserHasRole";

import contentMeta from "@mixins/contentMeta";

import BaseLink from "../base/BaseLink";

import {
	getAuthor,
	getDescription,
	getMerlinReference,
	getMetadataAttribute,
	getProvider,
	getTags,
	isMerlinContent,
} from "@utils/helpers";
import { printDateFromTimestamp } from "@plugins/datetime";

const DEFAULT_AUTHOR = "admin";

export default {
	components: {
		AddContentButton,
		BaseLink,
		LernStorePlayer,
		UserHasRole,
	},
	mixins: [contentMeta],
	props: {
		resource: {
			type: Object,
			default: () => {},
		},
		id: String,
		client: { type: String, default: "Schul-Cloud" },
		role: { type: String, default: "" },
	},
	data() {
		return {
			isIFrameLoading: true,
		};
	},
	computed: {
		author() {
			return getAuthor(this.resource.properties);
		},
		backgroundImage() {
			return this.resource.preview.url;
		},
		closeButtonStyleSelector() {
			return this.$mq === "tabletPortrait" || this.$mq === "mobile";
		},
		collectionLink() {
			let relation = getMetadataAttribute(
				this.resource.properties,
				"ccm:hpi_lom_relation"
			);
			if (relation) {
				relation = JSON.parse(relation.replace(/\'/g, '"'));
				if (relation.kind === "ispartof") {
					return {
						name: "content-id",
						params: { id: relation.resource.identifier[0] },
						query: {
							isCollection: true,
							q: this.$route.query.q,
						},
					};
				}
			}
			return "";
		},
		createdAt() {
			return printDateFromTimestamp(this.resource.properties["cm:created"][0]);
		},
		description() {
			return getDescription(
				this.resource.description,
				this.resource.properties
			);
		},
		downloadUrl() {
			return getMetadataAttribute(this.resource.properties, "ccm:wwwurl");
		},
		filename() {
			return this.resource.filename;
		},
		getIconsJustifyContent() {
			if (this.shouldShowPlayer) {
				return "flex-end";
			} else {
				return "space-between";
			}
		},
		hasAuthor() {
			return this.author && this.author !== DEFAULT_AUTHOR;
		},
		isBrandenburg() {
			return process.env.SC_THEME === "brb";
		},
		isInline() {
			return !!this.$route.query.inline;
		},
		isMerlin() {
			return isMerlinContent(this.resource);
		},
		merlinTokenReference() {
			return getMerlinReference(this.resource);
		},
		provider() {
			const provider = getProvider(this.resource.properties);
			return provider ? provider.replace(/ {2,}/g, "") : undefined;
		},
		shouldShowPlayer() {
			const { mediatype, size } = this.resource;
			// TODO: support all videos, not only h5p
			//return true;
			return (mediatype === "file-h5p" && size !== undefined && size !== null && size > 0);
		},
		tags() {
			return getTags(this.resource.properties);
		},
		type() {
			return this.getTypeI18nName(this.resource.mimetype);
		},
		updatedAt() {
			return printDateFromTimestamp(this.resource.properties["cm:modified"][0]);
		},
	},
	methods: {
		async goToMerlinContent(merlinReference) {
			const url = await this.$axios.$get(
				`/v1/edu-sharing/merlinToken/?merlinReference=${merlinReference}`
			);
			window.open(url, "_blank");
		},
		isNotStudent(roles) {
			return this.role === ""
				? roles.some((role) => !role.startsWith("student"))
				: this.role;
		},
		goBack() {
			if (window.history.length > 1) {
				this.$router && this.$router.back();
			} else {
				window.close();
			}
		},
		setIsIFrameLoading(event) {
			console.log('setIsIFrameLoading()', event);
			if (event) {
				this.isIFrameLoading = false;
			}
		},
	},
	head() {
		return this.isInline
			? {
					title: this.$t("pages.content.page.window.title", {
						instance: this.$theme.name,
					}),
			  }
			: { title: this.$t("common.words.lernstore") };
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

$tablet-portrait-width: 768px;

.resource {
	display: grid;
	grid-template-areas: "content meta";
	grid-template-rows: auto;
	grid-template-columns: auto 30%;
	min-width: 100vw;
	min-height: 100vh;
	box-shadow: var(--shadow-md);

	@media (max-width: $tablet-portrait-width) {
		grid-template-areas:
			"content"
			"meta";
		grid-template-columns: auto;
	}

	@media (min-width: 1025px) {
		grid-template-columns: auto 40%;
	}

	.icons {
		position: fixed;
		top: 0;
		z-index: var(--layer-modal);
		display: flex;
		width: 100%;
		padding: var(--space-md);

		.close-icon {
			background-color: var(--color-gray-dark);
			box-shadow: var(--shadow-sm);
		}

		.close-transparent {
			color: var(--color-black);
			background-color: var(--color-white);
			box-shadow: var(--shadow-sm);
		}
	}

	.content {
		position: relative;
		grid-area: content;

		@media (max-width: $tablet-portrait-width) {
			position: sticky;
			top: 0;
		}

		.preview {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;

			@media (max-width: $tablet-portrait-width) {
				height: 70vh;
			}

			.player-iframe {
				width: 85%;
				/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
				margin: 1.1px;
				border: none;
			}

			.loading {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				margin: auto;
				/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
				color: white;
			}

			.preview-background-color {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: var(--layer-behind);
				width: 100%;
				height: 100%;
				background-color: var(--color-secondary);
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
				z-index: var(--layer-page);
				object-position: center;
				object-fit: contain;

				@include breakpoint(tablet) {
					min-height: auto;
				}
			}
		}
	}

	.floating-buttons {
		position: sticky;
		bottom: 0;
		z-index: var(--layer-page);
		border-radius: var(--radius-md);

		@media (max-width: $tablet-portrait-width) {
			padding-bottom: var(--space-xs);
		}
	}

	.sidebar {
		position: relative;
		display: flex;
		flex-direction: column;
		grid-area: meta;
		align-items: center;
		justify-content: space-between;
		max-height: 100vh;
		padding-bottom: var(--space-sm);
		overflow-y: scroll;
		background-color: var(--color-white);
		box-shadow: -8px 0 17px -7px rgba(0, 0, 0, 0.75);

		@media (max-width: $tablet-portrait-width) {
			max-height: none;
			overflow: inherit;
		}

		.actions {
			display: flex;
			justify-content: flex-end;
		}

		.author-provider {
			font-size: var(--text-xs);
			font-weight: var(--font-weight-bold);

			.content-link {
				color: var(--color-secondary);
				text-decoration: underline;
			}
		}

		.content-button {
			width: 100%;
		}

		.content-container {
			width: 80%;
			margin-top: var(--space-md);
		}

		.description {
			margin: var(--space-xl-2) 0;
			font-size: var(--text-md);
		}

		.external-content-warning {
			color: var(--color-danger);

			.external-content-title {
				margin-top: var(--space-md);
				font-weight: var(--font-weight-bold);
			}
		}

		.text-wrap {
			display: flex;
			flex-flow: row wrap;
			word-break: break-word;
		}

		.title {
			display: flex;
			justify-content: space-between;
			margin: var(--space-xl-2) 0 var(--space-sm) 0;
			font-size: var(--heading-5);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-md);
		}

		.metadata {
			display: flex;
			flex-direction: column;
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
					color: var(--color-secondary);
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
	}
}
</style>
