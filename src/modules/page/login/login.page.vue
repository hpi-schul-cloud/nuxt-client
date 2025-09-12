<template>
	<div class="display-block">
		<Login @login-failed="notification = true" />
		<LoginFailedHint v-if="notification" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Login from "@/modules/feature/login/login.vue";
import LoginFailedHint from "@/modules/feature/login/loginFailedHint.vue";

const notification = ref(false);
</script>
