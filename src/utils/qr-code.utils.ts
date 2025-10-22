import { logger } from "@util-logger";
import QrcodeVue from "qrcode.vue";
import { h, render } from "vue";

export const printQrCodes = (qrCodeItems: { title?: string; description?: string; url: string }[]) => {
	const printWindow = window.open("", "_blank");

	if (printWindow) {
		printWindow.document.documentElement.innerHTML = `
  <html>
    <head>
      <title>Share QR-Codes</title>
      <style>        
          @page {
            size: A4;
            margin: 16px;
          }
        
          body {
            padding: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fit, 220px);
            grid-auto-rows: min-content;
            gap: 20px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Arial, sans-serif;
          }
          
          .qr-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            break-inside: avoid;
          }
          
          .qr-title {
            margin: 4px 0;
            font-size: 1.25em;
            font-weight: bold;
            text-align: left;
            width: 100%;
          }
          
          .qr-code svg {
            width: 180px;
            height: 180px;
          }
    </style>
    </head>
    <body></body>
  </html>
`;

		qrCodeItems.forEach(({ url, title }) => {
			const wrapper = document.createElement("div");
			wrapper.className = "qr-item";

			const qrWrapper = document.createElement("div");
			qrWrapper.className = "qr-code";
			const vnode = h(QrcodeVue, {
				value: url,
				size: 200,
				level: "H",
				renderAs: "svg",
			});
			render(vnode, qrWrapper);
			wrapper.appendChild(qrWrapper);

			wrapper.innerHTML += `
    ${title ? `<div class="qr-title">${title}</div>` : ""}
  `;

			printWindow.document.body.appendChild(wrapper);
		});

		printWindow.print();
		printWindow.close();
	} else {
		logger.warn("Could not open print window for QR codes.");
	}
};
