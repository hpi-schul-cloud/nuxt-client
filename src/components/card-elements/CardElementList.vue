<template>
	<div v-if="editMode">
		<add-card-element
			data-testid="add-element-before-btn"
			@click="addElementBefore()"
		/>
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
				@delete-element="openDeleteDialog(index)"
				@add-element="addElementAfter(index)"
				editMode
			/>
		</draggable>
		<add-card-element
			data-testid="add-element-after-btn"
			@click="addElementAfter()"
		/>
		<v-custom-dialog
			ref="delete-dialog"
			v-model="deleteDialog.isOpen"
			data-testid="delete-element-dialog"
			:size="375"
			has-buttons
			confirm-btn-title-key="common.actions.remove"
			@dialog-confirmed="deleteElement(deleteDialog.index)"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{ $t("pages.taskCard.deleteElement.title") }}
			</h2>
			<template slot="content">
				<p class="text-md mt-2">
					{{ $t("pages.taskCard.deleteElement.text") }}
				</p>
			</template>
		</v-custom-dialog>
	</div>
	<div v-else>
		<card-element-wrapper
			v-for="(element, index) in elements"
			ref="card-element"
			:key="index"
			v-model="element.model"
			v-bind="element.props"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import VueI18n from "vue-i18n";
import CardElementWrapper from "@/components/card-elements/CardElementWrapper.vue";
import AddCardElement from "@/components/card-elements/AddCardElement.vue";
import { CardElementComponentEnum } from "@/store/types/beta-task/card-element";
import { CardElementResponseCardElementTypeEnum } from "@/serverApi/v3";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { useDrag } from "@/composables/drag";
import draggable from "vuedraggable";

export default defineComponent({
	name: "CardElemenList",
	components: {
		CardElementWrapper,
		AddCardElement,
		draggable,
		vCustomDialog,
	},
	emits: ["input"],
	props: {
		value: {
			type: Array,
			default: () => [],
		},
		editMode: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const elements = ref(props.value);

		const addElementAfter = (index: number = elements.value.length) => {
			elements.value.splice(index + 1, 0, {
				id: "",
				type: CardElementResponseCardElementTypeEnum.RichText,
				model: "",
				props: {
					component: CardElementComponentEnum.RichText,
					placeholder: i18n.t(
						"components.cardElement.richTextElement.placeholder"
					) as string,
					editable: true,
				},
			});
		};

		const addElementBefore = () => {
			elements.value.unshift({
				id: "",
				type: CardElementResponseCardElementTypeEnum.RichText,
				model: "",
				props: {
					component: CardElementComponentEnum.RichText,
					placeholder: i18n.t(
						"components.cardElement.richTextElement.placeholder"
					) as string,
					editable: true,
				},
			});
		};

		const deleteDialog = ref({
			isOpen: false,
			index: NaN,
		});

		const openDeleteDialog = (index: number) => {
			deleteDialog.value.isOpen = true;
			deleteDialog.value.index = index;
		};

		const deleteElement = (index: number) => {
			elements.value.splice(index, 1);
			deleteDialog.value.isOpen = false;
			deleteDialog.value.index = NaN;
		};

		const { touchDelay, startDragging, endDragging, dragInProgress } =
			useDrag();

		const onSort = () => emit("input", elements.value);

		return {
			elements,
			addElementAfter,
			addElementBefore,
			deleteDialog,
			deleteElement,
			openDeleteDialog,
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
