<template>
	<EmptyState :title="t('pages.content.initState.title')">
		<template #media>
			<ContentInitialSvg />
		</template>
	</EmptyState>
	<div class="d-flex justify-center">
		<span class="initial-state-description">
			<p>
				{{ t("pages.content.initState.description") }}
				<span class="d-block">
					{{ t("pages.content.initState.description.newMaterials") }}
				</span>
			</p>
			<p>
				{{ t("pages.content.initState.description.hint") }}
				<span class="d-block">
					{{ t("pages.content.initState.description.hint.materials") }}
				</span>
				<span class="d-block">
					{{ t("pages.content.initState.description.hint.availability") }}
				</span>
			</p>
			<p>
				{{ t("pages.content.initState.description.usage") }}
				<span class="d-block">
					{{ t("pages.content.initState.description.usage.deleteHint") }}
				</span>
				<span class="d-block">
					{{ t("pages.content.initState.description.usage.notPermitted") }}
				</span>
			</p>
		</span>
	</div>
</template>

<script setup lang="ts">
import { EmptyState, ContentInitialSvg } from "@ui-empty-state";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.initial-state-description {
	text-align: left;
	width: calc(2 * var(--size-content-width-min));
}
</style>
