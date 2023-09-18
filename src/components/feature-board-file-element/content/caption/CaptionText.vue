<template>
	<v-card-text class="pa-2">
		<v-textarea
			rows="1"
			auto-grow
			:label="$t('components.cardElement.fileElement.caption')"
		/>
	</v-card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "CaptionText",
	props: {
		text: {
			type: String,
			required: false,
		},
	},
});
</script>
