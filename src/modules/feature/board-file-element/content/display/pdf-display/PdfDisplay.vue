<template>
	<ContentElementBar>
		<template #display>
			<div @click="openPdf">
				<PreviewImage
					:src="previewSrc"
					alt=""
					:aspect-ratio="1.77777"
					position="top"
					:cover="true"
				/>
			</div>
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { ContentElementBar } from "@ui-board";
import { PreviewImage } from "@ui-preview-image";
import { PropType, defineComponent } from "vue";

export default defineComponent({
	name: "PdfDisplay",
	components: { ContentElementBar, PreviewImage },
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
		name: { type: String, required: true },
		previewSrc: { type: String, required: true },
		src: { type: String, required: true },
		showMenu: { type: Boolean, required: true },
	},
	setup(props) {
		const openPdf = () => {
			window.open(props.src, "_blank");
		};

		return {
			openPdf,
		};
	},
});
</script>
