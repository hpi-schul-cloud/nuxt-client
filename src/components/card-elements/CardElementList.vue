<template>
	<div>
		<draggable
			ref="draggable"
			v-model="elements"
			:animation="400"
			:delay="touchDelay"
			handle=".handle"
			ghost-class="ghost"
			chosen-class="chosen"
			drag-class="drag"
			force-fallback="true"
			@start="startDragging"
			@end="endDragging"
			@input="onSort"
		>
			<card-element-wrapper
				v-for="(element, index) in elements"
				ref="card-element"
				:key="index"
				v-model="element.model"
				v-bind="element.props"
				:disabled="dragInProgress"
				@delete-element="deleteElement(index)"
				@add-element="addElementAfter(index)"
			/>
		</draggable>
		<v-card flat class="mb-6 ck-focused">
			<v-col class="text-center">
				<v-btn
					icon
					outlined
					color="secondary"
					class="add-element-btn"
					data-testid="add-element-btn"
					@click="addElement"
				>
					<v-icon>{{ mdiPlus }}</v-icon>
				</v-btn>
			</v-col>
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "@vue/composition-api";
import VueI18n from "vue-i18n";
import { mdiPlus } from "@mdi/js";
import CardElementWrapper from "@/components/card-elements/CardElementWrapper.vue";
import { CardElementComponentEnum } from "@/store/types/card-element";
import { CardElementResponseCardElementTypeEnum } from "@/serverApi/v3";
import { useDrag } from "@/composables/drag";
import draggable from "vuedraggable";

export default defineComponent({
	name: "CardElement",
	components: {
		CardElementWrapper,
		draggable,
	},
	emits: ["input"],
	props: {
		value: {
			type: Array,
			default: () => [],
		},
	},
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const elements = ref(props.value);

		const addElementAfter = (index: number) => {
			elements.value.splice(index + 1, 0, {
				id: "",
				type: CardElementResponseCardElementTypeEnum.RichText,
				model: "",
				props: {
					component: CardElementComponentEnum.RichText,
					placeholder: "common.labels.description",
					editable: true,
				},
			});
		};

		const addElement = () => {
			addElementAfter(elements.value.length);
		};

		const deleteElement = (index: number) => {
			elements.value.splice(index, 1);
		};

		const { touchDelay, startDragging, endDragging, dragInProgress } =
			useDrag();

		const onSort = () => emit("input", elements.value);

		return {
			elements,
			addElement,
			addElementAfter,
			deleteElement,
			mdiPlus,
			touchDelay,
			startDragging,
			endDragging,
			onSort,
			dragInProgress,
		};
	},
});
</script>

<style lang="scss" scoped>
.chosen,
.drag {
	border: solid thin var(--v-grey-lighten1);
	box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
		0 1px 8px 0 rgba(0, 0, 0, 0.12) !important;
	opacity: 1 !important;
}

.ghost {
	opacity: 0 !important;
}
</style>
