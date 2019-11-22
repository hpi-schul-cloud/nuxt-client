<template>
	<ul>
		<li v-for="post in posts" :key="post"
			>{{ post.title }}
			hhhhhhh
		</li>
	</ul>
</template>
<script>
import { getPosts } from "../../store/ghost";

export default {
	async asyncData() {
		const posts = await getPosts();
		return { posts: posts };
	},

	head() {
		return {
			title: "MINT-EC Wilkommenspaket",
		};
	},
	find() {
		this.$store.dispatch("ghost/find");
	},
};
</script>
