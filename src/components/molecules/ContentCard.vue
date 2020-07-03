<template>
	<base-card v-bind="$attrs">
		<div class="content-card">
			<base-link
				class="title-link"
				:to="{
					name: 'content-id',
					params: { id: resource.ref.id },
					query: query,
				}"
				:no-style="true"
			>
				<template v:slot:content>
					<div class="content">
						<div class="content__img">
							<div class="img-container">
								<div class="content__img-background-gradient" />

								<img
									:src="thumbnail()"
									class="content__img-thumbnail"
									:alt="$t('pages.content.card.img.alt')"
									role="img"
								/>
								<base-icon
									:source="getTypeIcon(resource.mimetype).iconSource"
									:icon="getTypeIcon(resource.mimetype).iconLarge"
									class="content__img-icon"
								/>
							</div>
						</div>
						<h6 class="content__title">{{ resource.name }}</h6>
					</div>
				</template>
			</base-link>
			<user-has-role :role="isNotStudent">
				<template v:slot:footer>
					<div class="footer">
						<div class="footer__separator"></div>
						<div class="footer__content">
							<div class="footer__icon-container">
								<add-content-button
									:resource="resource"
									:client="provider()"
									btn-design="text icon"
									btn-icon-class="footer__content-icon"
									btn-icon="add_circle_outline"
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

export default {
	components: {
		BaseLink,
		AddContentButton,
		UserHasRole,
	},
	mixins: [contentMeta],
	props: {
		resource: { type: Object, default: () => {} },
		role : { type: String, default: "" },
	},
	data() {
		return {
			isChecked: false,
			copyModalActive: false,
		};
	},
	computed: {
		query() {
			return (
				this.$route && {
					course: this.$route.query.course,
					topic: this.$route.query.topic,
				}
			);
		},
	},
	methods: {
		isNotStudent(roles) {
			return this.role === "" ? roles.some((role) => !role.startsWith("student")) : this.role
		},
		getMetadataAttribute(properties, key) {
			if (Array.isArray(properties[key])) {
				return properties[key][0];
			}
			return null;
		},
		provider() {
			const provider = this.getMetadataAttribute(
				this.resource.properties,
				"ccm:metadatacontributer_provider"
			);
			return provider ? provider.replace("/n", "").trim() : "Schul-Cloud";
		},
		thumbnail() {
			return (
				this.getMetadataAttribute(
					this.resource.properties,
					"ccm:thumbnailurl"
				) || this.resource.preview.url
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@utils/multiline-ellipsis.scss";

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
.content {
	display: flex;
	flex-direction: column;
	min-height: 300px;
	&__img {
		&-thumbnail {
			width: 100%;
			height: 200px;
			background-color: var(--color-black);
			border-radius: var(--radius-md) var(--radius-md) 0 0;
			opacity: 0.8;
			object-fit: cover;
		}
		&-background-gradient {
			position: absolute;
			z-index: var(--layer-page);
			width: 100%;
			height: 50%;
			background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
			border-radius: var(--radius-md) var(--radius-md) 0 0;
			opacity: 0.8;
		}
		&-icon {
			position: absolute;
			top: 40%;
			left: 40%;
			z-index: var(--layer-dropdown);
			font-size: var(--space-xl-3);
			border-radius: var(--radius-round);
			box-shadow: var(--shadow-m);
			opacity: 0.8;
		}
		&-checkbox {
			position: absolute;
			top: 5%;
			left: 90%;
			z-index: var(--layer-dropdown);
			color: var(--color-white);
			cursor: pointer;
		}
	}
	&__title {
		min-height: 62px;
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
