<template>
	<div>
		<h2 v-show="!editing" @click="toggleEdit">{{ titleView }}</h2>
		<v-text-field
			v-show="editing"
			ref="titleRef"
			v-model="title"
			solo
			flat
			@input="$emit('input', $event)"
			@blur="toggleEdit"
		/>
	</div>
</template>

<script>
import { ref, watch, nextTick, computed } from "@vue/composition-api";
export default {
	name: "CardTitle",
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const title = ref(props.value);

		const editing = ref(false);
		const toggleEdit = async () => {
			editing.value = !editing.value;
			if (editing.value) {
				await nextTick();
				focusInput();
			}
		};

		const titleRef = ref(null);
		const focusInput = () => {
			titleRef.value.focus();
		};

		const titleView = computed(() => {
			if (title.value === "") {
				return props.label;
			}

			return title.value;
		});

		watch(
			() => props.value,
			(newValue) => {
				title.value = newValue;
			}
		);

		return {
			title,
			titleView,
			titleRef,
			editing,
			toggleEdit,
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
