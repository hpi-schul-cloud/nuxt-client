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
	margin-right: var(--space-xs-4);
	animation: fadeEffect var(--duration-transition-medium) ease-in-out;

	@include breakpoint(tablet) {
		margin-right: var(--space-xs-3);
		font-size: var(--text-md);
	}
}

ul.tabs {
	display: flex;
	justify-content: center;
	max-width: 34rem;
	padding: 0;
	margin-bottom: var(--space-md);
	box-shadow: inset 0 -3px 0 var(--color-gray-light);
	.li-content {
		display: inline-flex;
		align-items: center;
	}
	li {
		display: inline-flex;
		justify-content: center;
		width: 100vw;
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
		&.span {
			animation: fadeEffect var(--duration-transition-medium) ease-in-out;
		}
		&.is-active {
			position: relative;
			color: var(--color-tertiary);
			.tab-button,
			.tab-icon {
				font-weight: var(--font-weight-bold);
				color: var(--color-tertiary);
				transition: var(--duration-transition-medium) ease-in;
			}
			&::after {
				position: absolute;
				top: calc(2.1 * (var(--space-md)));
				left: 0;
				width: 100%;
				height: 3px;
				content: " ";
				background: var(--color-tertiary);
				box-shadow: 0 0 1px 0 var(--color-tertiary);
				animation: fadeEffect var(--duration-transition-medium) ease-in;

				@include breakpoint(tablet) {
					top: calc(2.25 * (var(--space-md)));
				}

				@include breakpoint(desktop) {
					top: calc(2.45 * (var(--space-md)));
				}
			}
		}
		&:not(.is-active) {
			span {
				display: none;

				@include breakpoint(tablet) {
					display: block;
				}
			}
		}
		&:hover:not(.is-active) {
			color: var(--color-gray-dark);
			.tab-button {
				color: var(--color-gray-dark);
			}
		}
	}

	@include breakpoint(tablet) {
		max-width: 64rem;
	}

	@include breakpoint(desktop) {
		max-width: 100vw;
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
