import { useI18nGlobal } from "@/plugins/i18n";
import { logger } from "@util-logger";
import QrcodeVue from "qrcode.vue";
import { h, render } from "vue";

export const printQrCodes = (qrCodeItems: { title?: string; url: string }[], pageTitle?: string) => {
	const printWindow = window.open("", "_blank");
	const { t } = useI18nGlobal();

	if (printWindow) {
		printWindow.document.documentElement.innerHTML = `
  <html>
    <head>
      <title>${t("pages.administration.printQr.printTabTitle")}</title>
      <style>   
          @media print {
              @page {
                size: A4;
                margin: 24px;               
                
                @top-left {
                  content: "${pageTitle ?? ""}";
                  margin-top: 24px;
                  font-size: 20px;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Arial, sans-serif;
                }
              }
          }
        
          body {
            padding: 10px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Arial, sans-serif;
          }
          
          .qrcode-list {
              display: grid;
              grid-template-columns: repeat(auto-fit, 220px);
              grid-auto-rows: min-content;
              gap: 20px;
              padding: 0;
          }
          
          .qr-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            margin-top: 20px;
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
		const qrCodeList = document.createElement("ul");
		qrCodeList.classList.add("qrcode-list");
		printWindow.document.body.appendChild(qrCodeList);

		qrCodeItems.forEach(({ url, title }) => {
			const qrCodeListItem = document.createElement("li");
			qrCodeListItem.className = "qr-item";

			const qrCodeWrapper = document.createElement("div");
			qrCodeWrapper.className = "qr-code";
			const vnode = h(QrcodeVue, {
				value: url,
				size: 200,
				level: "H",
				renderAs: "svg",
			});
			render(vnode, qrCodeWrapper);
			qrCodeListItem.appendChild(qrCodeWrapper);

			qrCodeListItem.innerHTML += `
    ${title ? `<div class="qr-title">${title}</div>` : ""}
  `;

			qrCodeList.appendChild(qrCodeListItem);
		});
		printWindow.document.body.appendChild(qrCodeList);
		printWindow.print();
		printWindow.close();
	} else {
		logger.warn("Could not open print window for QR codes.");
	}
};
