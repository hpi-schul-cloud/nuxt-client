<template>
	<base-input-default v-bind="$attrs" type="textarea" vmodel="">
		<template slot="icon">
			<base-icon
				source="custom"
				icon="create"
				class="icon"
			/>
		</template>
		<textarea
			ref=textarea
			v-bind="$attrs"
			:value="vmodel"
			:rows="rows"
			:maxlength="maxLength"
			:class="{
				'with-lines': withLines,
			}"
			v-on="$listeners"
			@input="inputHandler"
		>
			<slot/>
		</textarea>
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
			validator: rows => rows > 0,
		},
		maxLength: {
			type: Number,
			default: undefined,
			validator: maxLength => maxLength > 0,
		},
		withLines: {
			type: Boolean,
		}
	},
	mounted: function () {
		this.resize();
	},
	methods: {
		inputHandler ($event) {
			this.resize();
			this.$emit('updatemodel', $event.target.value);
		},
		resize () {
			this.$refs.textarea.style.height = "1px";
			const { scrollHeight } = this.$refs.textarea;
			const lineHeight = 25;
			const height = Math.max(scrollHeight, lineHeight * this.$refs.textarea.rows);
			this.$refs.textarea.style.height = height + 'px';
		}
  }
};
</script>

<style lang="scss" scoped>
@import "@styles";

.icon {
	margin-top: var(--space-xs);
}

textarea {
	--line-height: 30px;

	width: 100%;
	font-size: var(--text-md);
	line-height: var(--line-height);
	color: var(--color-text);
	resize: none;
	border: none;
	outline: none;

	&::placeholder {
		color: var(--color-gray);
	}
}

.with-lines {
	--textarea-z-index: -1;

	position: relative;
	z-index: var(--textarea-z-index);
	margin-bottom: calc(-1 * var(--space-xxs) - 4px);
	background-image: linear-gradient(var(--color-white) 50%, var(--color-white) 50%),
	linear-gradient( 
        transparent,
        transparent calc(var(--line-height) - 1px),
        var(--color-gray) calc(var(--line-height) - 1px),
		var(--color-gray) calc(var(--line-height)));
	background-repeat: no-repeat, repeat;
	background-attachment: local, local;
	background-position: left bottom, left top;
	background-size: 100% var(--line-height), 100% var(--line-height);
}

</style>
