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
		attach
	>
		<template v-slot:prepend-item>
			<v-list-item ripple @mousedown.prevent @click="toggle">
				<v-list-item-action>
					<v-icon :class="icon" class="fa"> </v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Gesamter Kurs</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider class="mt-2"></v-divider>
		</template>
	</v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, nextTick } from "vue";
import { User } from "./types/User";

export default defineComponent({
	name: "UserSelector",
	props: {
		users: { type: Array as PropType<User[]>, required: true },
		selection: { type: Array as PropType<User[]>, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
	},
	emits: ["input", "error"],
	setup(props, { emit }) {
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

		const selectedUserIds = props.selection.map((user: User) => {
			return user.id;
		});

		const model = ref(selectedUserIds);

		const selectionChanged = () => {
			if (props.required && model.value.length === 0) {
				emit("error");
				return;
			}

			const selectedUsers = props.users.filter((user: User) => {
				return model.value.includes(user.id);
			});
			emit("input", selectedUsers);
		};

		const allUsersSelected = computed(() => {
			return model.value.length === userIds.value.length;
		});

		const icon = computed(() => {
			return allUsersSelected.value ? "fa-check-square" : "fa-square-o";
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
			items,
			model,
			selectionChanged,
			toggle,
			icon,
		};
	},
});
</script>
