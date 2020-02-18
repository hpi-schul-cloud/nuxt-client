<template>
	<base-link class="flex" :href="href">
		<div
			class="image-container"
			:style="{
				'background-image': `url(${image} )`,
			}"
		>
		</div>
		<div class="container-base">
			<div class="container">
				<div class="container-icon">
					<base-icon
						source="fa"
						:icon="ic"
						:style="{
							'font-size': `var(--space-lg)`,
							'margin-bottom': 0,
							color: `var(--color-secondary)`,
						}"
					>
					</base-icon>
				</div>
				<p class="heading">
					{{ heading }}
					<base-icon
						source="fa"
						icon="fas fa-chevron-right"
						:style="{
							'font-size': `var(--space-md)`,
							color: `var(--color-white)`,
						}"
					>
					</base-icon>
				</p>
			</div>
		</div>
	</base-link>
</template>

<script>
export default {
	props: {
		heading: {
			type: String,
			default: "",
		},
		href: {
			type: String,
			default: undefined,
		},
		image: {
			type: String,
			default: "",
		},
		ic: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.flex {
	display: flex;
	flex-direction: column;
}

.container-base {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: center;
}
.container-icon {
	position: absolute;
	top: -30px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	background-color: var(--color-white);
	border: 2px solid var(--color-white);
	border-radius: var(--radius-round);
	box-shadow: var(--shadow-sm);
}

.container {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	padding: var(--space-md);
	background-color: var(--color-secondary);
	border-radius: 0 0 var(--radius-md) var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-m);
	}
}

.image-container {
	height: 200px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	border-radius: var(--radius-md) var(--radius-md) 0 0;
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-m);
	}
}
.heading {
	margin: var(--space-md) 0;
	color: var(--color-white);
}
</style>
