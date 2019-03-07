<template>
	<div>
		<ul class="tabs">
			<li
				v-for="(tab, index) in tabs"
				:key="index"
				:class="{ 'is-active': tab.isActive }"
			>
				<a @click="selectTab(tab)">
					<span>{{ tab.name }}</span>
				</a>
			</li>
		</ul>
		<div class="tabs-details">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "Tabs",

	data() {
		return {
			tabs: [],
		};
	},
	created() {
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
	border-bottom: 2px solid rgb(234, 234, 234);
	margin-bottom: 24px;
	li {
		display: inline-block;
		padding: 8px;
		height: 40px;
		box-sizing: border-box;
		list-style: none;
		cursor: pointer;
		a {
			display: block;
			height: 100%;
			width: 100%;
			color: #707070;
			font-weight: 600;
			font-size: 14px;
		}
		&.is-active {
			position: relative;
			a {
				color: #000;
			}
			&:after {
				content: " ";
				height: 2px;
				width: 100%;
				position: absolute;
				bottom: -2px;
				left: 0;
				background: rgb(167, 167, 167);
				z-index: 100;
			}
		}
	}
}
</style>
