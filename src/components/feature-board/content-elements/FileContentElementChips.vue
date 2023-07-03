<template>
	<div class="pa-2">
		<v-chip class="grey lighten-3 mr-2" disabled small>{{
			fileExtension
		}}</v-chip>
		<v-chip class="grey lighten-3 mr-2" disabled small>{{
			humanReadableFileSize
		}}</v-chip>
	</div>
</template>

<script lang="ts">
import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { computed, defineComponent } from "vue";

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

<style lang="scss" scoped>
.v-chip {
	opacity: 1;
}
</style>
