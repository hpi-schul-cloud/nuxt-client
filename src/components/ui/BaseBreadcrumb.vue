
<template>
  <ul class="breadcrumb">
    <li class="link" v-for="input in inputs" v-bind:key="input.text">
      <BaseLink v-if="typeof input !== 'string'" v-bind="removeText(input)">{{ input.text }}</BaseLink>
      <span v-else>{{ input }}</span>
    </li>
  </ul>
</template>
<script>
import BaseLink from "@components/ui/BaseLink.vue";

export default {
	name: "BaseBreadcrumb",
	props: {
		inputs: {
			type: Array,
			required: true,
		},
	},
	components: { BaseLink },
	methods: {
		removeText({ text, ...input }) {
			return input;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
.breadcrumb {
	padding: 10px 16px;
	list-style: none;

	.link {
		display: inline;
		font-size: 18px;
	}

	/* Add a slash symbol (/) before/behind each list item */
	.link + .link:before {
		padding: 8px;
		content: "/\00a0";
	}
}
</style>
