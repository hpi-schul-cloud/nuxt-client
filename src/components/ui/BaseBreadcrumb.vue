
<template>
  <ul class="breadcrumb">
    <li v-for="input in inputs" v-bind:key="input.text">
      <BaseLink v-if="typeof input !== 'string'" v-bind="removeText(input)">{{ input.text }}</BaseLink>
      <!-- <a v-if="input.href" :href="input.href">{{ input.text }}</a> -->
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
			description: "Lorem ipsum",
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
ul.breadcrumb {
	padding: 10px 16px;
	list-style: none;
	background-color: #eee;
}

/* Display list items side by side */
ul.breadcrumb li {
	display: inline;
	font-size: 18px;
}

/* Add a slash symbol (/) before/behind each list item */
ul.breadcrumb li + li:before {
	padding: 8px;
	color: black;
	content: "/\00a0";
}

/* Add a color to all links inside the list */
ul.breadcrumb li a {
	color: #0275d8;
	text-decoration: none;
}

/* Add a color on mouse-over */
ul.breadcrumb li a:hover {
	color: #01447e;
	text-decoration: underline;
}
</style>
