<template>
	<div>
		<ContentElementBar
			:hasGreyBackground="!isEditMode"
			:icon="mdiFileDocumentOutline"
		>
			<template #title v-if="showTitle">
				<a v-if="src" :href="src" target="_blank" :aria-label="ariaLabel">
					{{ name }}
				</a>
				<span v-else>{{ name }}</span>
			</template>
			<template v-if="showMenu" #menu>
				<slot />
			</template>
			<template #subtitle v-if="caption && !isEditMode">
				{{ caption }}
			</template>
		</ContentElementBar>
	</div>
</template>

<script setup lang="ts">
import { getFileExtension } from "@/utils/fileHelper";
import { mdiFileDocumentOutline } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	name: { type: String, required: true },
	caption: { type: String, required: false },
	showTitle: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
	isEditMode: { type: Boolean, required: true },
	src: { type: String, required: false },
});

const { t } = useI18n();

const fileExtension = computed(() => getFileExtension(props.name));

const ariaLabel = computed(() => {
	const { caption, name } = props;
	const label = caption?.trim() ? `${caption}, ${fileExtension.value}` : name;

	return `${label}, ${t("common.ariaLabel.newTab")}`;
});
</script>

<style scoped>
/* a:focus {
	outline: -webkit-focus-ring-color auto 1px; /* Ensures default focus ring is visible in Safari
}
*/
</style>
