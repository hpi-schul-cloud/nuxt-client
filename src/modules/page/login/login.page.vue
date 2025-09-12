<template>
	<div class="display-block">
		<Login @login-failed="notification = true" />
		<LoginFailedHint v-if="notification" />
	</div>
</template>

<script setup lang="ts">
import { Login, LoginFailedHint } from "@feature-login";
import { ref } from "vue";

const notification = ref(false);
</script>
