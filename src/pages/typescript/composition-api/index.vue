<template>
	<div class="page-data">{{ pageData }}</div>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
	computed,
	onMounted,
} from "@vue/composition-api";

export default defineComponent({
	name: "IndexPage",
	// head() {
	// 	return {
	// 		title: `${isOpen.value}`,
	// 	};
	// },
	setup() {
		const pageData = ref({
			id: "",
			name: "",
			surname: "",
		});
		const isOpen = ref(false);

		const userName = computed(() => {
			return `User: ${pageData.value.name} ${pageData.value.surname}`;
		});

		const setData = () => {
			pageData.value = { id: "123", name: "Murat", surname: "Merdoglu" };
		};

		onMounted(() => {
			setData();
		});

		return {
			pageData,
			isOpen,
			userName,
			setData,
		};
	},
});
</script>
