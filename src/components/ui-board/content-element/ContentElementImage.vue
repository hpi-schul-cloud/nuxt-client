<template>
	<div>
		<slot name="image" />

		<div class="menu">
			<slot name="menu" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { VuetifyIcon } from "vuetify/types/services/icons";

export default defineComponent({
	name: "ContentElementImage",
	props: {
		hasGreyBackground: { type: Boolean, required: false },
		icon: { type: String as PropType<VuetifyIcon>, required: false },
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
// enable to place images / previews / whiteboards directly in the contentbar
</script>

<style type="text/scss">
.content-element-bar {
	line-height: 24px;
	color: var(--v-black-base);
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
