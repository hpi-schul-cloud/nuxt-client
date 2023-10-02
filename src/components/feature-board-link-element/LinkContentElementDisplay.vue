<template>
	<a :href="url" target="_blank">
		<v-card
			data-testid="board-link-element"
			dense
			elevation="0"
			outlined="true"
			:ripple="false"
			tabindex="0"
		>
			<v-img v-if="imageUrl" :src="imageUrl"></v-img>

			<v-card-subtitle class="grey lighten-4 black--text text--darken-2">
				<div class="d-flex flex-no-wrap">
					<v-icon class="grey--text text--darken-2" medium>
						{{ mdiLink }}
					</v-icon>
					<div
						class="subtitle-1 text-truncate"
						:style="{ fontWeight: 700, marginLeft: '10px' }"
						data-testid="board-link-element-display-content"
					>
						{{ linkTitle }}
					</div>
				</div>
				<div class="text-truncate">
					{{ urlWithoutProtocol }}
				</div>
			</v-card-subtitle>
		</v-card>
	</a>
</template>

<script lang="ts">
import { ComputedRef, computed, defineComponent } from "vue";
import { mdiLink } from "@mdi/js";

export default defineComponent({
	name: "LinkContentElementDisplay",
	components: {},
	props: {
		url: {
			type: String,
			required: true,
		},
		openGraphData: {
			type: Object,
			required: false,
		},
	},
	setup(props) {
		const imageUrl: ComputedRef<string> = computed(() => {
			return props.openGraphData?.image?.url;
		});
		const linkTitle: ComputedRef<string> = computed(() => {
			return props.openGraphData?.title;
		});
		const urlWithoutProtocol: ComputedRef<string> = computed(() => {
			try {
				const urlObject = new URL(props.url);
				return urlObject.hostname;
			} catch (e) {
				console.error(`valid url expected, but got this: ${props.url}`);
			}
			return props.url;
		});
		return { linkTitle, mdiLink, imageUrl, urlWithoutProtocol };
	},
});
</script>

<style scoped>
a {
	text-decoration: none;
}
</style>
