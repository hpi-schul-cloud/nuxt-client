<template>
	<VList ref="menuList" role="menu">
		<slot />
	</VList>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { VList } from "vuetify/lib/components/index.mjs";

const menuList = ref<VList>();

onMounted(() => {
	// Without this timeout, focus wouldn't work, as the ref is not yet available.
	// Safari, especially with VoiceOver, needs a longer timeout than other browsers.
	setTimeout(() => {
		menuList.value?.focus("first");
	}, 30);
});
</script>
