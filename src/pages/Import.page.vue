<template>
	<ImportCardDialog />
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import ImportCardDialog from "@/modules/feature/board/card/ImportCardDialog.vue";
// import { ShareTokenApiFactory, ShareTokenInfoResponse } from "@/serverApi/v3";
// import { $axios } from "@/utils/api";
// import { onMounted, ref } from "vue";
// import { useRoute } from "vue-router";

// const shareTokenApi = ShareTokenApiFactory(undefined, "/v3", $axios);

// const shareTokenInfo = ref<ShareTokenInfoResponse>();

// onMounted(async () => {
// 	const token = useRoute().query.import;

// 	if (typeof token !== "string") {
// 		throw new Error("Import token is missing or invalid");
// 	}

// 	const res = await shareTokenApi.shareTokenControllerLookupShareToken(token);
// 	shareTokenInfo.value = res.data;
// });
</script>
