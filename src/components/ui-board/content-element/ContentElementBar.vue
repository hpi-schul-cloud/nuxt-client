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
		<div :class="backgroundClass" class="pa-4">
			<div class="d-flex align-start">
				<ContentElementTitleIcon v-if="icon" :icon="icon" class="mr-2" />

				<ContentElementTitle>
					<slot name="title" />
				</ContentElementTitle>

				<div v-if="$slots.element" class="content-element-bar-element">
					<slot name="element" />
				</div>

				<div v-if="$slots.menu && !$slots.display" class="three-dot-menu">
					<slot v-if="$slots.menu && !$slots.display" name="menu" />
				</div>
			</div>

			<div v-if="$slots.subtitle" class="pt-1 gb-1 subtitle">
				<slot name="subtitle" />
			</div>

			<div v-if="$slots.description" class="pt-1 gb-1 description">
				<slot name="description" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { VuetifyIcon } from "vuetify/types/services/icons";
import ContentElementDisplay from "./ContentElementDisplay.vue";
import ContentElementTitle from "./ContentElementTitle.vue";
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
		ContentElementTitle,
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

<style type="text/scss">
.content-element-bar {
	line-height: 24px;
	color: var(--v-black-base);
}
.content-element-bar:hover .content-element-title {
	text-decoration: underline;
}
.content-element-bar:hover .content-element-bar-display {
	filter: brightness(80%);
}
.content-element-bar .subtitle,
.content-element-bar .description {
	line-height: 20px;
}
.content-element-bar .three-dot-menu {
	margin-top: -6px;
	margin-right: -6px;
}
.content-element-bar .three-dot-menu .v-icon {
	color: var(--v-black-base);
}
.content-element-bar .v-card__text {
	margin-top: 0px;
}
</style>
