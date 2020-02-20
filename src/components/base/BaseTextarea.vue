<template>
	<base-input-default
		v-bind="$attrs"
		type="textarea"
		vmodel=""
		:disabled="disabled"
	>
		<template v-slot:icon>
			<base-icon
				source="custom"
				icon="create"
				class="icon"
				:class="{
					disabled: disabled,
				}"
			/>
		</template>
		<textarea
			ref="textarea"
			v-bind="$attrs"
			:value="vmodel"
			:rows="rows"
			:maxlength="maxLength"
			:class="{
				'with-lines': withLines,
				disabled: disabled,
			}"
			:disabled="disabled"
			v-on="$listeners"
			@input="inputHandler"
			@keydown="limitRowNumberOnKeydown"
			@paste="limitRowNumberOnPaste"
		>
			<slot/>
		</textarea
		>
	</base-input-default>
</template>

<script>
import BaseInputDefault from "@basecomponents/BaseInput/BaseInputDefault";

export default {
	components: {
		BaseInputDefault,
	},
	model: {
		prop: "vmodel",
		event: "updatemodel",
	},
	props: {
		vmodel: {
			type: String,
			required: true,
		},
		rows: {
			type: Number,
			default: 1,
			validator: (rows) => rows > 0,
		},
		maxRows: {
			type: Number,
			default: undefined,
			validator: (maxRows) => maxRows > 0,
		},
		maxLength: {
			type: Number,
			default: undefined,
			validator: (maxLength) => maxLength > 0,
		},
		withLines: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
	},
	computed: {
		numberOfLines: function() {
			return (this.vmodel.match(/\n/g) || []).length + 1;
		},
	},
	mounted: function() {
		this.resize();
	},
	methods: {
		inputHandler($event) {
			this.resize();
			this.$emit("updatemodel", $event.target.value);
		},
		resize() {
			this.$refs.textarea.style.height = "1px";
			const { scrollHeight } = this.$refs.textarea;
			const lineHeight = parseInt(
				getComputedStyle(this.$refs.textarea).getPropertyValue("--line-height"),
				10
			);
			const height = Math.max(scrollHeight, lineHeight * this.rows);
			this.$refs.textarea.style.height = height + "px";
		},
		limitRowNumberOnKeydown($event) {
			if (
				this.maxRows &&
				$event.keyCode.toString() === "13" &&
				this.numberOfLines === this.maxRows
			) {
				$event.preventDefault();
			}
		},
		limitRowNumberOnPaste($event) {
			if (this.maxRows) {
				const pastedText = (
					$event.clipboardData || window.clipboardData
				).getData("Text");
				const numberOfLines =
					this.numberOfLines + (pastedText.match(/\n/g) || []).length + 1;
				if (numberOfLines > this.maxRows) {
					const truncatedText = (this.vmodel + pastedText)
						.split(/\r\n|\r|\n/)
						.slice(0, this.maxRows)
						.join("\n");
					this.$refs.textarea.value = truncatedText;
					this.$refs.textarea.dispatchEvent(new Event("input"));
					this.resize();
					$event.preventDefault();
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.icon {
	margin-top: var(--space-xs);

	&.disabled {
		color: var(--color-disabled-dark);
	}
}

textarea {
	--line-height: 30px;

	width: 100%;
	// needed to prevent default padding in chrome and safari
	padding: 0;
	margin-bottom: var(--space-xxs);
	font-size: var(--text-md);
	line-height: var(--line-height);
	color: var(--color-text);
	resize: none;
	border: none;
	outline: none;

	&::placeholder {
		color: var(--color-gray);
	}
	&.disabled {
		color: var(--color-disabled-dark);
	}
}

.with-lines {
	--textarea-z-index: -1;

	position: relative;
	z-index: var(--textarea-z-index);
	margin-bottom: 0;
	background-image: linear-gradient(
			var(--color-white) 50%,
			var(--color-white) 50%
		),
		linear-gradient(
			transparent,
			transparent calc(var(--line-height) - 1px),
			var(--color-gray) calc(var(--line-height) - 1px),
			var(--color-gray) calc(var(--line-height))
		);
	background-repeat: no-repeat, repeat;
	background-attachment: local, local;
	background-position: left bottom, left top;
	background-size: 100% var(--line-height), 100% var(--line-height);
}
</style>
