<template>
	<div @click="copyToClipboard(iconName)">
		<base-card class="icon-card" @click="copyToClipboard">
			<div class="icon">
				<base-icon source="custom" :icon="iconName" />
			</div>
			<div class="name">
				{{ iconName }}
			</div>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@components/base/BaseCard";
export default {
	components: { BaseCard },
	props: {
		iconName: {
			type: String,
			default: "",
		},
	},
	methods: {
		copyToClipboard(element) {
			const tempInput = document.createElement("input");
			tempInput.value = element;
			document.body.appendChild(tempInput);
			tempInput.select();
			document.execCommand("copy");
			const successful = document.execCommand("copy");
			if (successful) {
				this.$toast.success("Copied to clipboard!");
			} else {
				this.$toast.error(element);
			}
			document.body.removeChild(tempInput);
		},
	},
};
</script>

<style lang="scss" scoped>
/* stylelint-disable sh-waqar/declaration-use-variable */

.icon-card {
	display: flex;
	align-items: center;
	justify-content: center;
	float: left;
	width: 100px;
	height: 100px;
	margin: 10px;
	text-align: center;
	cursor: pointer;

	.icon {
		font-size: 1.6em;
	}

	.name {
		max-width: 80px;
		overflow: hidden;
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
