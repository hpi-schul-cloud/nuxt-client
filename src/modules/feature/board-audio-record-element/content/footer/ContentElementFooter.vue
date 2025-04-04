<template>
	<v-card-actions class="py-2 px-4">
		<AudioRecordAttributes
			:fileSize="audioRecordProperties.size"
			:fileName="audioRecordProperties.name"
		/>

		<v-spacer />

		<AudioRecordDownload
			:fileName="audioRecordProperties.name"
			:isDownloadAllowed="audioRecordProperties.isDownloadAllowed"
			:url="audioRecordProperties.url"
		/>
	</v-card-actions>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AudioRecordProperties } from "../../shared/types/audio-record-properties";
import AudioRecordAttributes from "./attributes/AudioRecordAttributes.vue";
import AudioRecordDownload from "./download/AudioRecordDownload.vue";

export default defineComponent({
	name: "ContentElementFooter",
	components: {
		AudioRecordAttributes,
		AudioRecordDownload,
	},
	props: {
		audioRecordProperties: {
			type: Object as PropType<AudioRecordProperties>,
			required: true,
		},
	},
});
</script>
