// make expect(image).toMatchImageSnapshot(config) globally available
const { toMatchImageSnapshot } = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot });
