<template>
	<v-card-actions class="py-2 px-4">
		<AudioFileAttributes
			:file-size="audioRecordProperties.size"
			:file-name="audioRecordProperties.name"
		/>

		<v-spacer />

		<AudioFileDownload
			:file-name="audioRecordProperties.name"
			:is-download-allowed="audioRecordProperties.isDownloadAllowed"
			:url="audioRecordProperties.url"
		/>
	</v-card-actions>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AudioFileAttributes from "./attributes/AudioFileAttributes.vue";
import AudioFileDownload from "./download/AudioFileDownload.vue";
import { AudioRecordProperties } from "../../../types/audio-record-properties";

export default defineComponent({
	name: "AudioRecordContentElementFooter",
	components: {
		AudioFileAttributes,
		AudioFileDownload,
	},
	props: {
		audioRecordProperties: {
			type: Object as PropType<AudioRecordProperties>,
			required: true,
		},
	},
});
</script>
