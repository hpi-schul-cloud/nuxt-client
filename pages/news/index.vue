<template>
	<div>
		<!-- TODO redo without bulma -->
		<p>News</p>
		<section v-if="news && news.length > 0" class="section">
			<div class="tile is-ancestor">
				<div class="tile is-vertical is-8">
					<div class="tile">
						<div class="tile is-parent is-vertical">
							<article class="tile is-child notification is-primary">
								<p class="title">{{ news[1].title }}</p>
								<p class="subtitle">
									<BaseLink
										:to="{ name: 'news-id', params: { id: news[1]._id } }"
										>Weiterlesen</BaseLink
									>
								</p>
							</article>
							<article class="tile is-child notification is-warning">
								<p class="title">{{ news[2].title }}</p>
								<p class="subtitle">
									<BaseLink
										:to="{ name: 'news-id', params: { id: news[2]._id } }"
										>Weiterlesen</BaseLink
									>
								</p>
							</article>
						</div>
						<div class="tile is-parent">
							<article class="tile is-child notification is-info">
								<p class="title">{{ news[0].title }}</p>
								<p class="subtitle">
									<BaseLink
										:to="{ name: 'news-id', params: { id: news[0]._id } }"
										>Weiterlesen</BaseLink
									>
								</p>
								<figure class="image is-4by3">
									<img src="https://bulma.io/images/placeholders/640x480.png" />
								</figure>
							</article>
						</div>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child notification is-danger">
							<p class="title">{{ news[3].title }}</p>
							<div class="content">
								<!-- Content -->
							</div>
						</article>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	head() {
		return {
			title: "News",
		};
	},
	computed: {
		...mapGetters("news", {
			news: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("news/find");
		},
	},
};
</script>
