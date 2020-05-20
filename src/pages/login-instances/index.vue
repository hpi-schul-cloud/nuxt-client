<template>
	<div class="container">
		<h1 class="h6" :class="isMobile ? 'margin' : ''">
			{{ $t("components.molecules.LoginWindows.login") }}
		</h1>
		<h2 class="h1" :class="isMobile ? 'margin' : ''">
			{{ $t("components.molecules.LoginWindows.bundesland") }}
		</h2>
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
.boxes {
	display: flex;
	flex-flow: row wrap;
	width: 360px;
}
.box {
	width: calc(3 * var(--topbar-height));
	height: calc(3 * var(--topbar-height));
	margin: calc(15 * var(--border-width));
}
.icon {
	width: 100% !important;
	height: 100% !important;
}

.h1.margin {
	margin-top: 0;
}
.h6.margin {
	margin-bottom: 0;
}
</style>
