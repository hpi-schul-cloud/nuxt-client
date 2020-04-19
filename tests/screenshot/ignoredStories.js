// Add Regex for stories that should not be screenshoted
module.exports = [
	// groups
	"/story/1-design-tokens-.*",
	"/story/8-helpers-.*",
	"/story/([0-9]-[\\w-]+)--\\1$", // section introduction pages
	// single stories
	"/story/3-atoms-pulsatingdot--pulsing-dot",
	"/story/4-base-ui-components-base-ui--base-audio",
	"/story/4-base-ui-components-base-ui--base-video",
	"/story/4-base-ui-components-base-ui--basespinner",
	"/story/4-base-ui-components-modals--loading",
	"/story/7-others-languageswitcher--languageswitcher",
];
