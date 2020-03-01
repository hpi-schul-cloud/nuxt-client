<template>
	<div class="custom-modal-wrapper" @click.self="handleCancle">
		<div class="custom-modal">
			<h2 class="title">{{ title }}</h2>
			<div class="body">
				<slot />
			</div>
			<div class="footer">
				<button class="btn btn--secondary remove" @click="handleRemove">
					{{ labelRemove }}
				</button>
				<div style="flex: 1" />
				<button class="btn btn--secondary cancle" @click="handleCancle">
					{{ labelCancle }}
				</button>
				<button class="btn btn--primary apply" @click="handleApply">
					{{ labelApply }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		labelApply: {
			type: String,
			default: "Apply",
		},
		labelCancle: {
			type: String,
			default: "Cancle",
		},
		labelRemove: {
			type: String,
			default: "Remove",
		},
	},
	methods: {
		handleApply() {
			this.$emit("apply");
		},
		handleCancle() {
			this.$emit("cancle");
		},
		handleRemove() {
			this.$emit("remove");
		},
	},
};
</script>

<style lang="scss" scoped>
.custom-modal-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	z-index: var(--layer-modal);
	width: 100%;
	height: 100%;
	background-color: var(--color-gray);
}
.custom-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: var(--layer-modal);
	min-width: 60ch;
	max-width: 600px;
	padding: var(--space-md);
	background: #fff;
	border-radius: var(--radius-md);
	-webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
		0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
	box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
		0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
.title {
	padding-bottom: var(--space-xs-2);
	margin: var(--space-xs) 0 var(--space-md);
	font-size: var(--font-weight-normal);
	line-height: var(--line-height-md);
	border-bottom: 1px solid #eaecef;
}
.body {
	margin: var(--space-md) 0 var(--space-xl);
}
.footer {
	display: flex;
	justify-content: flex-end;
	.btn {
		padding: var(--space-xs) var(-space-md);
		margin: 0 var(--space-xs-3);
		font-family: inherit;
		font-size: var(--font-weight-light);
		text-transform: uppercase;
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		-webkit-transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		&:first-of-type {
			margin-left: 0;
		}
		&:last-of-type {
			margin-right: 0;
		}
		&:hover,
		&:focus {
			background-color: var(--color-gray);
		}
		&.btn--primary {
			color: var(--color-white);
			background-color: var(--color-info);
			&:hover,
			&:focus {
				background-color: var(--color-info-dark);
			}
		}
	}
}
</style>
