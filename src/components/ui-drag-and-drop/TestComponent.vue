<template>
	<div>
		<UseDraggable :initialValue="{ x: 500, y: 500 }" v-slot="{ x, y }">
			Drag me! I am at {{ x }}, {{ y }}
		</UseDraggable>
		test
		<DragAndDropList groupName="test">
			<DragAndDropItem groupName="test">
				<div class="draggableitem">I am a Draggable! 1</div>
			</DragAndDropItem>
			<DragAndDropItem groupName="test">
				<div class="draggableitem">I am a Draggable! 2</div>
			</DragAndDropItem>
			<DragAndDropItem groupName="test">
				<div class="draggableitem">I am a Draggable! 3</div>
			</DragAndDropItem>
			<DragAndDropItem groupName="test">
				<div class="draggableitem">I am a Draggable! 4</div>
			</DragAndDropItem>
		</DragAndDropList>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DragAndDropList from "./components/DragAndDropList.vue";
import DragAndDropItem from "./components/DragAndDropItem.vue";
import { UseDraggable } from "@vueuse/components";
export default defineComponent({
	components: { DragAndDropList, DragAndDropItem, UseDraggable },
	setup() {
		return {};
	},
});
</script>
<style scoped>
.draggableitem {
	padding: 1 rem;
	background-color: lightblue;
	width: 300px;
	min-height: 50px;
	/* margin-bottom: 10px; */
}
</style>
