<template>
	<div class="content-element-bar-display">
		<div>
			<slot name="display" />
		</div>

		<div class="menu">
			<slot name="menu" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "ContentElementDisplay",
});
</script>

<style type="text/scss" scoped>
.content-element-bar-display .menu {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
}
</style>
