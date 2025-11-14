<template>
	<div v-if="isLoading" class="h-screen d-flex justify-center align-center">
		<VProgressCircular color="primary" indeterminate :size="36" />
	</div>
	<template v-else>
		<ImportCardForm @confirm="onConfirm" @cancel="onCancel" />
	</template>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import ImportCardForm from "@/modules/feature/board/card/ImportCardForm.vue";
import { COPY_MODULE_KEY, injectStrict } from "@/utils/inject";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const copyModule = injectStrict(COPY_MODULE_KEY);

const isLoading = ref(false);

const onConfirm = async (payload: { redirectId: string; destinantionId: string }) => {
	isLoading.value = true;

	const token = route.query.import;

	if (typeof token !== "string") {
		throw new Error("Import token is missing or invalid");
	}

	const shareTokenInfo = await copyModule.validateShareToken(token);

	await copyModule.copyByShareToken({
		token: shareTokenInfo.token,
		type: shareTokenInfo.parentType,
		newName: shareTokenInfo.parentName,
		destinationId: payload.destinantionId,
	});

	router.push("/boards/" + payload.redirectId);
};

const onCancel = () => {
	router.push("/");
};
</script>
