const getCssPropertyValue = (property: string) => window.getComputedStyle(window.document.documentElement).getPropertyValue(property);

export default getCssPropertyValue;
