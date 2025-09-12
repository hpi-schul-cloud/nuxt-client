<template>
	<v-container>
		<Login @login-failed="notification = true" />
		<LoginFailedHint v-if="notification" />
		<div>
			<br v-for="n in 100" :key="n" />
		</div>
	</v-container>
</template>
<!-- TODO: There must be a way to make that better...-->

<script setup lang="ts">
import { Login, LoginFailedHint } from "@feature-login";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const notification = ref(false);

onMounted(() => {
	if (route.query.error) {
		notification.value = true;
	}
});
</script>
