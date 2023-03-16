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
	>
		<template v-slot:prepend-item>
			<div v-if="selectAll">
				<v-list-item ripple @mousedown.prevent @click="toggle">
					<v-list-item-action>
						<v-icon class="fa fa-square-o" color="indigo-darken-4"> </v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Select All</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider class="mt-2"></v-divider>
			</div>
		</template>
	</v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from "vue";
import { mdiCheckboxBlankOutline } from "@mdi/js";

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
		selectAll: { type: Boolean },
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

		const toggle = () => {
			console.log("toggle");
		};

		return {
			model,
			items,
			onChange,
			toggle,
			mdiCheckboxBlankOutline,
		};
	},
});
</script>
