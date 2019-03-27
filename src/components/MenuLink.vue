<template>
	<base-link class="link" v-bind="$attrs">
		<slot />
	</base-link>
</template>

<script>
import BaseLink from "@components/ui/BaseLink.vue";

export default {
	name: "MenuLink",
	components: { BaseLink },
};
</script>

<style lang="scss" scoped>
@import "@variables";

.link {
	padding: 12px 16px;
	color: black;
	text-decoration: none;

	&:hover {
		background-color: #f1f1f1;
	}
}
</style>
