<template>
	<div class="pa-2">
		<v-chip class="mr-2" small>{{ fileExtension }}</v-chip>
		<v-chip class="mr-2" small>{{ humanReadableFileSize }}</v-chip>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export default defineComponent({
	name: "FileContentElementChips",
	props: {
		fileSize: {
			type: Number,
			required: true,
		},
		fileName: {
			type: String,
			required: true,
		},
	},

	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const humanReadableFileSize = computed(() => {
			const { convertedSize, unit } = convertFileSize(props.fileSize);
			const localizedFileSize = i18n.n(convertedSize);
			const localString = localizedFileSize + " " + unit;
			return localString;
		});

		const fileExtension = computed(() =>
			getFileExtension(props.fileName).toUpperCase()
		);

		return {
			humanReadableFileSize,
			fileExtension,
		};
	},
});
</script>
