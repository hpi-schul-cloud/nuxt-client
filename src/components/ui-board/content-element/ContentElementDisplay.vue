<template>
	<div>
		<div class="content-element-bar-display">
			<slot name="display" />
		</div>

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
</script>

<style type="text/scss" scoped>
.menu {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
}
.content-element-bar-display:hover {
	filter: brightness(80%);
}
</style>
