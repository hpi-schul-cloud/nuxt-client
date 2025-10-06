export const upperCaseFirstChar = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const toKebabCase = (text: string) => text.replace(/(\w)(?=[A-Z])/g, (match) => match[0] + "-").toLowerCase();
