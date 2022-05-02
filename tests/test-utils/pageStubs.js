export default function mock$objects(wrapper, options = null) {
	wrapper.vm.$toast = {};
	wrapper.vm.$toast.success =
		options && options.$toast && options.$toast.success
			? jest.fn(options.$toast.success)
			: jest.fn();
	wrapper.vm.$toast.success =
		options && options.$toast && options.$toast.error
			? jest.fn(options.$toast.error)
			: jest.fn();
	wrapper.vm.$toast.error = jest.fn();
	wrapper.vm.$router = { push: jest.fn() };
}
