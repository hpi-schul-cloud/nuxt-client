<template>
	<ContentElementBar :hasGreyBackground="true" :icon="mdiTextBoxEditOutline">
		<template #display>
			<v-img :src="imageSrc" height="185px" alt="" cover class="rounded-t" />
		</template>
		<template #title>
			{{ $t("components.cardElement.collaborativeTextEditorElement") }}
		</template>
		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import image from "@/assets/img/collaborativeEditor.svg";
import { mdiTextBoxEditOutline } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "InnerContent",
	components: { ContentElementBar },
	setup() {
		const imageSrc = image;

		return {
			imageSrc,
			mdiTextBoxEditOutline,
		};
	},
});
</script>
