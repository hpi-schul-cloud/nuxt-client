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
			class="rounded-b pb-4"
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
				class="text-subtitle-1 d-inline-block font-weight-bold d-flex flex-nowrap gb-1 pt-5 pb-0"
			>
				<ContentElementTitleIcon v-if="icon" :icon="icon" class="mr-2" />

				<LineClamp
					v-if="$slots.title"
					class="font-narrow content-element-title flex-grow-1"
				>
					<slot name="title" />
				</LineClamp>

				<div v-if="$slots.element" class="flex-grow-1">
					<slot name="element" />
				</div>

				<div v-if="$slots.menu && !$slots.display" class="pl-10">
					<div class="three-dot-menu">
						<slot name="menu" />
					</div>
				</div>
			</v-card-title>
			<v-card-subtitle
				v-if="$slots.subtitle || $slots.description"
				class="pt-1"
			>
				<div v-if="$slots.subtitle" class="gb-2">
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
import ContentElementDisplay from "./ContentElementDisplay.vue";
import LineClamp from "../LineClamp.vue";
import ContentElementTitleIcon from "./ContentElementTitleIcon.vue";
import { IconProps } from "vuetify";

export default defineComponent({
	name: "ContentElementBar",
	props: {
		hasGreyBackground: { type: Boolean, required: false },
		icon: { type: String as PropType<IconProps["icon"]>, required: false },
	},
	components: {
		ContentElementDisplay,
		ContentElementTitleIcon,
		LineClamp,
	},
	setup(props) {
		const backgroundClass = computed(() => {
			return props.hasGreyBackground ? "bg-grey-lighten-4" : "";
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
a.v-card .content-element-bar:hover {
	.content-element-title {
		text-decoration: underline;
	}
	.content-element-display {
		filter: brightness(80%);
	}
}
.three-dot-menu {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
	.v-icon {
		color: var(--v-black-base);
	}
}
.v-card__text {
	margin-top: 0px;
}

.content-element-title :deep(a) {
	color: var(--v-black-base) !important;
	text-decoration: none;
}
.content-element-title :deep(a:hover) {
	text-decoration: underline;
}
</style>
