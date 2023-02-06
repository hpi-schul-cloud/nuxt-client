/**
 * Device media queries according to Vuetify Breakpoints to be used with vue-use useMediaQuery composable
 * @see https://vuetifyjs.com/en/features/breakpoints/
 * @see https://vueuse.org/useMediaQuery
 */
export enum DeviceMediaQuery {
	Mobile = "(max-width: 599px)",
	Tablet = "(min-width: 600px) and (max-width: 1263px)",
	Desktop = "(min-width: 1264px)",
}
