export default {
	data() {
		return {
			$_bottom: false,
			$_scrollY: 0,
		};
	},
	created() {
		window.scrollTo({ top: 0, behavior: "smooth" });
		window.addEventListener("scroll", this.$_scrollEventHandler);
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.$_scrollEventHandler);
	},
	methods: {
		$_scrollEventHandler() {
			this.$_bottom = this.$_isBottomReached();
			this.$_scrollY = window.scrollY;
		},
		$_isBottomReached() {
			const { scrollY } = window;
			const visibleHeight = document.documentElement.clientHeight;
			const pageHeight = document.documentElement.scrollHeight;
			const bottomOfPage = visibleHeight + scrollY >= pageHeight - 2;
			return bottomOfPage || pageHeight < visibleHeight;
		},
		$_backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
	},
};
