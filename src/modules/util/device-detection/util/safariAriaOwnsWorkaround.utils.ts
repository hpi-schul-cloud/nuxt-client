/**
 * Workaround for Vuetify Safari aria-owns menu issue introduced in Vuetify 3.10.8.
 *
 * See: https://github.com/vuetifyjs/vuetify/issues/22540
 *
 * Please remove once Vuetify has fixed this issue.
 */
export const safariAriaOwnsWorkaround =
	/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/Firefox/.test(navigator.userAgent)
		? { "aria-owns": undefined }
		: {};
