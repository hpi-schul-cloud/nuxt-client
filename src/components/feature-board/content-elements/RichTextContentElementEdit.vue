<template>
	<div class="cursor-text">
		<ck-editor
			v-model="modelValue"
			@focus="onFocus"
			:placeholder="
				$t('components.cardElement.richTextElement.placeholder').toString()
			"
			mode="simple"
		/>
	</div>
</template>
<script lang="ts">
import CkEditor from "@/components/editor/CKEditor.vue";
import { Fn, useEventListener, useVModel } from "@vueuse/core";
import { computed, defineComponent, onUnmounted, onMounted } from "vue";

export default defineComponent({
	name: "RichTextContentElementEdit",
	components: { CkEditor },
	props: {
		value: {
			type: String,
			required: true,
		},
		autofocus: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:value"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);

		// let bubbleClickListenerCleanup: Fn | undefined = undefined;

		const onFocus = () => {
			const elements = computed(() =>
				document.getElementsByClassName("ck-balloon-panel")
			);

			for (const element of elements.value) {
				console.log(element);
				useEventListener(element, "click", (event: PointerEvent) => {
					event.stopPropagation();
					event.stopImmediatePropagation();
					// event.preventDefault();
				});
			}
			// 	const element = computed(() =>
			// 		document.querySelector<HTMLElement>(
			// 			"div.ck-balloon-panel.ck-balloon-panel_visible"
			// 		)
			// 	);
			// 	if (bubbleClickListenerCleanup !== undefined) return;
			// 	bubbleClickListenerCleanup = useEventListener(
			// 		element,
			// 		"click",
			// 		(event: PointerEvent) => {
			// 			event.stopPropagation();
			// 			event.stopImmediatePropagation();
			// 			event.preventDefault();
			// 		}
			// 	);
		};

		// onUnmounted(() => {
		// 	if (bubbleClickListenerCleanup) {
		// 		bubbleClickListenerCleanup();
		// 		bubbleClickListenerCleanup = undefined;
		// 	}
		// });

		return { modelValue, onFocus };
	},
});
</script>
<style scoped>
.cursor-text {
	cursor: text;
}
</style>
