<template>
	<base-card v-bind="$attrs">
		<div class="content-card">
			<base-link
				class="title-link"
				:to="{
					name: 'content-id',
					params: { id: resource.properties['ccm:replicationsourceuuid'][0] },
					query: query,
				}"
				:no-style="true"
			>
				<template v:slot:content>
					<div class="content">
						<div class="content__img">
							<div class="img-container">
								<span v-show="isSelectable()" @click.stop="linkHandler">
									<base-input
										v-model="isChecked"
										type="checkbox"
										:label="resource.title"
										:label-hidden="true"
										class="select"
										style="margin-bottom: 0; color: var(--color-white)"
									/>
								</span>
								<div class="content__img-background-gradient" />

								<img
									:src="thumbnail()"
									class="content__img-thumbnail"
									:alt="$t('pages.content.card.img.alt')"
									role="img"
								/>
								<!--base-icon v-show="!isCollection()"
									:source="getTypeIcon(resource.mimetype).iconSource"
									:icon="getTypeIcon(resource.mimetype).iconLarge"
									class="content__img-icon"
								/-->
								<div v-show="isCollection()" class="card-tag">
									<span>{{ $t("pages.content.card.collection") }}</span>
									<base-icon
										:source="getTypeIcon('text/directory').iconSource"
										:icon="getTypeIcon('text/directory').icon"
										class="content__text-icon"
									/>
								</div>
							</div>
						</div>
						<h6 class="content__title">
							{{ resource.title || resource.name }}
						</h6>
					</div>
				</template>
			</base-link>
			<user-has-role :role="isNotStudent">
				<template v:slot:footer>
					<div v-show="!isCollection()" class="footer">
						<div class="footer__separator"></div>
						<div class="footer__content">
							<div class="footer__icon-container">
								<add-content-button
									:resource="resource"
									:client="provider()"
									btn-design="text icon"
									btn-icon-class="footer__content-icon"
									btn-icon="add_circle_outline"
									:multiple="false"
								/>
							</div>
						</div>
					</div>
				</template>
			</user-has-role>
		</div>
	</base-card>
</template>

<script>
import BaseLink from "@components/base/BaseLink";
import AddContentButton from "@components/organisms/AddContentButton";
import UserHasRole from "@components/helpers/UserHasRole";
import contentMeta from "@mixins/contentMeta";
import { getProvider, isCollectionHelper } from "@utils/helpers";

export default {
	components: {
		BaseLink,
		AddContentButton,
		UserHasRole,
	},
	mixins: [contentMeta],
	props: {
		resource: { type: Object, default: () => {} },
		role: { type: String, default: "" },
		inline: { type: Boolean, required: false },
		selectable: { type: Boolean },
	},
	data() {
		return {
			isChecked: false,
			copyModalActive: false,
		};
	},
	computed: {
		query() {
			const queryObject = {
				course: this.$route.query.course,
				topic: this.$route.query.topic,
				isCollection: this.isCollection(),
				q: this.$route.query.q,
			};
			if (this.inline) {
				Object.assign(queryObject, { inline: 1 });
			}
			return (
				this.$route && {
					...queryObject,
				}
			);
		},
	},
	methods: {
		isNotStudent(roles) {
			return this.role === ""
				? roles.some((role) => !role.startsWith("student"))
				: this.role;
		},
		isCollection() {
			return isCollectionHelper(this.resource.properties);
		},
		provider() {
			const provider = getProvider(this.resource.properties);
			return provider ? provider.replace("/n", "").trim() : "Schul-Cloud";
		},
		thumbnail() {
			return this.resource.preview.url;
		},
		isSelectable() {
			return this.selectable;
		},
		linkHandler() {
			if (!this.isChecked) {
				this.$store.dispatch("content/selectElement", this.resource.ref.id);
			} else {
				this.$store.dispatch("content/unselectElement", this.resource.ref.id);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@utils/multiline-ellipsis.scss";

.card-tag {
	position: absolute;
	top: 0;
	left: 0;
	z-index: var(--layer-page);
	padding: var(--space-xs);
	margin: var(--space-sm);
	font-size: var(--text-xs);
	color: var(--color-black);
	background: var(--color-white);
	filter: drop-shadow(0 2px 4px black);
	border-radius: var(--radius-xs);
	opacity: 0.9;
}
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

.img-container > span {
	position: absolute;
	right: 0;
	margin-top: var(--space-xs);
	margin-right: var(--space-xs);
	background-color: var(--color-tertiary);
	border-radius: var(--radius-round);
	opacity: 0.7;
	// stylelint-disable
	/*z-index: 10;*/
	z-index: calc(var(--layer-page) + 1);
	padding: 6px 4px 2px;
	// stylelint-enable
}

.content {
	display: flex;
	flex-direction: column;
	&__img {
		&-thumbnail {
			width: 100%;
			height: 200px;
			background-color: var(--color-white);
			border-radius: var(--radius-md) var(--radius-md) 0 0;
			opacity: 0.8;
			object-fit: cover;
		}
		&-background-gradient {
			position: absolute;
			z-index: var(--layer-page);
			width: 100%;
			height: 100%;
			background: linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.9) 0%,
				rgba(0, 0, 0, 0) 50%
			);
			border-radius: var(--radius-md) var(--radius-md) 0 0;
			opacity: 0.8;
		}
		&-icon {
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: var(--layer-page);
			font-size: var(--space-xl-3) !important;
			filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 1));
			opacity: 0.9;
			transform: translate(-50%, -50%);
		}
		&-checkbox {
			position: absolute;
			top: 5%;
			left: 90%;
			z-index: var(--layer-page);
			color: var(--color-white);
			cursor: pointer;
		}
	}
	&__title {
		height: calc(var(--heading-6) * var(--line-height-sm) * 3);
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
