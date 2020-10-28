<template>
	<div>
		<div class="header-container">
			<div class="header-top">
				<span class="header-title">{{ title }}</span>
				<span v-if="hasActions" class="ctx-menu">
					<base-button design="text icon" @click="triggerContextMenu">
						<base-icon v-bind="$attrs" />
					</base-button>
					<context-menu :show.sync="active" v-bind="$attrs" v-on="$listeners" />
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
	},
	data() {
		return {
			active: false,
		};
	},
	computed: {
		hasActions() {
			return this.$attrs.hasOwnProperty("actions");
		},
	},
	methods: {
		triggerContextMenu() {
			this.active = !this.active;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.header-container {
	margin-top: var(--space-xl-2);
	margin-bottom: var(--space-xl);
	.header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.header-title {
			font-size: var(--heading-2);
		}
	}
	.ctx-menu {
		position: relative;
	}
}
</style>
