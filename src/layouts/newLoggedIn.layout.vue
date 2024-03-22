<template>
	<v-app-bar title="Application bar">
		<template v-slot:prepend>
			<v-app-bar-nav-icon @click="onClick" />
		</template>
	</v-app-bar>
	<Sidebar v-model="sidebar" />

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
import Sidebar from "@/components/feature-layout/Sidebar";
import Snackbar from "@/components/molecules/Alert";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper";

const sidebar = ref(null);

const onClick = () => {
	sidebar.value = !sidebar.value;
};
</script>
