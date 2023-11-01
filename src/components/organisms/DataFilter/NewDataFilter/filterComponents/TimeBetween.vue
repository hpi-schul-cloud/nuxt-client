<template>
	{{ dateSelection }}
	<v-btn @click="onClick">Ok</v-btn>
</template>
<script setup lang="ts">
const dateSelection = {
	firstDate: "01.01.2001",
	lastDate: "01.01.2023",
};

const emit = defineEmits(["update:filter"]);

const onClick = () => {
	emit("update:filter", dateSelection);
};
</script>
