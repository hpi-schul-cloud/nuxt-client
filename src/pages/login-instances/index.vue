<template>
	<div class="container">
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
	data: function () {
		return {
			windows: [
				{
					icon: "default",
					url: "https://open.schul-cloud.org/login",
				},
				{
					icon: "brb",
					url: "https://brandenburg.schul-cloud.org/login",
				},
				{
					icon: "n21",
					url: "https://niedersachsen.cloud/login",
				},
				{
					icon: "thr",
					url: "https://schulcloud-thueringen.de/login",
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
.container {
	display: flex;
	flex-direction: column;
}
.box-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
}

.h1.margin {
	margin-top: 0;
}
.h6.margin {
	margin-bottom: 0;
}
</style>
