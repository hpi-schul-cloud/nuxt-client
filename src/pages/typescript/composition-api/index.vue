<template>
	<div>
		<div class="page-data">{{ pageData }}</div>
		<div class="school">{{ school.name }}</div>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
	computed,
	onMounted,
} from "@vue/composition-api";
import authModule from "@store/auth";

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
		const school = computed(() => {
			return authModule.getSchool;
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
			school,
		};
	},
});
</script>
