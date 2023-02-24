<template>
	<v-card v-if="editMode" flat class="card mb-7" :class="{ active: isActive }">
		<div class="card-actions">
			<v-btn
				v-show="actionable"
				icon
				outlined
				color="secondary"
				class="drag-element-btn handle"
				:aria-label="$t('components.cardElement.dragElement')"
				data-testid="drag-element-btn"
			>
				<v-icon>{{ mdiDrag }}</v-icon>
			</v-btn>
			<v-btn
				v-show="actionable && isActive"
				icon
				outlined
				color="secondary"
				class="delete-element-btn"
				:aria-label="$t('components.cardElement.deleteElement')"
				data-testid="delete-element-btn"
				@click="handleDelete"
			>
				<v-icon>{{ mdiTrashCanOutline }}</v-icon>
			</v-btn>
		</div>
		<component
			:is="component"
			v-model="model"
			:editable="editable"
			:disabled="disabled"
			:placeholder="placeholder"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
		/>
		<v-btn
			v-show="actionable && isActive"
			icon
			outlined
			color="secondary"
			class="add-element-btn"
			:aria-label="$t('pages.taskCard.addElement')"
			data-testid="add-element-btn"
			@click="handleAdd"
		>
			<v-icon>{{ mdiPlus }}</v-icon>
		</v-btn>
	</v-card>
	<v-card v-else flat class="card mb-7">
		<component :is="component" v-model="model" :placeholder="placeholder" />
	</v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { mdiTrashCanOutline, mdiDrag, mdiPlus } from "@mdi/js";
import { CardElementComponentEnum } from "@/store/types/card-element";
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
import RichTextCardElement from "@/components/card-elements/RichTextCardElement.vue";

export default defineComponent({
	name: "CardElementWrapper",
	components: {
		TitleCardElement,
		RichTextCardElement,
	},
	emits: ["input", "delete-element", "add-element"],
	props: {
		component: {
			type: String,
			default: CardElementComponentEnum.RichText,
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
		editMode: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const model = ref(props.value);

		watch(
			() => props.value,
			(newValue: string) => {
				model.value = newValue;
			}
		);

		const isActive = ref(false);
		const actionable = computed(
			() => props.component !== CardElementComponentEnum.Title
		);

		const handleInput = () => emit("input", model.value);
		const handleAdd = () => emit("add-element");
		const handleDelete = () => emit("delete-element");
		const handleFocus = () => {
			isActive.value = true;
		};
		const handleBlur = () => {
			isActive.value = false;
		};

		return {
			model,
			handleInput,
			handleAdd,
			handleDelete,
			handleFocus,
			handleBlur,
			actionable,
			isActive,
			mdiTrashCanOutline,
			mdiDrag,
			mdiPlus,
		};
	},
});
</script>

<style lang="scss" scoped>
$btn-radius: 18;

.card {
	border: dashed thin var(--v-white-base);
}

.active {
	border: dashed thin var(--v-grey-base);
}

.card-actions {
	position: relative;
	float: right;
	width: #{$btn-radius}px;
}

.v-btn {
	background-color: var(--v-white-base);
}

.drag-element-btn {
	position: relative;
	top: -#{$btn-radius}px;
}

.delete-element-btn {
	position: relative;
	top: -8px;
}

.add-element-btn {
	position: absolute;
	bottom: -#{$btn-radius}px;
	left: 50%;
	margin-left: -#{$btn-radius}px;
}
</style>
