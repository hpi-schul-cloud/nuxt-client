<template>
	<v-card v-bind="$attrs">
		<div class="content-card" data-testid="learningstore-searchresult-item">
			<base-link
				class="title-link"
				:to="{
					name: 'content-id',
					params: { id: resource.properties['ccm:replicationsourceuuid'][0] },
					query: query,
				}"
				:no-style="true"
			>
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
									style="color: rgba(var(--v-theme-white)); margin-bottom: 0"
								/>
							</span>
							<div class="content__img-background-gradient" />

							<img
								:src="thumbnail()"
								class="content__img-thumbnail"
								alt=""
								role="img"
							/>
							<div v-show="isCollection()" class="card-tag">
								<span>{{ $t("pages.content.card.collection") }}</span>
								<v-icon
									class="custom-icon content__text-icon"
									icon="$ic_collection"
								/>
							</div>
						</div>
					</div>
					<h6 class="content__title">
						{{ resource.title || resource.name }}
					</h6>
				</div>
			</base-link>
			<user-has-role :role="isNotStudent">
				<div v-show="!isCollection()" class="footer">
					<div class="footer__separator" />
					<div class="footer__content">
						<div class="footer__icon-container">
							<add-content-button
								:resource="resource"
								:client="provider()"
								round
								:multiple="false"
							/>
						</div>
					</div>
				</div>
			</user-has-role>
		</div>
	</v-card>
</template>

<script>
import { contentModule } from "@/store";
import BaseLink from "@/components/base/BaseLink";
import AddContentButton from "@/components/lern-store/AddContentButton";
import UserHasRole from "@/components/helpers/UserHasRole";
import contentMeta from "@/mixins/contentMeta";
import { getProvider, isCollectionHelper } from "@/utils/helpers";

export default {
	components: {
		BaseLink,
		AddContentButton,
		UserHasRole,
	},
	mixins: [contentMeta],
	props: {
		resource: { type: Object, default: () => ({}) },
		renderer: { type: Object, default: () => ({}) },
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
				contentModule.selectElement(this.resource.ref.id);
			} else {
				contentModule.unselectElement(this.resource.ref.id);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;
@use "@/styles/mixins" as *;
@use "@/utils/multiline-ellipsis.scss" as *;

.card-tag {
	position: absolute;
	top: 0;
	left: 0;
	z-index: var(--layer-page);
	padding: var(--space-xs);
	margin: var(--space-sm);
	font-size: var(--text-xs);
	color: rgba(var(--v-theme-on-surface));
	background: rgba(var(--v-theme-white));
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
	color: rgba(var(--v-theme-white));
	background-color: rgba(var(--v-theme-on-surface));
	border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.img-container > span {
	position: absolute;
	right: 0;
	margin-top: var(--space-xs);
	margin-right: var(--space-xs);
	background-color: rgba(var(--v-theme-on-surface));
	border-radius: var(--radius-round);
	opacity: 0.7;
	// stylelint-disable
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
			background-color: rgba(var(--v-theme-white));
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
			color: rgba(var(--v-theme-white));
			cursor: pointer;
		}
	}

	&__title {
		height: calc(var(--heading-6) * var(--line-height-sm) * 3);
		margin: var(--space-xs) var(--space-sm);
		color: rgba(var(--v-theme-on-surface));

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
		border-top: 1px solid map.get($grey, base);
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		padding: var(--space-xs-4) 0;
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
.v-input--selection-controls__input {
	margin-right: 0 !important;
}
.v-input__control {
	margin: 0;
	padding: 0;
}

.v-messages {
	min-height: 0px;
}

.theme--light {
	min-height: 0px;
}
</style>
