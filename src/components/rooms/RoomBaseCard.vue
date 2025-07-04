<template>
	<v-card
		class="card d-flex align-items-center"
		:aria-label="title"
		hover
		:data-testId="testId"
		@click="onClick"
	>
		<div class="w-100">
			<div class="d-flex align-content align-items-center">
				<div v-if="logoUrl" class="logo-container my-auto mr-4">
					<v-img
						height="100%"
						class="mx-auto"
						:src="logoUrl"
						:data-testid="`${testId}-logo`"
						:alt="$t('pages.rooms.tools.logo')"
					/>
				</div>
				<div class="d-flex flex-column w-100 min-width-0">
					<div class="d-flex">
						<h2 class="text-h5 my-auto">
							{{ title }}
						</h2>
						<v-icon
							v-if="openInNewTab"
							class="ml-1 my-auto text-no-wrap"
							data-testId="card-new-tab-icon"
						>
							{{ mdiOpenInNew }}
						</v-icon>
						<div class="mx-auto" />
						<slot name="right" />
					</div>
					<slot name="under-title" />
				</div>
			</div>
			<slot name="footer" />
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { mdiOpenInNew } from "@icons/material";

type Props = {
	title: string;
	logoUrl?: string;
	openInNewTab?: boolean;
	testId: string;
};

withDefaults(defineProps<Props>(), {
	logoUrl: undefined,
	openInNewTab: false,
});

const emit = defineEmits<{
	(e: "click"): void;
}>();

const onClick = () => {
	emit("click");
};
</script>

<style lang="scss" scoped>
$card-padding: 16px;
$logo-height: 80px;

.card {
	max-width: 100%;
	min-height: calc($card-padding * 2 + $logo-height);
	padding: $card-padding;
}

.logo-container {
	width: 120px;
	height: $logo-height;
}

@media only screen and (max-width: 749px) {
	.logo-container {
		width: 68px;
	}
}

@media only screen and (max-width: 399px) {
	.logo-container {
		display: none;
	}
}

.no-wrap {
	flex-shrink: 0;
}

.min-width-0 {
	min-width: 0;
}
</style>
