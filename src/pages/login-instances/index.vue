<template>
	<div class="login-container">
		<h1 class="h6" :class="{ margin: isMobile }">
			{{ $t("pages.loginInstances.login") }}
		</h1>
		<h2 class="h1" :class="{ margin: isMobile }">
			{{ $t("pages.loginInstances.bundesland") }}
		</h2>
		<div
			class="box-container"
			:class="{
				'box-container-mobile': isMobile,
				'box-container-tablet': isTablet,
			}"
		>
			<div class="boxes" :class="{ mobile: isMobile }">
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
	layout: "loggedoutFullLayout",
	meta: {
		isPublic: true,
	},
	data: function () {
		return {
			tiles: [
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
				{
					icon: "mint-ec",
					url: this.$t("pages.loginInstances.mintec_link"),
				},
				{
					icon: "dBildungscloud",
					url: this.$t("pages.loginInstances.dbildungscloud_link"),
				},
				{
					icon: "open_HPI",
					url: this.$t("pages.loginInstances.open_hpi_link"),
				},
			],
		};
	},
	computed: {
		isMobile() {
			return this.$mq === "mobile";
		},
		isTablet() {
			return this.$mq === "tablet";
		},
	},
	head() {
		return {
			title: "HPI Schul-Cloud",
		};
	},
};
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0;
}
.box-container {
	display: grid;
	justify-content: center;
	padding: 0 calc(2.5 * var(--sidebar-width-tablet));
}
.box-container-tablet {
	padding: 0 calc(1.5 * var(--sidebar-width-tablet));
}
.box-container-mobile {
	padding: 0;
}
.boxes {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: var(--space-lg);
}
.boxes.mobile {
	grid-template-columns: 1fr 1fr;
	grid-gap: var(--space-sm);
}
.h6 {
	margin-top: var(--space-xl-4) !important;
	margin-bottom: var(--space-md);
}
.h1 {
	margin-top: 0 !important;
	margin-bottom: var(--space-xl-4) !important;
	font-size: var(--sidebar-sub-item-height);
}
.h6.margin {
	margin-top: var(--space-xs) !important;
	margin-bottom: var(--border-width-bold);
}
.h1.margin {
	margin-bottom: var(--space-lg) !important;
}
</style>
