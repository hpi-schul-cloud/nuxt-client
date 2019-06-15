<template>
	<label
		:class="{
			wrapper: true,
			'with-hint': hasInfo,
		}"
	>
		<div class="top">
			<div v-if="$slots.icon" class="icon-before">
				<slot name="icon" />
			</div>
			<div class="core">
				<div class="label">
					{{ label }}
				</div>
				<slot>
					<input
						v-bind="$attrs"
						:type="type"
						:value="vmodel"
						@input="handleInput"
					/>
				</slot>
			</div>
			<base-icon
				v-if="error"
				source="material"
				icon="warning"
				class="icon-behind"
			/>
		</div>
		<span
			v-if="hasInfo"
			:class="{
				info: true,
				hint: !!hint & !error,
				error: !!error,
			}"
		>
			{{ error || hint }}
		</span>
	</label>
</template>
<script>
export const supportedTypes = [
	"email",
	"password",
	"search",
	"tel",
	"text",
	"url",
	"number",
];

export default {
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
			type: [String, Number],
			required: true,
		},
		type: {
			type: [String, Boolean], // Boolean is used to disable validation when the slot is used
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type) || !type;
			},
		},
		label: {
			type: String,
			required: true,
		},
		hint: {
			type: String,
			default: "",
		},
		error: {
			type: String,
			default: "",
		},
	},
	computed: {
		hasInfo() {
			return !!(this.error || this.hint);
		},
	},
	methods: {
		handleInput(event) {
			let newVal = event.target.value;
			if (this.type === "number") {
				newVal = parseInt(newVal, 10);
			}
			this.$emit("input", newVal);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.wrapper {
	display: block;
	&:not(.with-hint) {
		margin-bottom: calc(var(--text-sm) * var(--line-height-md));
	}
}

.top {
	display: flex;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid var(--color-gray);
	&:focus-within {
		border-bottom-color: var(--color-gray-dark);
		outline: none;
	}
	.icon-before {
		margin-right: var(--space-xs);
		font-size: var(--text-lg);
	}
	.core {
		flex: 1;
		.label {
			font-size: var(--text-sm);
		}
		input {
			width: 100%;
			color: var(--color-text);
			border: none;
		}
	}
	.icon-behind {
		margin-left: var(--space-xs);
		font-size: var(--text-lg);
		color: var(--color-danger);
	}
}

.info {
	display: block;
	font-size: var(--text-sm);
	color: var(--color-gray);
	&.error {
		color: var(--color-danger);
	}
}
</style>
