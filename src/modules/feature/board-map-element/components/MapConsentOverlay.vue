<template>
	<div class="consent-container">
		<div class="consent-blur-bg" />
		<VCard class="consent-card" elevation="4">
			<VCardText class="text-center">
				<p class="consent-title mb-2">{{ t("feature-board-map-element.consent.title") }}</p>
				<p class="consent-description mb-4">
					{{ t("feature-board-map-element.consent.description") }}
				</p>
				<VBtn color="primary" @click="emit('approve')">
					{{ t("feature-board-map-element.consent.approve") }}
				</VBtn>
			</VCardText>
		</VCard>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits<{
	(e: "approve"): void;
}>();
</script>

<style scoped>
.consent-container {
	position: relative;
	height: 400px;
	width: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.consent-blur-bg {
	position: absolute;
	inset: 0;
	background: linear-gradient(
		145deg,
		#d6e8d4 0%,
		#c5d9c5 20%,
		#aecfb0 40%,
		#c8d8c0 60%,
		#d0dcc8 80%,
		#b8ccb8 100%
	);
	filter: blur(6px);
	transform: scale(1.05);
}

.consent-card {
	position: relative;
	z-index: 1;
	max-width: 400px;
	width: 90%;
}

.consent-title {
	font-weight: 600;
	font-size: 1rem;
}

.consent-description {
	font-size: 0.875rem;
	color: rgba(0, 0, 0, 0.65);
	line-height: 1.5;
}
</style>
