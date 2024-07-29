<template>
	<ContentElementBar :hasGreyBackground="true" :icon="mdiPresentation">
		<template #display>
			<v-img :src="imageSrc" alt="" cover class="rounded-t" />
		</template>
		<template #title>
			{{ $t("components.cardElement.drawingElement") }}
		</template>
		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import image from "@/assets/img/tldraw.svg";
import { mdiPresentation } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "InnerContent",
	components: { ContentElementBar },
	setup() {
		const imageSrc = image;

		return {
			imageSrc,
			mdiPresentation,
		};
	},
});
</script>
