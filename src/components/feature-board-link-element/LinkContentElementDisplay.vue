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
		:hover="isHovered"
	>
		<div class="menu" :class="boardMenuClasses">
			<slot />
		</div>
		<a :href="sanitizedUrl" target="_blank">
			<v-img v-if="imageUrl" :src="imageUrl" alt="" />

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
						{{ title }}
					</div>
				</div>
				<div class="text-truncate">
					{{ urlWithoutProtocol }}
				</div>
			</v-card-subtitle>
		</a>
	</v-card>
</template>

<script lang="ts">
import { ComputedRef, computed, defineComponent, ref } from "vue";
import { mdiLink } from "@mdi/js";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useElementHover } from "@vueuse/core";

export default defineComponent({
	name: "LinkContentElementDisplay",
	components: {},
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
		const urlWithoutProtocol: ComputedRef<string> = computed(() => {
			try {
				const urlObject = new URL(props.url);
				return urlObject.hostname;
			} catch (e) {
				console.error(`valid url expected, but got this: ${props.url}`);
			}
			return props.url;
		});

		const linkContentElementDisplay = ref(null);
		const isHovered = useElementHover(linkContentElementDisplay);
		const boardMenuClasses = computed(() => {
			if (props.isEditMode && isHovered.value === true) {
				return "";
			}
			return "hidden";
		});

		return {
			mdiLink,
			sanitizedUrl,
			urlWithoutProtocol,
			linkContentElementDisplay,
			boardMenuClasses,
			isHovered,
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
.hidden {
	transition: opacity 200ms;
	opacity: 0;
}
</style>
