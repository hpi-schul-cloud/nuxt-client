<template>
	<div class="resource">
		<div ref="icons" class="icons">
			<v-btn
				icon
				size="small"
				:class="[
					closeButtonStyleSelector ? 'close-transparent' : 'close-icon',
					'icon',
				]"
				aria-label="close detail view"
				data-testid="learningstore-close-details-icon"
				@click="goBack"
			>
				<v-icon size="20">{{ mdiClose }}</v-icon>
			</v-btn>
		</div>
		<div class="content">
			<div class="preview">
				<lern-store-player
					v-if="shouldShowPlayer"
					class="preview preview-player"
					:node-id="resource.ref.id"
				/>
				<div v-else>
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
				</div>
			</div>
		</div>
		<div ref="sidebar" class="sidebar elevation-6">
			<div class="content-container">
				<div class="actions" />
				<div class="title">
					<span>
						{{ resource.title || resource.name }}
					</span>
				</div>
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
				<div v-if="shouldShowPlayer" class="external-content-warning">
					<p class="text-s external-content-title">
						{{ $t("pages.content.material.showMaterialHint") }}
					</p>
					<p class="text-s external-content-title-mobile">
						{{ $t("pages.content.material.showMaterialHintMobile") }}
					</p>
				</div>
				<div v-else>
					<v-btn
						v-if="isMerlin"
						variant="outlined"
						class="content-button"
						data-testid="learningstore-to-content-link"
						@click="
							() => {
								goToMerlinContent(merlinTokenReference);
							}
						"
					>
						<v-icon size="20" class="mr-1">{{ mdiOpenInNew }}</v-icon>
						{{ $t("pages.content.material.toMaterial") }}
					</v-btn>
					<v-btn
						v-else
						variant="outlined"
						:href="downloadUrl"
						class="content-button"
						target="_blank"
						data-testid="learningstore-to-content-link"
					>
						<v-icon size="20" class="mr-1">{{ mdiOpenInNew }}</v-icon>
						{{ $t("pages.content.material.toMaterial") }}
					</v-btn>
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
				<RenderHTML class="description text-wrap" :html="description" />
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
					<div class="meta-container">
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
					<div v-show="collectionLink !== ''" class="meta-container">
						<div class="meta-icon">
							<v-icon class="custom-icon meta-icon">$ic_collection</v-icon>
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
					btn-color="primary"
					:btn-label="$t('pages.content._id.addToTopic')"
					:multiple="false"
					data-testid="learningstore-add-content-button"
				/>
			</user-has-role>
		</div>
	</div>
</template>

<script>
import UserHasRole from "@/components/helpers/UserHasRole.vue";
import AddContentButton from "@/components/lern-store/AddContentButton.vue";
import LernStorePlayer from "@/components/lern-store/LernStorePlayer.vue";
import contentMeta from "@/mixins/contentMeta";
import { printDateFromTimestamp } from "@/plugins/datetime";
import { SchulcloudTheme } from "@/serverApi/v3";
import {
	getAuthor,
	getDescription,
	getMerlinReference,
	getMetadataAttribute,
	getProvider,
	getTags,
	isMerlinContent,
	isVideoContent,
} from "@/utils/helpers";
import { buildPageTitle } from "@/utils/pageTitle";
import { RenderHTML } from "@feature-render-html";
import { mdiCalendar, mdiClose, mdiOpenInNew, mdiPound } from "@icons/material";
import BaseLink from "@/components/base/BaseLink.vue";
import { $axios } from "@/utils/api";

const DEFAULT_AUTHOR = "admin";

export default {
	components: {
		AddContentButton,
		BaseLink,
		LernStorePlayer,
		UserHasRole,
		RenderHTML,
	},
	mixins: [contentMeta],
	props: {
		resource: {
			type: Object,
			default: () => ({}),
		},
		id: { type: String, default: "" },
		client: { type: String, default: "Schul-Cloud" },
		role: { type: String, default: "" },
	},
	data() {
		return {
			mdiCalendar,
			mdiClose,
			mdiPound,
			mdiOpenInNew,
			windowWidth: window.outerWidth,
			window: {
				width: 0,
				height: 0,
			},
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
			return this.$vuetify.display.xs;
		},
		collectionLink() {
			let relation = getMetadataAttribute(
				this.resource.properties,
				"ccm:hpi_lom_relation"
			);
			if (relation) {
				relation = JSON.parse(relation.replace(/'/g, '"'));
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
		hasAuthor() {
			return this.author && this.author !== DEFAULT_AUTHOR;
		},
		isBrandenburg() {
			return process.env.SC_THEME === SchulcloudTheme.Brb;
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
			return isVideoContent(this.resource);
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
	created() {
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
	},
	unmounted() {
		window.removeEventListener("resize", this.handleResize);
	},
	mounted() {
		const pageTitle = this.isInline
			? {
					title: this.$t("pages.content.page.window.title", {
						instance: this.$theme.name,
					}),
				}
			: { title: this.$t("common.words.lernstore") };

		document.title = buildPageTitle(pageTitle);
	},
	methods: {
		async goToMerlinContent(merlinReference) {
			const requestUrl = `/v1/edu-sharing-merlinToken/?merlinReference=${merlinReference}`;
			const url = (await $axios.get(requestUrl)).data;
			window.open(url, "_blank");
		},
		isNotStudent(roles) {
			return this.role === ""
				? roles.some((role) => !role.startsWith("student"))
				: this.role;
		},
		handleResize() {
			this.window.width = window.innerWidth;
			this.window.height = window.innerHeight;
		},
		goBack() {
			if (window.history.length > 1) {
				this.$router?.back();
			} else {
				window.close();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;
@use "@/styles/mixins" as *;
$tablet-portrait-width: 768px;

.resource {
	display: grid;
	grid-template-areas: "content meta";
	grid-template-rows: auto;
	grid-template-columns: auto 30%;
	min-width: 100vw;
	min-height: 100vh;

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
		right: 0;
		z-index: var(--layer-modal);
		display: flex;
		justify-content: flex-end;
		padding: var(--space-md);

		.close-icon {
			color: rgba(var(--v-theme-white));
			background-color: map.get($grey, darken-3);
		}

		.close-transparent {
			background-color: rgba(var(--v-theme-white));
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
		background-color: rgba(var(--v-theme-white));

		@media (max-width: $tablet-portrait-width) {
			max-height: none;
			overflow: inherit;

			.external-content-warning {
				.text-s.external-content-title-mobile {
					display: block;
				}

				.external-content-title {
					display: none;
				}
			}
		}

		.content-container {
			width: 80%;
			margin-top: var(--space-md);
		}

		.external-content-warning {
			color: rgba(var(--v-theme-error));

			.external-content-title {
				margin-top: var(--space-md);
				font-weight: var(--font-weight-bold);
			}

			.external-content-title-mobile {
				display: none;
				margin-top: var(--space-md);
				font-weight: var(--font-weight-bold);
			}
		}

		.content-button {
			width: 100%;
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
				}
			}
		}
	}
}
</style>
