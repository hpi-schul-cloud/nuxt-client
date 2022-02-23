<template>
	<div>{{ pageData }}</div>
</template>
<script lang="ts">
import Vue from "vue";

const pageData = {
	id: "",
	name: "",
	surname: "",
};

export default Vue.extend({
	components: {},
	data() {
		return {
			isOpen: false,
			pageData,
		};
	},
	computed: {
		userName() {
			// @ts-ignore
			return `User: ${this.pageData.name} ${this.pageData.surname}  `;
		},
	},
	methods: {
		getData() {
			this.pageData = { id: "123", name: "Murat", surname: "Merdoglu" };
		},
	},
	head() {
		return {
			// @ts-ignore
			title: `${this.isOpen}`,
		};
	},
});
</script>
