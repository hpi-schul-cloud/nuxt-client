<template>
	<v-autocomplete
		:label="label"
		:aria-label="ariaLabel"
		:items="items"
		chips
		deletable-chips
		multiple
		clearable
		@change="selectionChanged"
		v-model="model"
	>
		<template v-slot:prepend-item>
			<div v-if="selectAll">
				<v-list-item ripple @mousedown.prevent @click="toggle">
					<v-list-item-action>
						<v-icon :class="icon" class="fa"> </v-icon>
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
import { defineComponent, PropType, ref, computed, nextTick } from "vue";

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

		const items = computed(() => {
			return props.users.map((user: User) => {
				return {
					text: user.firstName + " " + user.lastName,
					value: user.id,
				};
			});
		});

		const userIds = computed(() => {
			return props.users.map((user: User) => {
				return user.id;
			});
		});

		const selectionChanged = () => {
			emit("input", model.value);
		};

		const allUsersSelected = computed(() => {
			return model.value.length === userIds.value.length;
		});

		const icon = computed(() => {
			if (allUsersSelected.value) return "fa-check-square";
			return "fa-square-o";
		});

		const toggle = () => {
			nextTick(() => {
				if (allUsersSelected.value) {
					model.value = [];
					selectionChanged();
				} else {
					model.value = userIds.value;
					selectionChanged();
				}
			});
		};

		return {
			model,
			items,
			selectionChanged,
			toggle,
			icon,
		};
	},
});
</script>
