<template>
	<section>
		<InfoModalFullWidth
			:model-value="showModal"
			:title="getTitle"
			:description="getDescription"
			design="primary"
			@update:model-value="buttonHandler"
		>
			<template #icon>
				<VIcon size="60" :icon="activated ? mdiEmailCheckOutline : mdiEmailRemoveOutline" />
			</template>
		</InfoModalFullWidth>
	</section>
</template>

<script setup lang="ts">
import InfoModalFullWidth from "@/components/legacy/InfoModalFullWidth.vue";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiEmailCheckOutline, mdiEmailRemoveOutline } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { execute } = useSafeAxiosTask();

const activated = ref(false);
const keyword = ref<string | undefined>(undefined);
const showModal = ref(false);

const getTitle = computed(() => {
	if (activated.value) {
		if (keyword.value === "eMailAddress") {
			return t("pages.activation._activationCode.index.success.email");
		}
		return "";
	}
	return t("pages.activation._activationCode.index.error.title");
});

const pageTitle = computed(() => buildPageTitle(getTitle.value));
useTitle(pageTitle);

const getDescription = computed(() => {
	let description = "";
	if (!activated.value) {
		description = t("pages.activation._activationCode.index.error.description");
	}
	return description;
});

onMounted(() => {
	submitHandler();
});

const buttonHandler = () => {
	showModal.value = false;
	router.push({ path: `/` });
};

const submitHandler = async () => {
	const activationCode = route.params.activationCode;
	const { result, success } = await execute(() => $axios.put(`/v1/activation/${activationCode}`));
	if (success) {
		keyword.value = result.data.keyword;
		activated.value = result.data.success;
	}
	showModal.value = true;
};
</script>

<style scoped>
section {
	margin-top: 10%;
}
</style>
