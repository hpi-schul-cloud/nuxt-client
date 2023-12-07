<template>
	<ContentElementBar :hasGreyBackground="true" :icon="mdiPresentation">
		<template #display>
			<v-img :src="imageSrc" height="185px" alt="" cover />
		</template>
		<template #title>
			{{ $t("components.cardElement.drawingElement") }}
		</template>
		<template #subtitle>
			{{ $t("components.cardElement.lastUpdatedAt") }}
			{{ formattedLastUpdatedAt }}
		</template>
		<template #menu v-if="$slots.default">
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
import { I18N_KEY, injectStrict } from "@/utils/inject";

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
		const i18n = injectStrict(I18N_KEY);
		const imageSrc = image;

		const formattedLastUpdatedAt = computed(() => {
			const format = i18n.tc("format.dateTime");
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
