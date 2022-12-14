<template>
	<div>
		<h2 v-if="!editing" @click="toggleEdit">{{ titleView }}</h2>
		<v-text-field
			v-if="editing"
			ref="titleRef"
			v-model="title"
			solo
			flat
			:placeholder="placeholder"
			@input="handleInput"
			@blur="toggleEdit"
		/>
	</div>
</template>

<script>
import { ref, watch, nextTick, computed } from "@vue/composition-api";
export default {
	name: "CardTitle",
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
		editable: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const title = ref(props.value);
		const titleRef = ref(null);
		const editing = ref(false);

		const toggleEdit = async () => {
			if (props.editable) {
				editing.value = !editing.value;
				if (editing.value) {
					await nextTick();
					focusInput();
				}
			}
		};

		const focusInput = () => {
			titleRef.value.focus();
		};

		const titleView = computed(() => {
			if (title.value === "") {
				return props.placeholder;
			}

			return title.value;
		});

		watch(
			() => props.value,
			(newValue) => {
				title.value = newValue;
			}
		);

		const handleInput = () => emit("input", title.value);

		return {
			title,
			titleView,
			titleRef,
			editing,
			toggleEdit,
			handleInput,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep .v-text-field .v-text-field__details {
	display: none;
}

::v-deep .v-text-field .v-input__slot {
	padding: 0 !important;
	margin-bottom: 0;
}

::v-deep .v-text-field input {
	max-height: none;
	padding: 0;
	margin-top: var(--space-xl);
	margin-bottom: var(--space-sm);
	font-family: var(--font-accent);
	font-size: var(--heading-2);
	font-weight: var(--font-weight-normal);
	line-height: var(--line-height-sm);
	color: var(--v-black-base);
}
</style>
