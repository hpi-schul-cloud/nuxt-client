<template>
	<Sidebar v-model="sidebar" />
	<v-app-bar title="Application bar">
		<template v-slot:prepend>
			<v-app-bar-nav-icon @click="onClick" />
		</template>
	</v-app-bar>

	<v-main id="main-content" class="content">
		<application-error-wrapper>
			<snackbar />
			<router-view />
		</application-error-wrapper>
	</v-main>
	<loading-state-dialog />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@/components/feature-layout/Sidebar.vue";
import Snackbar from "@/components/molecules/Alert.vue";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";

const sidebar = ref(true);

const onClick = () => {
	sidebar.value = !sidebar.value;
};
</script>
