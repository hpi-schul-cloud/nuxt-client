<template>
	<div>
		<div>
			<h5 v-if="title">{{ title }}</h5>
			<span v-if="color" class="box">
				on backgroud: {{ variable }} => <br />
				use text color: {{ textColor }}</span
			>
			<div class="color-value flex" :style="{ backgroundColor: color }">
				<p class="text" :style="{ color: `var(${textColor})`, margin: 0 }">
					text
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: "",
		},
		variable: {
			type: String,
			default: "",
		},
		textColor: {
			type: String,
			default: "",
		},
	},
};
</script>
<style lang="scss" scoped>
.color-value {
	width: 100px;
	height: 30px;
	margin-bottom: var(--space-md);
}

.flex {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
