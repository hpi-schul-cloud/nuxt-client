<template>
	<v-custom-empty-state
		image="content-empty"
		:title="t('pages.content.emptyState.error.title')"
	>
		<template #description>
			<p>
				<span class="font-weight-bold d-block mb-2">
					{{ t("pages.content.emptyState.error.message.suggestions") }}
				</span>
				<span
					v-for="suggestion in suggestionsItems"
					:key="suggestion"
					class="d-block"
				>
					{{
						t(
							`pages.content.emptyState.error.message.suggestions.${suggestion}`
						)
					}}
				</span>
			</p>
		</template>
	</v-custom-empty-state>
</template>

<script setup lang="ts">
import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
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
