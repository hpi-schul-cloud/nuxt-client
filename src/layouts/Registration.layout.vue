<template>
	<VToolbar color="white" density="compact" elevation="2">
		<VContainer class="d-flex align-center pa-0" :style="isExtraSmallDevice ? 'justify-content: center;' : ''">
			<a href="/">
				<img
					:src="logo"
					class="ma-0"
					alt="Schulcloud Logo"
					:style="isExtraSmallDevice ? 'display: block; margin: 0 auto;' : ''"
				/>
			</a>
		</VContainer>
	</VToolbar>
	<VMain>
		<ApplicationError>
			<AlertContainer />
		</ApplicationError>
		<VContainer
			class="main-container"
			:style="isExtraSmallDevice ? 'width: 100%; margin-left: 0; margin-right: 0;' : ''"
		>
			<slot />
		</VContainer>
	</VMain>

	<TheFooter />
</template>

<script setup lang="ts">
import logo from "@/assets/img/logo/logo-image-mono.svg";
import TheFooter from "@/components/legacy/TheFooter.vue";
import { AlertContainer, ApplicationError } from "@ui-layout";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { xs } = useDisplay();
const isExtraSmallDevice = computed(() => xs.value);
</script>

<style lang="scss" scoped>
.main-container {
	width: 80%;
	margin-left: auto;
	margin-right: auto;
}
</style>
