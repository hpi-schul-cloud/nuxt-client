export default function mock$objects(wrapper, options = null) {
	wrapper.vm.$toast = {};
	wrapper.vm.$toast.success =
		options && options.$toast && options.$toast.success
			? vi.fn(options.$toast.success)
			: vi.fn();
	wrapper.vm.$toast.success =
		options && options.$toast && options.$toast.error
			? vi.fn(options.$toast.error)
			: vi.fn();
	wrapper.vm.$toast.error = vi.fn();
	wrapper.vm.$toast.info = vi.fn();
	wrapper.vm.$router = { push: vi.fn() };
}
