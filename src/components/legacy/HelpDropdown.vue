<template>
	<ul class="dropdown-menu">
		<li v-for="menuItem in menuItems" :key="menuItem.label" class="menu-item">
			<span class="core">
				<base-icon
					:source="menuItem.source"
					:icon="menuItem.icon"
					fill="var(--v-secondary-darken1)"
				/>
				<base-link
					:href="menuItem.action"
					:target="menuItem.target"
					class="link"
					:title="menuItem.label"
					:aria-label="menuItem.label"
				>
					{{ menuItem.label }}
				</base-link>
			</span>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		menuItems: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
	float: left;
	width: 261px;
	min-width: 10rem;
	text-align: left;
	list-style-type: none;
}

.menu-item {
	--hover-color: #f5f5f5;

	position: relative;
	display: block;
	padding: var(--space-sm) var(--space-sm);
	font-size: var(--text-md); // text size in legacy client 14px;
	text-align: inherit;
	background-color: var(--v-white-base);
	border-bottom: 1px solid var(--v-grey-lighten2);

	&:first-child {
		border-top-left-radius: var(--radius-sm);
		border-top-right-radius: var(--radius-sm);
	}

	&:last-child {
		border: none;
		border-radius: var(--radius-sm);
	}

	&:hover {
		background-color: var(--hover-color);
	}

	.core {
		display: flex;
		align-items: center;
	}

	.link {
		padding-left: var(--space-sm); // space in legacy client 8px;
		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
}
</style>
