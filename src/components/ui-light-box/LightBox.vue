<template>
	<v-overlay z-index="1000" :value="isLightBoxOpen">
		<div
			tabindex="0"
			style="display: flex; flex-direction: column; width: 100vw; height: 100vh"
		>
			<div
				style="
					align-items: stretch;
					background: var(--shades-v-white-base, #fff);
					display: flex;
					height: 80px;
					justify-content: start;
				"
			>
				<div
					style="
						align-items: center;
						display: flex;
						justify-content: center;
						padding: 16px;
					"
				>
					<v-btn icon style="color: var(--v-secondary-base)" @click="close">
						<v-icon>{{ mdiClose }}</v-icon>
					</v-btn>
				</div>
				<div
					style="
						align-items: center;
						display: flex;
						gap: 4px;
						justify-content: center;
						padding: 16px;
					"
				>
					<v-icon style="color: var(--shades-v-black-base, #1b1b1b)">{{
						mdiFileDocumentOutline
					}}</v-icon>
					<span
						style="
							color: var(--shades-v-black-base, #1b1b1b);
							/* Emphasis/text-subtitle-1_bold */
							font-family: PT Sans Narrow;
							font-size: 16px;
							font-style: normal;
							font-weight: 700;
							line-height: 24px; /* 150% */
							letter-spacing: 0.15px;
						"
					>
						{{ name }}
					</span>
				</div>
			</div>
			<div
				style="
					align-items: center;
					display: flex;
					height: calc(100% - 80px);
					justify-content: center;
				"
			>
				<img
					style="max-height: 90%; max-width: 90%"
					loading="lazy"
					:src="url"
					:alt="alt"
					v-click-outside="close"
				/>
			</div>
		</div>
	</v-overlay>
</template>

<script lang="ts">
import { mdiClose, mdiFileDocumentOutline } from "@mdi/js";
import { onKeyStroke } from "@vueuse/core";
import { computed, defineComponent } from "vue";
import { useInternalLightBox } from "./LightBox.composable";

export default defineComponent({
	name: "LightBox",
	setup() {
		const { close, isLightBoxOpen, lightBoxOptions } = useInternalLightBox();

		const url = computed(() =>
			lightBoxOptions.value ? lightBoxOptions.value.url : ""
		);

		const alt = computed(() =>
			lightBoxOptions.value ? lightBoxOptions.value.alt : ""
		);

		const name = computed(() =>
			lightBoxOptions.value ? lightBoxOptions.value.name : ""
		);

		onKeyStroke("Escape", (e) => close(), { eventName: "keydown" });

		return {
			alt,
			close,
			isLightBoxOpen,
			mdiClose,
			mdiFileDocumentOutline,
			name,
			url,
		};
	},
});
</script>
