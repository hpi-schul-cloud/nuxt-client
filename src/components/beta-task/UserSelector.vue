<template>
	<v-autocomplete
		:label="label"
		:aria-label="ariaLabel"
		:items="items"
		chips
		deletable-chips
		multiple
		clearable
		:rules="rules"
		v-model="model"
		attach
		validate-on-blur
		@blur="handleBlur"
		@update:error="handleError"
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
import {
	defineComponent,
	PropType,
	ref,
	computed,
	nextTick,
	inject,
} from "vue";
import { User } from "./types/User";
import VueI18n from "vue-i18n";
import { useDebounceFn } from "@vueuse/core";

export default defineComponent({
	name: "UserSelector",
	props: {
		users: { type: Array as PropType<User[]>, required: true },
		selection: { type: Array as PropType<User[]>, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
	},
	emits: ["input"],
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

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
		let valid = true;

		type ValidationRule = (value: [] | null) => boolean | string;

		const requiredRule: ValidationRule = (value: [] | null) => {
			return value === null || value.length === 0
				? t("common.labels.students")
				: true;
		};

		const rules: ValidationRule[] = [];

		if (props.required) {
			rules.push(requiredRule);
		}

		const handleBlur = useDebounceFn(() => {
			const selectedUsers = props.users.filter((user: User) => {
				return model.value.includes(user.id);
			});

			if (valid) {
				emit("input", selectedUsers);
			}
		}, 200);

		const handleError = (hasError: boolean) => {
			if (hasError) {
				valid = false;
			} else {
				valid = true;
			}
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
					handleBlur();
				} else {
					model.value = userIds.value;
					handleBlur();
				}
			});
		};

		return {
			items,
			model,
			icon,
			rules,
			toggle,
			handleBlur,
			handleError,
		};
	},
});
</script>
