<template>
	<div>
		<ul class="tabs" alt="tabs">
			<li
				v-for="tab in tabs"
				:key="tab.name"
				:class="{ 'is-active': tab.isActive }"
				@click="selectTab(tab)"
			>
				<div v-if="tab.hasPermission" class="li-content">
					<base-icon
						v-if="tab.iconName"
						class="tab-icon"
						source="custom"
						:icon="tab.iconName"
					/>
					<button
						class="tab-button"
						data-testid="tabButtonTest"
						:alt="tab.name"
					>
						<span>{{ tab.name }}</span>
					</button>
				</div>
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
			(tab) => tab && tab.props && tab.props.selected
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
.tab-icon {
	margin-right: var(--space-xs-3);
	font-size: var(--text-md);
}
ul.tabs {
	display: flex;
	justify-content: space-between;
	max-width: 1024px;
	padding: 0;
	margin-bottom: var(--space-md);
	.li-content {
		display: inline-flex;
		align-items: center;
	}
	li {
		display: inline-flex;
		justify-content: center;
		width: 100%;
		padding: var(--space-xs);
		font-family: var(--font-accent);
		font-size: var(--text-md);
		color: var(--color-disabled-dark);
		list-style: none;
		cursor: pointer;
		.tab-button {
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: PT Sans Narrow var(--font-accent);
			font-size: var(--text-md);
			font-weight: var(--font-weight-bold);
			line-height: var(--button-line-height);
			color: var(--color-disabled-dark);
			cursor: pointer;
			background: transparent;
			border: none;
			outline: none;
		}
		&.is-active {
			position: relative;
			color: var(--color-tertiary);
			.tab-button,
			.tab-icon {
				font-weight: var(--font-weight-bold);
				color: var(--color-tertiary);
				transition: var(--duration-transition-medium) ease-in-out;
			}
			&::after {
				position: absolute;
				top: calc(2.2 * (var(--space-md)));
				left: 0;
				width: 100%;
				height: 2px;
				content: " ";
				background: var(--color-tertiary);
				animation: fadeEffect var(--duration-transition-medium) ease-in-out;
			}
		}
	}
	li:hover:not(.is-active) {
		color: var(--color-gray-dark);
		.tab-button {
			color: var(--color-gray-dark);
		}
	}
}

@media screen and (max-width: 450px) {
	ul.tabs {
		max-width: 450px;
	}
	.tab-button span {
		animation: fadeEffect var(--duration-transition-medium) ease-in-out;
	}
	.tab-icon {
		margin-right: var(--space-xs-4);
		animation: fadeEffect var(--duration-transition-medium) ease-in-out;
	}
	li:not(.is-active) {
		span {
			display: none;
			animation: fadeEffect var(--duration-transition-medium) ease-in-out;
		}
	}
}

@media screen and (max-width: 1112px) and (orientation: landscape) {
	ul.tabs {
		max-width: 1023px;
	}
}

@keyframes fadeEffect {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
