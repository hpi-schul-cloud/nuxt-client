<template>
	<WarningAlert v-if="show">
		{{ t("components.cardElement.fileElement.previewError") }}
	</WarningAlert>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import errorImage from "@/assets/img/preview-not-possible.svg";
import { useI18n } from "@/composables/i18n.composable";
import { WarningAlert } from "@ui-alert";

export default defineComponent({
	name: "PreviewImageError",
	components: { WarningAlert },
	props: {
		show: { type: Boolean, required: false, default: false },
	},
	setup() {
		const { t } = useI18n();

		return {
			src: errorImage,
			t,
		};
	},
});
</script>
