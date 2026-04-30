<template>
	<SvsDialog
		v-model="isOpen"
		is-open-state-managed-externally
		:title="title"
		confirm-btn-lang-key="common.actions.duplicate"
		cancel-btn-lang-key="common.actions.cancel"
		data-testid="copy-info-dialog"
		@confirm="emit('confirm', true)"
		@cancel="emit('cancel')"
	>
		<template #content>
			<p data-testid="copy-info-text">
				{{ text }}
			</p>
			<InfoAlert class="mb-4" data-testid="copy-info-copyright-data-protection">
				{{ info }}
			</InfoAlert>
			<WarningAlert v-if="warnings.length > 0" data-testid="copy-info-warnings">
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
import { computed, toRef } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
	copyItemType: ContentItemTypeEnum;
}>();

const emit = defineEmits<{
	(e: "cancel"): void;
	(e: "confirm", payload: boolean): void;
}>();

const isOpen = defineModel("is-open", {
	type: Boolean,
	default: false,
});

const title = computed(() =>
	t("feature-copy.copyInfo.title", { type: t(`feature-copy.copyInfo.type.${props.copyItemType}`) })
);

const { text, info, warnings } = useCopyContent(toRef(props, "copyItemType"));
</script>
