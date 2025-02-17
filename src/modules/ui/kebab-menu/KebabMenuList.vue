<template>
	<VList role="menu" ref="menuList">
		<slot />
	</VList>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { VList } from "vuetify/lib/components/index.mjs";

const menuList = ref<VList>();

onMounted(() => {
	// without this timeout focus will not work as ref is not yet available
	// safari needs a longer timeout than other browsers
	setTimeout(() => {
		menuList.value?.focus("first");
	}, 20);
});
</script>
