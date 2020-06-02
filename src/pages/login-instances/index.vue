<template>
	<div class="login-container">
		<h1 class="h6" :class="{ margin: isMobile }">
			{{ $t("pages.loginInstances.login") }}
		</h1>
		<h2 class="h1" :class="{ margin: isMobile }">
			{{ $t("pages.loginInstances.bundesland") }}
		</h2>
		<div class="box-container">
			<div class="boxes" :class="{ gap: isMobile }">
				<div v-for="(tile, index) in tiles" :key="index">
					<instance-tile :tile="tile"></instance-tile>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import InstanceTile from "@/components/molecules/InstanceTile";
export default {
	components: {
		InstanceTile,
	},
	layout: "loggedoutFullWidth",
	meta: {
		isPublic: true,
	},
	data: function () {
		return {
			tiles: [
				{
					icon: "hpi",
					url: this.$t("pages.loginInstances.hpi_link"),
				},
				{
					icon: "brb",
					url: this.$t("pages.loginInstances.brb_link"),
				},
				{
					icon: "n21",
					url: this.$t("pages.loginInstances.n21_link"),
				},
				{
					icon: "thr",
					url: this.$t("pages.loginInstances.thr_link"),
				},
			],
		};
	},
	computed: {
		isMobile() {
			return this.$mq === "mobile";
		},
	},
};
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	flex-direction: column;
	margin: 0;
}
.box-container {
	display: flex;
	justify-content: center;
}
.boxes {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: var(--space-lg);
}
.boxes.gap {
	grid-gap: var(--space-sm);
}
.h1 {
	margin-top: 0 !important;
	margin-bottom: var(--space-xl-4) !important;
	font-size: var(--sidebar-sub-item-height);
}
.h6 {
	margin-bottom: var(--space-md);
}
.h1.margin {
	margin-bottom: var(--space-xl-3) !important;
}
.h6.margin {
	margin-bottom: var(--border-width-bold);
}
</style>
