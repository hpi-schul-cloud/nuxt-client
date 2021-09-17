// This is used to initialize the baseURL in localhost only
// It sets the global variable to be accessible by the axios plugin
// In production this file is replaced after the build to set the correct base URL

// eslint-disable-next-line no-unused-vars
const schoolCloudRuntimeConfig = {
	baseURL: "http://localhost:3030/api",
};
