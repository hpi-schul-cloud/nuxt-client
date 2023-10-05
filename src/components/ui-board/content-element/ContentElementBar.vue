<template>
	<div :class="backgroundClass">
		<v-app-bar dense flat color="transparent">
			<v-icon
				v-if="icon"
				color="black"
				class="mr-2"
				size="18"
				data-testid="file-description-icon"
				>{{ icon }}</v-icon
			>

			<v-toolbar-title
				v-if="$slots.title"
				data-testid="content-element-title"
				inactive
			>
				<slot name="title"></slot>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<slot name="menu"></slot>
		</v-app-bar>

		<div class="pt-0 pb-4 px-4">
			<slot name="subtitle"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "ContentElementBar",
	props: {
		hasGreyBackground: { type: Boolean, required: false },
		icon: { type: String, required: false },
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
