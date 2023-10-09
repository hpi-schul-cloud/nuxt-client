<template>
	<div :class="backgroundClass">
		<v-app-bar dense flat color="transparent">
			<ContentElementTitleIcon v-if="icon" :icon="icon" class="mr-2" />

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

		<div v-if="$slots.subtitle" class="pt-0 pb-4 px-4">
			<slot name="subtitle"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { VuetifyIcon } from "vuetify/types/services/icons";
import ContentElementTitleIcon from "./ContentElementTitleIcon.vue";

export default defineComponent({
	name: "ContentElementBar",
	props: {
		hasGreyBackground: { type: Boolean, required: false },
		icon: { type: String as PropType<VuetifyIcon>, required: false },
	},
	components: { ContentElementTitleIcon },
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
