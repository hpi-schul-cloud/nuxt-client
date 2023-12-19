<template>
	<v-card
		data-testid="board-link-element"
		ref="linkContentElementDisplay"
		dense
		elevation="0"
		variant="outlined"
		:ripple="false"
		tabindex="0"
		:loading="isLoading ? 'primary' : false"
	>
		<div class="menu" v-if="isEditMode">
			<slot />
		</div>

		<a :href="sanitizedUrl" target="_blank">
			<v-img v-if="imageUrl" :src="imageUrl" alt="" />

			<ContentElementBar :hasGreyBackground="true" :icon="mdiLink">
				<template #title>
					<ContentElementTitle>
						{{ title }}
					</ContentElementTitle>
				</template>
				<template #subtitle>
					{{ hostname }}
				</template>
			</ContentElementBar>
		</a>
	</v-card>
</template>

<script lang="ts">
import { ComputedRef, computed, defineComponent, ref } from "vue";
import { mdiLink } from "@mdi/js";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { ContentElementBar, ContentElementTitle } from "@ui-board";

export default defineComponent({
	name: "LinkContentElementDisplay",
	components: { ContentElementBar, ContentElementTitle },
	props: {
		url: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			require: true,
		},
		imageUrl: {
			type: String,
			required: false,
		},
		isLoading: {
			type: Boolean,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const sanitizedUrl = computed(() => sanitizeUrl(props.url));
		const hostname: ComputedRef<string> = computed(() => {
			try {
				const urlObject = new URL(props.url);
				return urlObject.hostname;
			} catch (e) {
				return "";
			}
		});

		const linkContentElementDisplay = ref(null);

		return {
			mdiLink,
			sanitizedUrl,
			hostname,
			linkContentElementDisplay,
		};
	},
});
</script>

<style scoped>
a {
	text-decoration: none;
}
.menu {
	position: absolute;
	right: 4px;
	top: 4px;
	z-index: 100;
}
</style>
