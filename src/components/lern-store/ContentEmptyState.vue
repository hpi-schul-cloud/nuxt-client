<template>
	<EmptyState :title="t('pages.content.emptyState.error.title')">
		<template #media>
			<ContentEmptySvg />
		</template>
		<template #text>
			<p>
				<span class="font-weight-bold d-block mb-2">
					{{ t("pages.content.emptyState.error.message.suggestions") }}
				</span>
				<span v-for="suggestion in suggestionsItems" :key="suggestion" class="d-block">
					{{ t(`pages.content.emptyState.error.message.suggestions.${suggestion}`) }}
				</span>
			</p>
		</template>
	</EmptyState>
</template>

<script setup lang="ts">
import { ContentEmptySvg, EmptyState } from "@ui-empty-state";
import { useI18n } from "vue-i18n";

const suggestionsItems = [
	"moreThanOneCharacter",
	"correctSpelling",
	"otherSearchTerms",
	"generalSearchTerms",
	"lessSearchTerms",
];

const { t } = useI18n();
</script>
