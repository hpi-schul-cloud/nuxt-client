<template>
	<SvsDialog
		:model-value="isOpen"
		:is-open-state-managed-externally="true"
		title="components.molecules.copyInfo.title"
		confirm-btn-lang-key="common.actions.duplicate"
		cancel-btn-lang-key="common.actions.cancel"
		data-testid="copy-dialog"
		@confirm="emit('copy-confirmed')"
		@cancel="emit('copy-dialog-closed')"
	>
		<template #content>
			<p>
				{{ $t("components.molecules.copyInfo.text.nextStep") }}
			</p>
			<InfoAlert class="mb-4" data-testid="copy-info-copyright-data-protection">
				{{ $t("components.molecules.share.checkPrivacyAndCopyright") }}
			</InfoAlert>
			<WarningAlert v-if="messages.length > 0">
				<p class="mb-1">
					{{ t("components.molecules.copyInfo.text.alert.followingContent") }}
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
import { CopyParamsTypeEnum } from "@/store/copy";
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
	(e: "copy-dialog-closed"): void;
	(e: "copy-confirmed"): void;
}>();

const messageKeys = {
	courseMemberPermission: "components.molecules.copyInfo.text.alert.membersPermissions",
	contentEtherpad: "components.molecules.copyInfo.text.alert.Etherpad",
	contentWhiteboard: "components.molecules.copyInfo.text.alert.whiteboard",
	contentGeogebra: "components.molecules.copyInfo.text.alert.geogebra",
	protectedExternalTool: "components.molecules.copyInfo.text.alert.protectedSettings",
};

const messageMappings: Record<CopyParamsTypeEnum, (keyof typeof messageKeys)[]> = {
	[CopyParamsTypeEnum.Course]: [
		"courseMemberPermission",
		"contentEtherpad",
		"contentWhiteboard",
		"contentGeogebra",
		"protectedExternalTool",
	],
	[CopyParamsTypeEnum.ColumnBoard]: ["contentEtherpad", "contentWhiteboard", "protectedExternalTool"],
	[CopyParamsTypeEnum.Lesson]: ["contentEtherpad", "contentGeogebra"],
	[CopyParamsTypeEnum.Task]: [],
};

const toKebabCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const getMessagesForType = (type: CopyParamsTypeEnum) => {
	const keys = messageMappings[type] || [];
	return keys.map((key) => ({
		testId: `copy-modal-${toKebabCase(key)}`,
		text: t(messageKeys[key]),
	}));
};

const messages = computed(() => getMessagesForType(props.copyItemType));
</script>
