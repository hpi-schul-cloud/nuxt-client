/**
 * Formats a number of bytes into a human-readable string with appropriate unit.
 *
 * @param bytes - The number of bytes to format
 * @param decimals - The number of decimal places to display (default: 2)
 * @returns A formatted string with the appropriate unit (e.g., "1.5 GB", "256 KB")
 *
 * @example
 * formatBytes(1024)           // "1 KB"
 * formatBytes(1073741824)     // "1 GB"
 * formatBytes(1536, 1)        // "1.5 KB"
 * formatBytes(0)              // "0 Bytes"
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
	if (bytes === 0) return "0 Bytes";
	if (bytes < 0) return "0 Bytes";
	if (!Number.isFinite(bytes)) return "0 Bytes";

	const k = 1024;
	const dm = Math.max(0, decimals);
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));
	const unitIndex = Math.min(i, sizes.length - 1);

	const value = bytes / Math.pow(k, unitIndex);
	const formattedValue = value.toFixed(dm);

	// Remove trailing zeros after decimal point for cleaner output
	const cleanValue = parseFloat(formattedValue).toString();

	return `${cleanValue} ${sizes[unitIndex]}`;
};
