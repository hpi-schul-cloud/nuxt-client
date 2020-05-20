<template>
	<div class="login-container">
		<h1 class="h6" :class="isMobile ? 'margin' : ''">
			{{ $t("components.molecules.LoginWindows.login") }}
		</h1>
		<h2 class="h1" :class="isMobile ? 'margin' : ''">
			{{ $t("components.molecules.LoginWindows.bundesland") }}
		</h2>
		<div class="box-container">
			<instance-tile :windows="windows"></instance-tile>
		</div>
	</div>
</template>

<script>
import InstanceTile from "@/components/base/InstanceTile";

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
			windows: [
				{
					icon: "default",
					url: this.$t("components.molecules.LoginWindows.hpi_link"),
				},
				{
					icon: "brb",
					url: this.$t("components.molecules.LoginWindows.brb_link"),
				},
				{
					icon: "n21",
					url: this.$t("components.molecules.LoginWindows.n21_link"),
				},
				{
					icon: "thr",
					url: this.$t("components.molecules.LoginWindows.thr_link"),
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
	flex-flow: row wrap;
	justify-content: center;
}
.h1 {
	margin-top: 0 !important;
}

.h1.margin {
	margin-top: 0;
}
.h6.margin {
	margin-bottom: 0;
}
</style>
