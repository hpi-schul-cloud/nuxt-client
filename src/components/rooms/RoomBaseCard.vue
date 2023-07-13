<template>
	<v-card
		class="card d-flex align-items-center"
		:aria-label="title"
		hover
		@click="onClick"
		:data-testId="testId"
	>
		<div class="w-100">
			<div class="d-flex align-content align-items-center">
				<div v-if="logoUrl" class="logo-container my-auto mr-4">
					<v-img
						height="100%"
						class="mx-auto"
						:src="logoUrl"
						contain
						:data-testid="`${testId}-logo`"
						:alt="$t('pages.rooms.tools.logo')"
					/>
				</div>
				<h5 class="my-auto">
					{{ title }}
				</h5>
				<v-icon
					v-if="openInNewTab"
					class="ml-1 my-auto no-wrap"
					data-testId="tool-card-new-tab-text"
					>{{ mdiOpenInNew }}</v-icon
				>
				<div class="mx-auto"></div>
				<slot name="right"></slot>
			</div>
			<slot name="footer"></slot>
		</div>
	</v-card>
</template>

<script lang="ts">
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiOpenInNew } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["click"],
	props: {
		title: {
			type: String,
			required: true,
		},
		logoUrl: {
			type: String,
		},
		openInNewTab: {
			type: Boolean,
		},
		testId: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const t = (key: string): string => i18n.tc(key, 0);

		const onClick = () => {
			emit("click");
		};

		return {
			t,
			onClick,
			mdiOpenInNew,
		};
	},
});
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
</style>
