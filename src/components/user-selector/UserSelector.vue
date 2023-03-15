<template>
	<v-autocomplete
		:label="label"
		:aria-label="ariaLabel"
		:items="items"
		chips
		deletable-chips
		multiple
		clearable
		@change="onChange"
		v-model="model"
	></v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from "vue";

interface User {
	id: string;
	firstName: string;
	lastName: string;
}
export default defineComponent({
	name: "UserSelector",
	props: {
		users: { type: Array as PropType<User[]>, required: true },
		value: { type: Array as PropType<string[]>, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
	},
	emits: ["input"],
	setup(props, { emit }) {
		const model = ref(props.value);

		watch(
			() => props.value,
			(newValue) => {
				model.value = newValue;
			}
		);

		const items = computed(() => {
			return props.users.map((user: User) => {
				return {
					text: user.firstName + " " + user.lastName,
					value: user.id,
				};
			});
		});

		const onChange = (selectedUsers: string[]) => {
			emit("input", selectedUsers);
		};

		return {
			model,
			items,
			onChange,
		};
	},
});
</script>
