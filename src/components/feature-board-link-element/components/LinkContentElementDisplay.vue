<template>
	<v-card
		data-testid="board-link-element"
		ref="linkContentElementDisplay"
		dense
		elevation="0"
		:outlined="true"
		:ripple="false"
		tabindex="0"
		:loading="isLoading ? 'primary' : false"
	>
		<a :href="sanitizedUrl" target="_blank">
			<v-img v-if="imageUrl" :src="imageUrl" alt="" />
			<div v-if="isEditMode && imageUrl" class="menu">
				<slot />
			</div>

			<ContentElementBar :hasGreyBackground="true" :icon="mdiLink">
				<template #title>
					{{ title }}
				</template>
				<template #subtitle>
					{{ hostname }}
				</template>
				<template #menu v-if="isEditMode && !imageUrl">
					<slot />
				</template>
			</ContentElementBar>
		</a>
	</v-card>
</template>

<script lang="ts">
import { ComputedRef, computed, defineComponent, ref } from "vue";
import { mdiLink } from "@mdi/js";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { ContentElementBar } from "@ui-board";

export default defineComponent({
	name: "LinkContentElementDisplay",
	components: { ContentElementBar },
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
	right: 10px;
	top: 10px;
	z-index: 100;
}
</style>
