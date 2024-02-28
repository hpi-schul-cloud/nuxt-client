export default {
	data() {
		return {
			bottom: false,
			scrollY: 0,
		};
	},
	created() {
		window.scrollTo({ top: 0, behavior: "smooth" });
		window.addEventListener("scroll", this.$_scrollEventHandler);
	},
	beforeUnmount() {
		window.removeEventListener("scroll", this.$_scrollEventHandler);
	},
	methods: {
		$_scrollEventHandler() {
			this.bottom = this.$_isBottomReached();
			this.scrollY = window.scrollY;
		},
		$_isBottomReached() {
			const { scrollY } = window;
			const visibleHeight = document.documentElement.clientHeight;
			const pageHeight = document.documentElement.scrollHeight;
			const bottomOfPage = Math.ceil(visibleHeight + scrollY) >= pageHeight;
			return bottomOfPage || pageHeight < visibleHeight;
		},
		$_backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
	},
};
