<template>
	<div class="mb-10">
		<h2 data-testid="medium-details-title">
			{{
				isMediumTemplate
					? t("pages.tool.medium.template")
					: t("pages.tool.medium")
			}}
		</h2>
		<v-text-field
			v-if="!isMediumTemplate"
			v-model="medium.mediumId"
			:label="t('pages.tool.medium.mediumId')"
			readonly
			data-testid="medium-details-medium-id"
		>
			<template #append>
				<VIcon
					tabindex="-1"
					aria-hidden="true"
					@click="() => copyDetailToClipboard(medium.mediumId)"
				>
					{{ mdiContentCopy }}
				</VIcon>
			</template>
		</v-text-field>
		<v-text-field
			v-model="medium.mediaSourceId"
			:label="t('pages.tool.medium.mediumSourceId')"
			readonly
			data-testid="medium-details-media-source-id"
		>
			<template #append>
				<VIcon
					tabindex="-1"
					aria-hidden="true"
					@click="() => copyDetailToClipboard(medium.mediaSourceId)"
				>
					{{ mdiContentCopy }}
				</VIcon>
			</template>
		</v-text-field>
	</div>
</template>

<script setup lang="ts">
import {
	ExternalToolMediumResponse,
	ExternalToolMediumStatus,
} from "@/serverApi/v3";
import { mdiContentCopy } from "@icons/material";
import { useI18n } from "vue-i18n";
import { computed, ComputedRef, Ref, toRef } from "vue";
import { notifyError, notifySuccess } from "@data-app";

const props = defineProps<{
	selectedTemplateMedium: ExternalToolMediumResponse;
}>();

const { t } = useI18n();

const medium: Ref<ExternalToolMediumResponse> = toRef(
	props,
	"selectedTemplateMedium"
);

const isMediumTemplate: ComputedRef<boolean> = computed(
	() => medium.value.status === ExternalToolMediumStatus.Template
);

const copyDetailToClipboard = (text: string | undefined) => {
	try {
		window.navigator.clipboard.writeText(text ?? "");
		notifySuccess(t("common.words.copiedToClipboard"));
	} catch {
		notifyError(t("common.words.copiedToClipboard.failure"));
	}
};
</script>
