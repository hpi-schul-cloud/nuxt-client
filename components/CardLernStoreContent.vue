<template>
	<Card @click="open()">
		<div slot="header" class="card-image">
			<CardHeaderImage>
				<img
					:src="data.thumbnail"
					:alt="'Thumbnail for ~' + data.title + '~'"
				/>
			</CardHeaderImage>
		</div>
		<div class="card-content">
			<div class="media">
				<div class="media-content">
					<p class="title is-4">{{ data.title }}</p>
					<p class="subtitle is-6">
						<span v-for="(tag, index) of data.tags" :key="index" class="tag">
							{{ tag }}
						</span>
					</p>
				</div>
			</div>

			<div class="content">
				<p>{{ data.description }}</p>
			</div>
		</div>
		<CardFooter slot="footer" class="content-card-footer">
			<div class="footer-info">
				<p>Anbieter: {{ data.providerName }}</p>
				<p>
					Lizenz:
					<span v-for="(license, index) in data.licenses" :key="index">{{
						license
					}}</span>
				</p>
			</div>
			<div class="footer-actions">
				<button class="button">Melden</button>
				<button class="button is-primary">Ansehen</button>
			</div>
		</CardFooter>
	</Card>
</template>

<script>
import CardHeaderImage from "@components/CardHeaderImage.vue";
import CardFooter from "@components/CardFooter.vue";
import Card from "@components/card.vue";

export default {
	name: "ContentCard",
	components: {
		Card,
		CardHeaderImage,
		CardFooter,
	},
	props: {
		data: {
			type: Object,
			default: function() {},
		},
	},
	methods: {
		open() {
			const win = window.open(this.data.url, "_blank");
			win.focus();
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tag {
	margin-right: 4px;
}
.footer-info {
	flex: 1;
	p {
		margin: 0;
	}
}
.footer-actions .button {
	margin: 0 4px;
	&:first-of-type {
		margin-left: 0;
	}
	&:last-of-type {
		margin-right: 0;
	}
}
</style>
