<template>
	<div>
		<!-- eslint-disable vue/no-v-html -->
		<div v-if="!editable" v-html="content"></div>
		<ck-editor
			v-if="editable"
			v-model="content"
			:placeholder="placeholder"
			:disabled="disabled"
			mode="regular"
			@input="handleInput"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, watch } from "@vue/composition-api";
import CkEditor from "@/components/task-form/CKEditor.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "TaskTextElement",
	components: { CkEditor },
	emits: ["input"],
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		disabled: {
			type: Boolean,
		},
		editable: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const content = ref(props.value);

		watch(
			() => props.value,
			(newValue) => {
				content.value = newValue;
			}
		);

		const handleInput = () => emit("input", content.value);

		return {
			content,
			handleInput,
		};
	},
});
</script>

<style lang="scss" scoped>
::v-deep .ck {
	margin-left: calc(-1 * var(--ck-spacing-standard));
}
</style>
