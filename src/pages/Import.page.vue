<template>
	<ImportCardForm @confirm="onConfirm" @cancel="onCancel" />
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import ImportCardForm from "@/modules/feature/board/card/ImportCardForm.vue";
import { ShareTokenInfoResponse } from "@/serverApi/v3";
import { COPY_MODULE_KEY, injectStrict } from "@/utils/inject";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const copyModule = injectStrict(COPY_MODULE_KEY);

const shareTokenInfo = ref<ShareTokenInfoResponse>();

onMounted(async () => {
	const token = useRoute().query.import;

	if (typeof token !== "string") {
		throw new Error("Import token is missing or invalid");
	}

	shareTokenInfo.value = await copyModule.validateShareToken(token);
});

const onConfirm = async (payload: { boardId: string; columnId: string }) => {
	copyModule.copyByShareToken({
		token: shareTokenInfo.value!.token,
		type: shareTokenInfo.value!.parentType,
		newName: shareTokenInfo.value!.parentName,
		destinationId: payload.columnId,
	});

	router.push("/boards/" + payload.boardId);
};

const onCancel = () => {
	router.push("/");
};
</script>
