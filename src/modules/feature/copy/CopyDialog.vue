<template>
	<SvsDialog
		:model-value="isOpen"
		:is-open-state-managed-externally="true"
		title="feature-copy.copyInfo.title"
		confirm-btn-lang-key="common.actions.duplicate"
		cancel-btn-lang-key="common.actions.cancel"
		data-testid="copy-info-dialog"
		@confirm="emit('confirm')"
		@cancel="emit('cancel')"
	>
		<template #content>
			<p>
				{{ text }}
			</p>
			<InfoAlert class="mb-4" data-testid="copy-info-copyright-data-protection">
				{{ info }}
			</InfoAlert>
			<WarningAlert v-if="warnings.length > 0">
				<p class="mb-1">
					{{ t("feature-copy.copyInfo.text.alert.followingContent") }}
				</p>
				<ul class="ml-6">
					<li v-for="warning in warnings" :key="warning.testId" :data-testid="warning.testId">
						{{ warning.text }}
					</li>
				</ul>
			</WarningAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { useCopyContent } from "@/composables/copy-content.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { toRef } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = withDefaults(
	defineProps<{
		isOpen?: boolean;
		copyItemType: ContentItemTypeEnum;
	}>(),
	{
		isOpen: false,
	}
);

const emit = defineEmits<{
	(e: "cancel"): void;
	(e: "confirm"): void;
}>();

const { text, info, warnings } = useCopyContent(toRef(props, "copyItemType"));
</script>
