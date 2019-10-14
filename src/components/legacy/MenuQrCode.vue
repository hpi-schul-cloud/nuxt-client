<template>
	<div>
		<base-qr-code ref="qrcode" class="qrcode" :url="url" />
		<base-button design="outline" class="print-button" @click="openPrintMenu">
			<div class="print-button-content">
				<base-icon source="fa" icon="print" class="print-icon" />
				Drucken
			</div>
		</base-button>
	</div>
</template>

<script>
export default {
	props: {
		url: {
			type: String,
			default: window.location.href,
		},
	},
	methods: {
		openPrintMenu: function() {
			const win = window.open();
			win.document.write(this.$refs.qrcode.$el.innerHTML);
			win.print();
			win.close();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.qrcode {
	margin: var(--space-md);
}

.print-button {
	margin-bottom: var(--space-md);
	margin-left: var(--space-md);
}

.print-icon {
	margin-right: var(--space-xs);
}

.print-button-content {
	display: flex;
}
</style>
