export const mustBePdf = (value) => !value || value.type === "application/pdf";

export const maxSize = (bytes) => (value) => !value || value.size <= bytes;
