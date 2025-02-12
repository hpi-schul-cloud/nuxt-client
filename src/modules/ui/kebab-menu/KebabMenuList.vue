<template>
	<VList role="menu" ref="kebabMenuList">
		<slot />
	</VList>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VList } from "vuetify/lib/components/index.mjs";

const kebabMenuList = ref<VList>();

onMounted(() => {
	setTimeout(() => {
		kebabMenuList.value?.focus("first");
	}, 10);
});
</script>
