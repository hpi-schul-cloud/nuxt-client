<template>
	<div>
		<div class="header-container">
			<div class="header-top">
				<h1 class="h2">{{ title }}</h1>
				<span v-if="hasActions" class="ctx-menu">
					<base-button
						aria-label="Open up course context menu"
						design="text icon"
						@click="active = !active"
					>
						<base-icon v-bind="$attrs" />
					</base-button>
					<context-menu
						:show.sync="active"
						v-bind="$attrs"
						:actions="actions"
						v-on="$listeners"
					/>
				</span>
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
import ContextMenu from "@components/molecules/ContextMenu";
import BaseButton from "@components/base/BaseButton";
import BaseIcon from "@components/base/BaseIcon";

export default {
	components: {
		ContextMenu,
		BaseButton,
		BaseIcon,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		actions: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			active: false,
		};
	},
	computed: {
		hasActions() {
			return this.actions.length !== 0;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

h1:first-of-type {
	margin: 0;
}

.header-container {
	margin-top: var(--space-xl-2);
	margin-bottom: var(--space-md);

	.header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-sm);

		.header-title {
			font-size: var(--heading-2);
		}
	}

	.ctx-menu {
		position: relative;
	}
}
</style>
