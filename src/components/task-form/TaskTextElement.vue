<template>
	<v-card class="mb-6">
		<v-btn
			fab
			outlined
			color="secondary"
			x-small
			class="delete-element-btn"
			@click="() => $emit('delete-element')"
		>
			<v-icon size="18">{{ mdiTrashCanOutline }}</v-icon>
		</v-btn>
		<v-btn
			fab
			outlined
			color="secondary"
			x-small
			class="drag-element-btn handle"
		>
			<v-icon size="18">{{ mdiDragHorizontalVariant }}</v-icon>
		</v-btn>
		<c-k-editor
			v-model="text"
			:placeholder="placeholder"
			:disabled="disabled"
			@input="handleInput"
		/>
		<slot />
	</v-card>
</template>

<script lang="ts">
import { ref } from "@vue/composition-api";
import { mdiTrashCanOutline, mdiDragHorizontalVariant } from "@mdi/js";
import CKEditor from "./CKEditor.vue";

export default {
	components: { CKEditor },
	props: {
		value: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: "",
		},
		disabled: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const text = ref(props.value);
		const handleInput = () => emit("input", text.value);

		return {
			mdiTrashCanOutline,
			mdiDragHorizontalVariant,
			text,
			handleInput,
		};
	},
};
</script>

<style lang="scss" scoped>
.delete-element-btn {
	position: absolute;
	top: -5px;
	right: -20px;
	background-color: var(--v-white-base);
}

.drag-element-btn {
	position: absolute;
	top: 32px;
	right: -20px;
	z-index: var(--layer-page);
	background-color: var(--v-white-base);
}
</style>
