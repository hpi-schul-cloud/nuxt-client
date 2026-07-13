<template>
	<div>
		<ContentElementBar :icon="mdiFileDocumentOutline">
			<template v-if="showTitle" #title>
				<a
					v-if="href"
					:href="href"
					:target="isDownloadLink ? undefined : '_blank'"
					:download="isDownloadLink ? name : undefined"
					:aria-label="ariaLabel"
					@click.stop
					@keydown.enter.stop
				>
					{{ name }}
				</a>
				<span v-else>{{ name }}</span>
			</template>
			<template v-if="showMenu" #menu>
				<slot />
			</template>
			<template v-if="caption && !isEditMode" #subtitle>
				{{ caption }}
			</template>
		</ContentElementBar>
	</div>
</template>

<script setup lang="ts">
import { mdiFileDocumentOutline } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	name: { type: String, required: true },
	caption: { type: String, required: false, default: undefined },
	showTitle: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
	isEditMode: { type: Boolean, required: true },
	href: { type: String, required: false, default: undefined },
	isDownloadLink: { type: Boolean, required: false, default: false },
});

const { t } = useI18n();

const ariaLabel = computed(() =>
	props.isDownloadLink
		? `${props.name}, ${t("components.board.action.download")}`
		: `${props.name}, ${t("common.ariaLabel.newTab")}`
);
</script>

<style scoped>
a:focus {
	outline: auto; /* Ensures that default focus ring is visible (esp. in Safari) */
}
</style>
