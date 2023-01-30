<template>
	<v-card flat class="element mb-2" :class="component">
		<div class="element-content mr-4">
			<component
				:is="component"
				v-model="model"
				:editable="editable"
				:disabled="disabled"
				:placeholder="`${$t(placeholder)}`"
				@input="handleInput"
			></component>
		</div>
		<v-card-actions
			v-if="component !== CardElementComponentEnum.Title"
			class="element-actions"
		>
			<v-btn
				icon
				outlined
				color="secondary"
				class="drag-element-btn handle"
				data-testid="drag-element-btn"
			>
				<v-icon>{{ mdiDrag }}</v-icon>
			</v-btn>
			<v-btn
				icon
				outlined
				color="secondary"
				class="delete-element-btn"
				data-testid="delete-element-btn"
				@click="() => $emit('delete-element')"
			>
				<v-icon>{{ mdiTrashCanOutline }}</v-icon>
			</v-btn>
			<v-btn
				icon
				outlined
				color="secondary"
				class="add-element-btn"
				data-testid="add-element-btn"
				@click="() => $emit('add-element')"
			>
				<v-icon>{{ mdiPlus }}</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject } from "@vue/composition-api";
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

		const handleInput = () => emit("input", model.value);

		return {
			model,
			handleInput,
			CardElementComponentEnum,
			mdiTrashCanOutline,
			mdiDrag,
			mdiPlus,
		};
	},
});
</script>

<style lang="scss" scoped>
.element {
	display: flex;
	align-items: flex-start;
	border: solid thin var(--v-white-base);
}

.element-content {
	flex-basis: 100%;
	flex-shrink: 1;
}

.element-actions {
	z-index: var(--layer-page);
	flex-basis: 100px;
	flex-grow: 0;
	flex-shrink: 0;
}

/* stylelint-disable-next-line selector-class-pattern */
.RichTextCardElement {
	margin-left: calc(-1 * var(--ck-spacing-standard));
}
</style>
