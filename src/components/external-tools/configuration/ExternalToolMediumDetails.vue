<template>
	<div class="mb-10">
		<h2 class="text-h4" data-testid="medium-details-title">
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
import NotifierModule from "@/store/notifier";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mdiContentCopy } from "@icons/material";
import { useI18n } from "vue-i18n";
import { Ref, toRef } from "vue";

const props = defineProps<{
	selectedTemplateMedium: ExternalToolMediumResponse;
}>();

const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const { t } = useI18n();

const medium: Ref<ExternalToolMediumResponse> = toRef(
	props,
	"selectedTemplateMedium"
);

const isMediumTemplate =
	medium.value.status === ExternalToolMediumStatus.Template;

const copyDetailToClipboard = (text: string | undefined) => {
	try {
		window.navigator.clipboard.writeText(text ?? "");
		notifierModule.show({
			status: "success",
			text: t("common.words.copiedToClipboard"),
		});
	} catch {
		notifierModule.show({
			status: "error",
			text: t("common.words.copiedToClipboard.failure"),
		});
	}
};
</script>
