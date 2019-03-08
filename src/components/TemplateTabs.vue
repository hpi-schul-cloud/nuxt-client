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
	name: "TemplateTabs",

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
		a {
			display: block;
			width: 100%;
			height: 100%;
			font-size: 14px;
			font-weight: 600;
			color: #707070;
		}
		&.is-active {
			position: relative;
			a {
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
