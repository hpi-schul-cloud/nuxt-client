<template>
	<v-card flat class="mb-6" :class="component">
		<v-btn
			v-show="actionable && elementActive"
			icon
			outlined
			color="secondary"
			class="drag-element-btn handle"
			data-testid="drag-element-btn"
		>
			<v-icon>{{ mdiDrag }}</v-icon>
		</v-btn>
		<v-btn
			v-show="actionable && elementActive"
			icon
			outlined
			color="secondary"
			class="delete-element-btn"
			data-testid="delete-element-btn"
			@click="handleDelete"
		>
			<v-icon>{{ mdiTrashCanOutline }}</v-icon>
		</v-btn>
		<component
			:is="component"
			v-model="model"
			:editable="editable"
			:disabled="disabled"
			:placeholder="`${$t(placeholder)}`"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
		></component>
		<v-btn
			v-show="actionable && elementActive"
			icon
			outlined
			color="secondary"
			class="add-element-btn"
			data-testid="add-element-btn"
			@click="handleAdd"
		>
			<v-icon>{{ mdiPlus }}</v-icon>
		</v-btn>
	</v-card>
</template>

<script lang="ts">
import {
	defineComponent,
	ref,
	watch,
	inject,
	computed,
} from "@vue/composition-api";
import { mdiTrashCanOutline, mdiDrag, mdiPlus } from "@mdi/js";
import { CardElementComponentEnum } from "@/store/types/card-element";
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
import RichTextCardElement from "@/components/card-elements/RichTextCardElement.vue";
import VueI18n from "vue-i18n";

export default defineComponent({
	name: "CardElement",
	components: {
		TitleCardElement,
		RichTextCardElement,
	},
	emits: ["input", "delete-element", "add-element"],
	props: {
		component: {
			type: String,
			default: CardElementComponentEnum.Title,
		},
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
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const model = ref(props.value);

		watch(
			() => props.value,
			(newValue: string) => {
				model.value = newValue;
			}
		);

		const elementActive = ref(false);
		const actionable = computed(
			() => props.component !== CardElementComponentEnum.Title
		);

		const handleInput = () => emit("input", model.value);
		const handleAdd = () => emit("add-element");
		const handleDelete = () => emit("delete-element");
		const handleFocus = () => (elementActive.value = true);
		const handleBlur = () => (elementActive.value = false);

		return {
			model,
			handleInput,
			handleAdd,
			handleDelete,
			handleFocus,
			handleBlur,
			actionable,
			elementActive,
			mdiTrashCanOutline,
			mdiDrag,
			mdiPlus,
		};
	},
});
</script>

<style lang="scss" scoped>
.v-btn {
	position: absolute;
	background-color: var(--v-white-base);
}

.delete-element-btn {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	top: 26px;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	right: -28px;
}

.drag-element-btn {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	top: -18px;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	right: -28px;
}

.add-element-btn {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	bottom: -18px;
	left: 50%;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin-left: -18px;
}
</style>
