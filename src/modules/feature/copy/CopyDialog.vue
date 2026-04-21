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
				{{ t("feature-copy.copyInfo.text.nextStep", { type: translatedOfType }) }}
			</p>
			<InfoAlert class="mb-4" data-testid="copy-info-copyright-data-protection">
				{{ t("feature-copy.copyInfo.checkPrivacyAndCopyright") }}
			</InfoAlert>
			<WarningAlert v-if="messages.length > 0">
				<p class="mb-1">
					{{ t("feature-copy.copyInfo.text.alert.followingContent") }}
				</p>
				<ul class="ml-6">
					<li v-for="message in messages" :key="message.testId" :data-testid="message.testId">
						{{ message.text }}
					</li>
				</ul>
			</WarningAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { CopyParamsTypeEnum } from "./types";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = withDefaults(
	defineProps<{
		isOpen?: boolean;
		copyItemType: CopyParamsTypeEnum;
	}>(),
	{
		isOpen: false,
	}
);

const emit = defineEmits<{
	(e: "cancel"): void;
	(e: "confirm"): void;
}>();

const typeLabels: Partial<Record<CopyParamsTypeEnum, string>> = {
	[CopyParamsTypeEnum.Course]: "feature-copy.copyInfo.type.course",
	[CopyParamsTypeEnum.ColumnBoard]: "feature-copy.copyInfo.type.board",
	[CopyParamsTypeEnum.Lesson]: "feature-copy.copyInfo.type.lesson",
	[CopyParamsTypeEnum.Task]: "feature-copy.copyInfo.type.task",
	[CopyParamsTypeEnum.Room]: "feature-copy.copyInfo.type.room",
};

const ofTypeLabels: Partial<Record<CopyParamsTypeEnum, string>> = {
	[CopyParamsTypeEnum.Course]: "feature-copy.copyInfo.type.ofCourse",
	[CopyParamsTypeEnum.ColumnBoard]: "feature-copy.copyInfo.type.ofBoard",
	[CopyParamsTypeEnum.Lesson]: "feature-copy.copyInfo.type.ofLesson",
	[CopyParamsTypeEnum.Task]: "feature-copy.copyInfo.type.ofTask",
	[CopyParamsTypeEnum.Room]: "feature-copy.copyInfo.type.ofRoom",
};

const messagesWithType = new Set(["membersPermissions"]);

const messageKeys = {
	membersPermissions: "feature-copy.copyInfo.text.alert.membersPermissions",
	etherpad: "feature-copy.copyInfo.text.alert.Etherpad",
	whiteboard: "feature-copy.copyInfo.text.alert.whiteboard",
	geogebra: "feature-copy.copyInfo.text.alert.geogebra",
	protectedExternalTool: "feature-copy.copyInfo.text.alert.protectedSettings",
};

const messageMappings: Record<CopyParamsTypeEnum, (keyof typeof messageKeys)[]> = {
	[CopyParamsTypeEnum.Course]: ["membersPermissions", "etherpad", "whiteboard", "geogebra", "protectedExternalTool"],
	[CopyParamsTypeEnum.ColumnBoard]: ["etherpad", "whiteboard", "protectedExternalTool"],
	[CopyParamsTypeEnum.Lesson]: ["etherpad", "geogebra"],
	[CopyParamsTypeEnum.Task]: [],
	[CopyParamsTypeEnum.Room]: ["membersPermissions", "etherpad", "whiteboard", "protectedExternalTool"],
};

const toKebabCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const translatedType = computed(() => {
	const typeLabel = typeLabels[props.copyItemType];
	return typeLabel ? t(typeLabel) : "";
});

const translatedOfType = computed(() => {
	const ofTypeLabel = ofTypeLabels[props.copyItemType];
	return ofTypeLabel ? t(ofTypeLabel) : "";
});

const messages = computed(() => {
	const keys = messageMappings[props.copyItemType] || [];

	return keys.map((key) => ({
		testId: `copy-info-${toKebabCase(key)}`,
		text: messagesWithType.has(key) ? t(messageKeys[key], { type: translatedType.value }) : t(messageKeys[key]),
	}));
});
</script>
