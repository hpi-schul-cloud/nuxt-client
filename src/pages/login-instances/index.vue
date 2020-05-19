<template>
	<div class="container">
		<h6>{{ $t("components.molecules.LoginWindows.login") }}</h6>
		<h1>{{ $t("components.molecules.LoginWindows.bundesland") }}</h1>
		<div class="box-container">
			<div class="boxes">
				<div v-for="(window, index) in Windows" :key="index" class="box">
					<base-link :href="window.url">
						<base-icon source="custom" :icon="window.icon" />
					</base-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			Windows: [
				{
					icon: "hpi-logo",
					url: "https://open.schul-cloud.org/login",
					color: "#185888",
				},
				{
					icon: "brandenburg",
					url: "https://brandenburg.schul-cloud.org/login",
					color: "#185888",
				},
				{
					icon: "nieder",
					url: "https://niedersachsen.cloud/login",
					color: "#185888",
				},
				{
					icon: "tsc2",
					url: "https://schulcloud-thueringen.de/login",
					color: "#185888",
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
$mobile: 750px; // css variables do not work with media queries

.container {
	display: flex;
	flex-direction: column;
}
.box-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
}
.link-transparent {
	color: transparent;
}
.boxes {
	display: flex;
	flex-flow: row wrap;
	width: 400px;
}
.box {
	width: 150px;
	height: 150px;
	margin: calc(15 * var(--border-width));
}
.icon {
	width: 100% !important;
	height: 100% !important;
}

@media (max-width: $mobile) {
	h1:first-of-type {
		margin-top: 0;
	}
	h6 {
		margin-bottom: 0;
	}
}
</style>
