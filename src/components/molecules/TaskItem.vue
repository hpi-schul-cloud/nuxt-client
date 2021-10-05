<template>
	<li :class="{ card: 'card', focus: hasFocus }">
		<base-link
			ref="taskItemLink"
			:href="url"
			:no-styles="true"
			class="card-body"
			@keyup="hasFocus = true"
			@blur="hasFocus = false"
		>
			<base-image
				v-if="$attrs.imgSrc"
				v-bind="$attrs"
				class="image"
				role="presentation"
			/>
			<!-- TODO: this progress ring needs to be replaced with a different progress ring that uses fractions (e.g. 9/12)-->
			<progress-ring
				v-else-if="progress"
				id="progress-ring"
				:percent="progress"
			/>
			<div class="card-heading">
				<p class="subtitle">
					{{ subtitle }}
				</p>
				<h2 class="title">
					{{ title }}
				</h2>
			</div>
		</base-link>
		<div class="card-action">
			<span class="status">{{ status }}</span>
			<pulsating-dot
				v-if="actionNeeded"
				id="pulsating-dot"
				color="var(--color-primary)"
			/>
			<span style="position: relative">
				<base-button
					design="text icon"
					aria-label="menu"
					:aria-expanded="contextOpen"
					@click="contextOpen = true"
				>
					<base-icon
						class="footer__content-icon"
						fill="#54616e"
						source="material"
						icon="more_vert"
					/>
				</base-button>
				<context-menu
					:show.sync="contextOpen"
					anchor="top-right"
					:actions="actions"
					v-on="$listeners"
				/>
			</span>
		</div>
	</li>
</template>

<script>
import ProgressRing from "@components/atoms/ProgressRing";
import PulsatingDot from "@components/atoms/PulsatingDot";
import BaseButton from "@basecomponents/BaseButton";
import BaseIcon from "@basecomponents/BaseIcon";
import ContextMenu from "@components/molecules/ContextMenu";
import BaseImage from "@basecomponents/BaseImage";
import BaseLink from "@basecomponents/BaseLink";

export default {
	components: {
		BaseLink,
		ProgressRing,
		PulsatingDot,
		BaseImage,
		BaseButton,
		BaseIcon,
		ContextMenu,
	},
	props: {
		id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
			default: "/",
		},
		title: {
			type: String,
			required: true,
			default: "",
		},
		subtitle: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			default: "",
		},
		progress: {
			type: Number,
			default: 0,
		},
		actionNeeded: {
			type: Boolean,
		},
		actions: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
	data: function () {
		return {
			contextOpen: false,
			hasFocus: false,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
$color-dark-gray: var(--color-gray-medium);

.card {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: auto;
	border-bottom: 1px solid var(--color-gray);
}

.card-body {
	display: flex;
	flex-basis: 95%;
	flex-direction: row;
	align-items: center;
	min-height: 3rem;
	padding: var(--space-md);
	overflow: hidden;
	color: inherit;
	text-decoration: none;
	text-overflow: ellipsis;
	white-space: nowrap;
	&:focus {
		outline: none;
	}
}

.card-heading {
	overflow: hidden;
	h2 {
		margin: 0;
	}
}

.title {
	overflow: hidden;
	font-family: var(--font-primary);
	font-size: var(--text-md);
	line-height: var(--line-height-sm);
	text-overflow: ellipsis;
}

.subtitle {
	margin-bottom: calc(0.5 * (var(--space-xs)));
	overflow: hidden;
	font-size: var(--text-xs);
	line-height: var(--line-height-sm);
	color: $color-dark-gray;
	text-overflow: ellipsis;
	white-space: nowrap;
	.icon {
		margin-left: var(--space-xs-3);
	}
}
.image {
	width: calc(var(--text-md) + var(--text-lg));
	min-width: 2rem;
	height: calc(var(--text-md) + var(--text-lg));
	object-fit: contain;
	margin-right: var(--space-sm);
	border-radius: var(--radius-sm);

	@include breakpoint(tablet) {
		min-width: 2.75rem;
	}
}

.status {
	align-self: center;
	padding: var(--space-xs);
	font-size: var(--text-xs);
	font-style: italic;
	line-height: var(--line-height-sm);
	color: $color-dark-gray;
}

#pulsating-dot {
	align-self: center;
	margin: var(--space-xs);
}

#progress-ring {
	padding: var(--space-xs);
}

.card-action {
	display: flex;
}

.focus {
	outline: 2px solid var(--color-secondary);
	outline-offset: 3px;
}
</style>
