<template>
	<div class="grey lighten-4">
		<v-img src="@/assets/img/tldraw.png" height="175px" cover></v-img>
		<div
			class="board-content"
			style="display: flex; align-items: center; padding: 20px"
		>
			<v-icon
				class="grey--text text--darken-2"
				data-testid="board-submission-element-display-icon"
				medium
			>
				$mdiPresentation
			</v-icon>
			<span
				class="subtitle-1 d-inline-block text-truncate black--text text--darken-2"
				style="font-weight: 700; margin-left: 10px"
				data-testid="board-drawing-element-display-content"
			>
				{{ $t("components.cardElement.drawingElement") }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "DrawingContentElementDisplay",
});
</script>
