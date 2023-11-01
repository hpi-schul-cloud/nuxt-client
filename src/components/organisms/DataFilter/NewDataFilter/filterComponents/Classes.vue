<template>
	<div>
		<v-btn @click="onClick">Registiration</v-btn>
		<template v-for="(item, index) of classes" :key="index">
			<v-checkbox v-model="selected" :value="item" :label="item" />
		</template>
		{{ selected }}
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["update:filter"]);

const classes = ["1A", "1B", "2C"];

const selected = ref([]);

const onClick = () => {
	emit("update:filter", selected.value);
};
</script>
