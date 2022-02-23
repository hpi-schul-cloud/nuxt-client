<template>
	<div>
		<div>{{ userName }}</div>
		<div>{{ isMounted }}</div>
		<div>{{ pageData }}</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

type PageData = {
	id: string;
	name: string;
	surname: string;
};

@Component
class Index extends Vue {
	isMounted: boolean = false;
	pageData: PageData = {
		id: "",
		name: "",
		surname: "",
	};

	getData() {
		this.pageData = { id: "123", name: "Murat", surname: "Merdoglu" };
	}

	get userName() {
		return `User: ${this.pageUser.firstName} ${this.pageUser.lastName}`;
	}

	get pageUser() {
		return this.$user;
	}
	mounted() {
		this.isMounted = true;
		console.log("%cindex.vue line:40 mounted", "color: #007acc;", "mounted");
	}

	created() {
		this.getData();
		console.log("%cindex.vue line:45 created", "color: #007acc;", "created");
	}

	beforeCreate() {
		console.log(
			"%cindex.vue line:50 beforeCreate",
			"color: #007acc;",
			"beforeCreate"
		);
	}
}

export default Index;
</script>
