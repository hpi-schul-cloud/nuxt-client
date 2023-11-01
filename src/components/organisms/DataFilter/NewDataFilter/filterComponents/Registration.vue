<template>
	<div>
		<v-btn @click="onClick">Registiration</v-btn>
		<template v-for="(item, index) of registrationOptions" :key="index">
			<v-checkbox v-model="selected" :value="item.value" :label="item.title" />
		</template>
		{{ selected }}
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { registrationTypes } from "../types/filterTypes";

const registrationOptions = [
	{ title: "Registration Complete", value: registrationTypes.COMPLETE },
	{
		title: "Student Agreement Missing",
		value: registrationTypes.PARENT_AGREED,
	},
	{ title: "User Created", value: registrationTypes.MISSING },
];

const emit = defineEmits(["update:filter"]);

const selected = ref([]);

const onClick = () => {
	emit("update:filter", selected.value);
};
</script>
