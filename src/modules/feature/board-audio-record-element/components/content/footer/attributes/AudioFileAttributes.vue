<template>
	<span class="text-caption">
		{{ `${fileExtension} ⋅ ${humanReadableFileSize}` }}
	</span>
</template>

<script lang="ts">
import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "AudioFileAttributes",
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
		const { n } = useI18n();

		const humanReadableFileSize = computed(() => {
			const { convertedSize, unit } = convertFileSize(props.fileSize);
			const localizedFileSize = n(convertedSize, "fileSize");
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
