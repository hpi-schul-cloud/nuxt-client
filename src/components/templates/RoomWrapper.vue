<template>
	<default-wireframe
		ref="main"
		headline=""
		:full-width="true"
		:fab-items="fabItems"
	>
		<template #header>
			<slot name="header" />
		</template>
		<template v-if="isLoading">
			<v-container class="loader">
				<v-skeleton-loader
					ref="skeleton-loader"
					type="date-picker-days"
					class="mt-6"
				/>
			</v-container>
		</template>
		<template v-else-if="isEmptyState">
			<v-custom-empty-state
				ref="rooms-empty-state"
				image="rooms-empty-state"
				:title="$t('pages.rooms.allRooms.emptyState.title')"
				class="mt-16"
			/>
		</template>
		<template v-else>
			<slot name="page-content" />
		</template>
	</default-wireframe>
</template>

<script>
import { authModule, roomsModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { mdiPlus } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		DefaultWireframe,
		vCustomEmptyState,
	},
	props: {
		hasRooms: {
			type: Boolean,
			required: true,
		},
		hasImportToken: {
			type: Boolean,
			required: false,
		},
	},
	computed: {
		fabItems() {
			if (
				authModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())
			) {
				return {
					icon: mdiPlus,
					title: this.$t("common.actions.create"),
					href: "/courses/add",
					ariaLabel: this.$t("pages.rooms.fab.ariaLabel"),
					dataTestId: "add-course-button",
				};
			}

			return null;
		},
		isLoading() {
			return roomsModule.getLoading;
		},
		isEmptyState() {
			return !roomsModule.getLoading && !this.hasRooms && !this.hasImportToken;
		},
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";

:deep(.v-skeleton-loader__date-picker-days) {
	justify-content: space-between;
	padding: 0;
}

:deep(.v-skeleton-loader__avatar) {
	width: 80px;
	max-width: 80px;
	margin: 12px;
}

.loader {
	// padding: 0 var(--space-lg); // Desktop
	max-width: var(--size-content-width-max);
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
	:deep(.v-skeleton-loader__avatar) {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin: 12px 36px;
	}
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	:deep(.v-skeleton-loader__avatar) {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin: 24px 36px;
	}
}
</style>
