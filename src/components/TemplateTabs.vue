<template>
	<div>
		<ul class="tabs">
			<li
				v-for="(tab, index) in tabs"
				:key="index"
				:class="{ 'is-active': tab.isActive }"
			>
				<button class="tab-button" @click="selectTab(tab)">
					<span>{{ tab.name }}</span>
				</button>
			</li>
		</ul>
		<div class="tabs-details">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tabs: [],
		};
	},
	mounted() {
		this.tabs = this.$children;
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach((tab) => {
				tab.isActive = tab.name === selectedTab.name;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
ul {
	padding: 0;
}
ul.tabs {
	width: 100%;
	margin-bottom: 24px;
	border-bottom: 2px solid rgb(234, 234, 234);
	li {
		box-sizing: border-box;
		display: inline-block;
		height: 40px;
		padding: 8px;
		list-style: none;
		cursor: pointer;
		.tab-button {
			display: block;
			width: 100%;
			height: 100%;
			font-size: 14px;
			font-weight: 600;
			color: #707070;
			background: transparent;
			border: 0;
		}
		&.is-active {
			position: relative;
			.tab-button {
				color: #000;
			}
			&::after {
				position: absolute;
				bottom: -2px;
				left: 0;
				z-index: 100;
				width: 100%;
				height: 2px;
				content: " ";
				background: rgb(167, 167, 167);
			}
		}
	}
}
</style>
