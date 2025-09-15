<template>
	<!-- TODO: Maybe there is a better way for this styling...-->
	<v-container style="height: 3000px;">
		<Login @login-failed="notification = true" error-code="route.query.error_code" />
		<LoginFailedHint v-if="notification" />
	</v-container>
</template>

<script setup lang="ts">
import { Login, LoginFailedHint } from "@feature-login";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const notification = ref(false);

onMounted(() => {
	const error_code = route.query.error_code;
	if (error_code) {
		notification.value = true;
	}
});
</script>
