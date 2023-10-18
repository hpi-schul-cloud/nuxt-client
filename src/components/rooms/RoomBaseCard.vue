<template>
	<v-card
		class="card d-flex align-items-center"
		:aria-label="title"
		:hover="vuetifyHover"
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
				<div class="d-flex flex-column w-100">
					<div class="d-flex">
						<h5 class="my-auto">
							{{ title }}
						</h5>
						<v-icon
							v-if="openInNewTab"
							class="ml-1 my-auto no-wrap"
							data-testId="card-new-tab-icon"
						>
							{{ mdiOpenInNew }}
						</v-icon>
						<div class="mx-auto"></div>
						<slot name="right"></slot>
					</div>
					<slot name="under-title"></slot>
				</div>
			</div>
			<slot name="footer"></slot>
		</div>
	</v-card>
</template>

<script lang="ts">
import { mdiOpenInNew } from "@mdi/js";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

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
		const { t } = useI18n();

		const onClick = () => {
			emit("click");
		};

		/**
		 * VUE3_UPGRADE
		 * - There is a bug report on Vuetify that using the hover attribute on v-card components is problematic.
		 * - https://github.com/vuetifyjs/vuetify/issues/17574
		 * - Remove this 'vuetifyHover' flag after the upcoming Vuetify release if the issue is solved.
		 */
		const vuetifyHover = false;

		return {
			t,
			onClick,
			mdiOpenInNew,
			vuetifyHover,
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
