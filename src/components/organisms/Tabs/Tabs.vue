<template>
	<div>
		<ul class="tabs">
			<li
				v-for="tab in tabs"
				:key="tab.name"
				:class="{ 'is-active': tab.isActive }"
			>
				<button
					v-if="tab.hasPermission"
					class="tab-button"
					@click="selectTab(tab)"
				>
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
		this.tabs = this.$children.filter((child) => child.hasPermission);
		const hasSelection = this.tabs.some(
			(tab) => tab && tab.$props && tab.$props.selected
		);
		if (!hasSelection) {
			this.selectTab(this.tabs[0]);
		}
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
@import "@styles";
ul {
	padding: 0;
}
ul.tabs {
	width: 100%;
	margin-bottom: var(--space-md);
	border-bottom: 2px solid var(--color-gray-light);
	li {
		box-sizing: border-box;
		display: inline-block;
		padding: var(--space-xs);
		list-style: none;
		cursor: pointer;
		.tab-button {
			display: block;
			width: 100%;
			height: 100%;
			font-size: var(--text-sm);
			font-weight: var(--font-weight-bold);
			color: var(--gray-5);
			background: transparent;
			border: 0;
		}
		&.is-active {
			position: relative;
			.tab-button {
				color: var(--color-black);
			}
			&::after {
				position: absolute;
				bottom: -2px;
				left: 0;
				width: 100%;
				height: 2px;
				content: " ";
				background: rgb(167, 167, 167);
			}
		}
	}
}
</style>
