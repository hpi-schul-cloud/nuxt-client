<template>
	<error-page :error="error">
		<template #action>
			<v-btn color="primary" variant="flat" @click="retryPageload">
				{{ t("error.proxy.action") }}
			</v-btn>
		</template>
	</error-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import ErrorPage from "@/pages/Error.page.vue";

const error = ref({
	statusCode: 500,
	message: "",
});
const url = ref("");

const { t } = useI18n();

const route = useRoute();

error.value.message = t("error.proxy.description");

const retryPageload = () => {
	location.href = url.value;
};

onMounted(() => {
	const redirect = route.query.redirect as string | undefined;
	if (redirect) {
		url.value = redirect;
		setTimeout(() => {
			retryPageload();
		}, 10000);
	}
});
</script>
