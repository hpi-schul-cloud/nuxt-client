// scroll the whole document using scrollbars - if there is not enough space

export const useBodyScrolling = () => {
	const htmlTag = document.getElementsByTagName("html")[0];

	htmlTag?.style.setProperty("overflow", "auto");
	htmlTag?.style.setProperty("max-height", "100vh");

	return {};
};
