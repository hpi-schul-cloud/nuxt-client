<template>
	<div tabindex="-1" class="content-element-bar">
		<div v-if="$slots.display">
			<ContentElementDisplay>
				<template #display>
					<slot name="display" />
				</template>

				<template #menu>
					<slot name="menu" />
				</template>
			</ContentElementDisplay>
		</div>
		<div
			:class="backgroundClass"
			class="rounded-b"
			v-if="
				icon ||
				$slots.title ||
				$slots.menu ||
				$slots.element ||
				$slots.subtitle ||
				$slots.description
			"
		>
			<v-card-title
				class="subtitle-1 d-inline-block font-weight-bold d-flex flex-nowrap"
			>
				<ContentElementTitleIcon v-if="icon" :icon="icon" class="mr-2" />

				<LineClamp v-if="$slots.title" class="black--text font-narrow">
					<slot name="title" />
				</LineClamp>

				<div v-if="$slots.element" class="flex-grow-1">
					<slot name="element" />
				</div>

				<div
					v-if="$slots.menu && !$slots.display"
					class="three-dot-menu ml-auto"
				>
					<slot name="menu" />
				</div>
			</v-card-title>
			<v-card-subtitle>
				<div v-if="$slots.subtitle" class="gb-2 subtitle">
					<slot name="subtitle" />
				</div>

				<div v-if="$slots.description" class="gb-2 description">
					<slot name="description" />
				</div>
			</v-card-subtitle>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { VuetifyIcon } from "vuetify/types/services/icons";
import ContentElementDisplay from "./ContentElementDisplay.vue";
import LineClamp from "../LineClamp.vue";
import ContentElementTitleIcon from "./ContentElementTitleIcon.vue";

export default defineComponent({
	name: "ContentElementBar",
	props: {
		hasGreyBackground: { type: Boolean, required: false },
		icon: { type: String as PropType<VuetifyIcon>, required: false },
	},
	components: {
		ContentElementDisplay,
		ContentElementTitleIcon,
		LineClamp,
	},
	setup(props) {
		const backgroundClass = computed(() => {
			return props.hasGreyBackground ? "grey lighten-4" : "";
		});

		return {
			backgroundClass,
		};
	},
});
</script>

<style scoped type="text/scss">
.font-narrow {
	font-family: var(--font-accent) !important;
}

.content-element-bar {
	line-height: 24px;
	color: var(--v-black-base);
}
.content-element-bar:hover {
	.content-element-title {
		text-decoration: underline;
	}
	.content-element-bar-display {
		filter: brightness(80%);
	}
}
.subtitle,
.description {
	line-height: 20px;
}
.three-dot-menu {
	margin-top: -6px;
	margin-right: -6px;
	.v-icon {
		color: var(--v-black-base);
	}
}
.v-card__text {
	margin-top: 0px;
}

.line-clamp :deep(a) {
	color: var(--v-black-base) !important;
	text-decoration: none;
}
.line-clamp :deep(a:hover) {
	text-decoration: underline;
}
</style>
