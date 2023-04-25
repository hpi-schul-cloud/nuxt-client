<template>
	<v-autocomplete
		:disabled="isLoading"
		:label="label"
		:aria-label="ariaLabel"
		:items="items"
		ref="user-selector"
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
					<v-icon>{{ icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>{{
						$t("components.betaTask.userSelector.courseSelection")
					}}</v-list-item-title>
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
	toRef,
	onBeforeMount,
} from "vue";
import { User, COURSE_ASSIGNMENT } from "./types/User";
import { ArrayValidationRule } from "./types/Validation";
import VueI18n from "vue-i18n";
import { useDebounceFn } from "@vueuse/core";
import { useUserSelectorState } from "./state/UserSelector.composable";
import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from "@mdi/js";

export default defineComponent({
	name: "UserSelector",
	props: {
		courseId: { type: String, required: true },
		selection: { type: Array as PropType<User[]>, default: () => [] },
		courseAssignment: { type: Boolean, default: false },
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

		const { fetchStudents, users, userIds, items, isLoading } =
			useUserSelectorState(toRef(props, "courseId"));

		const model = ref<string[]>([]);
		let valid = true;

		onBeforeMount(async () => {
			await fetchStudents(props.courseId);

			model.value = props.courseAssignment
				? userIds.value
				: props.selection.map((user: User) => {
						return user.id;
				  });
		});

		const requiredRule: ArrayValidationRule = (value: [] | null) => {
			return value === null || value.length === 0
				? t("components.betaTask.userSelector.validation.required")
				: true;
		};

		const rules: ArrayValidationRule[] = [];

		if (props.required) {
			rules.push(requiredRule);
		}

		const handleBlur = useDebounceFn(() => {
			const selectedUsers = users.value.filter((user: User) => {
				return model.value.includes(user.id);
			});

			if (valid && !allUsersSelected.value) {
				emit("input", selectedUsers);
			}
			if (valid && allUsersSelected.value) {
				emit("input", COURSE_ASSIGNMENT);
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
			return allUsersSelected.value
				? mdiCheckboxMarked
				: mdiCheckboxBlankOutline;
		});

		const toggle = () => {
			nextTick(() => {
				if (allUsersSelected.value) {
					model.value = [];
				} else {
					model.value = userIds.value;
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
			isLoading,
		};
	},
});
</script>
