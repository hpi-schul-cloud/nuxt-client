<template>
	<span class="text-caption">
		{{ `${fileExtension} ⋅ ${humanReadableFileSize}` }}
	</span>
</template>

<script lang="ts">
import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "FileAttributes",
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
			const localizedFileSize = i18n.n(convertedSize, "fileSize");
			const localizedString = localizedFileSize + " " + unit;

			return localizedString;
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
