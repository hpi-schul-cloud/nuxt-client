<template>
	<!-- <section class="section">
    <h1>News</h1>
    <div class="columns is-tablet">
      <div
        v-for="(article, i) of news"
        :key="i"
        class="column is-one-third">
        <div class="card">
          <header class="card-header">
            <span class="card-header-title has-text-grey">{{ article.title }}</span>
          </header>
          <div class="card-content">
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <nuxt-link :to="{ name: 'news-id', params: { id: article._id } }">Weiterlesen</nuxt-link>
            </div>
          </footer>
        </div>
      </div>
    </div>
	</section>-->
	<section v-if="news && news.length > 0" class="section">
		<div class="tile is-ancestor">
			<div class="tile is-vertical is-8">
				<div class="tile">
					<div class="tile is-parent is-vertical">
						<article class="tile is-child notification is-primary">
							<p class="title">{{ news[1].title }}</p>
							<p class="subtitle">
								<nuxt-link
									:to="{ name: 'news-id', params: { id: news[1]._id } }"
									>Weiterlesen</nuxt-link
								>
							</p>
						</article>
						<article class="tile is-child notification is-warning">
							<p class="title">{{ news[2].title }}</p>
							<p class="subtitle">
								<nuxt-link
									:to="{ name: 'news-id', params: { id: news[2]._id } }"
									>Weiterlesen</nuxt-link
								>
							</p>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child notification is-info">
							<p class="title">{{ news[0].title }}</p>
							<p class="subtitle">
								<nuxt-link
									:to="{ name: 'news-id', params: { id: news[0]._id } }"
									>Weiterlesen</nuxt-link
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
