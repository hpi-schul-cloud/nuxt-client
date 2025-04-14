<template>
	<v-card-title class="pa-0 d-flex align-center" inactive>
		<v-icon size="18" class="mr-2" :icon="mdiMicrophone" />
		<span class="text-subtitle-1 d-inline-block text-truncate font-weight-bold">
			{{ t("components.cardElement.audioRecordElement") }}
		</span>
	</v-card-title>
</template>

<script lang="ts">
import { mdiMicrophone } from "@icons/material";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "AudioRecordContentTitle",
	setup() {
		const { t } = useI18n();
		return {
			mdiMicrophone,
			t,
		};
	},
});
</script>
