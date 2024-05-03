<template>
	<div
		data-testid="board-link-element"
		ref="linkContentElementDisplay"
		tabindex="-1"
	>
		<ContentElementBar
			:hasGreyBackground="true"
			:icon="mdiLink"
			:hasRowStyle="hasListLayout"
		>
			<template #display v-if="imageUrl">
				<v-img :src="imageUrl" alt="" class="rounded-t" />
			</template>
			<template #title>
				{{ title }}
			</template>
			<template #subtitle>
				{{ hostname }}
			</template>
			<template #menu v-if="isEditMode">
				<slot />
			</template>
		</ContentElementBar>
	</div>
</template>

<script lang="ts">
import { ComputedRef, computed, defineComponent, ref } from "vue";
import { mdiLink } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { BOARD_HAS_LIST_LAYOUT } from "@util-board";
import { injectStrict } from "@/utils/inject";

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
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const hostname: ComputedRef<string> = computed(() => {
			try {
				const urlObject = new URL(props.url);
				return urlObject.hostname;
			} catch (e) {
				return "";
			}
		});

		const hasListLayout = ref(injectStrict(BOARD_HAS_LIST_LAYOUT));

		const linkContentElementDisplay = ref(null);

		return {
			hasListLayout,
			hostname,
			linkContentElementDisplay,
			mdiLink,
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
