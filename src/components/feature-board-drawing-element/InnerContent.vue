<template>
	<ContentElementBar :hasGreyBackground="true" :icon="mdiPresentation">
		<template #display>
			<v-img :src="imageSrc" height="185px" alt="" cover class="rounded-t" />
		</template>
		<template #title>
			{{ $t("components.cardElement.drawingElement") }}
		</template>
		<template #subtitle>
			{{ $t("components.cardElement.lastUpdatedAt") }}
			{{ formattedLastUpdatedAt }}
		</template>
		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { mdiPresentation } from "@mdi/js";
import image from "@/assets/img/tldraw.png";
import { ContentElementBar } from "@ui-board";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "InnerContent",
	components: { ContentElementBar },
	props: {
		lastUpdatedAt: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();
		const imageSrc = image;

		const formattedLastUpdatedAt = computed(() => {
			const format = t("format.dateTime");
			return dayjs(props.lastUpdatedAt).format(format);
		});

		return {
			imageSrc,
			formattedLastUpdatedAt,
			mdiPresentation,
		};
	},
});
</script>
