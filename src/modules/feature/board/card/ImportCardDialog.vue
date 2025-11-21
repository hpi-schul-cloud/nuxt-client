<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:loading="isImporting"
		:message="t('components.molecules.import.card.options.title')"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="!selectedColumnId"
		@confirm="onConfirm"
		@cancel="onCancel"
	>
		<template #content>
			<InfoAlert data-testid="import-card-information">
				{{ t("components.molecules.import.card.hint.restriction") }}
				<ul class="ml-6">
					<li>{{ t("components.molecules.import.card.hint.etherpad") }}</li>
					<li>{{ t("components.molecules.import.card.hint.whiteboard") }}</li>
					<li>{{ t("components.molecules.import.card.hint.ctltools") }}</li>
				</ul>
			</InfoAlert>

			<p class="text-lg mt-2">
				{{ dialogQuestion }}
			</p>

			<VForm id="importCardForm" data-testid="import-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="rooms"
					:disabled="isImporting"
					item-value="id"
					item-title="name"
					:label="t('components.molecules.label.room')"
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#importCardForm' }"
					@update:menu="resetBoardSelection"
				/>

				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId || isImporting"
					:items="boards"
					item-value="id"
					:label="t('components.molecules.label.board')"
					:placeholder="t('common.words.board')"
					:menu-props="{ attach: '#importCardForm' }"
					@update:menu="selectedColumnId = undefined"
				/>

				<VSelect
					v-model="selectedColumnId"
					:disabled="!selectedBoardId || isImporting"
					:items="columns"
					item-value="id"
					:label="t('components.molecules.label.section')"
					:placeholder="t('components.boardSection')"
					:menu-props="{ attach: '#importCardForm' }"
				/>
			</VForm>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useCardDialogData } from "./card-dialog-composable";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { ShareTokenInfoResponse } from "@/serverApi/v3";
import { COPY_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifySuccess } from "@data-app";
import { InfoAlert } from "@ui-alert";
import { Dialog } from "@ui-dialog";
import { computed, onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const copyModule = injectStrict(COPY_MODULE_KEY);
const router = useRouter();
const { t } = useI18n();

const props = defineProps<{ token: string }>();

const { execute, isRunning: isImporting } = useSafeAxiosTask();
const { selectedBoardId, selectedColumnId, selectedRoomId, resetBoardSelection, rooms, columns, boards } =
	useCardDialogData();
const shareTokenInfo = ref<ShareTokenInfoResponse>();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

onBeforeMount(async () => {
	const { result, success } = await execute(
		async () => await copyModule.validateShareToken(props.token),
		t("components.molecules.import.options.failure.backendError", {
			name: t("components.boardCard"),
		})
	);
	if (success) {
		shareTokenInfo.value = result;
	} else {
		isDialogOpen.value = false;
		router.push("/rooms");
	}
});

const dialogQuestion = computed(() => {
	const cardName = shareTokenInfo.value?.parentName;
	return t("components.molecules.import.card.question", { title: cardName ? ` "${cardName}"` : "" });
});

const onConfirm = async () => {
	const { success } = await execute(
		async () =>
			await copyModule.copyByShareToken({
				token: shareTokenInfo.value!.token,
				type: shareTokenInfo.value!.parentType,
				newName: shareTokenInfo.value!.parentName,
				destinationId: selectedColumnId.value,
			}),
		t("components.molecules.import.options.failure.backendError", {
			name: t("components.boardCard"),
		})
	);

	if (success) {
		router.push("/boards/" + selectedBoardId.value);

		notifySuccess(
			t("components.molecules.import.options.success", {
				name: t("components.boardCard"),
			})
		);
	}
};

const onCancel = () => {
	router.push("/rooms");
};
</script>
