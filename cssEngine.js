class ChaiEngine {
  constructor() {
    this.prefix = "chai-";
    this.cache = new Map();

    this.rules = {
      bg: (value) => ({ backgroundColor: value }),
      text: (value) => {
        const aligns = ["left", "center", "right", "justify"];
        if (aligns.includes(value)) return { textAlign: value };
        return { color: value };
      },
      p: (value) => ({ padding: `${value}px` }),
      m: (value) => ({ margin: `${value}px` }),
      border: (value) => {
        const styles = ["solid", "dashed", "dotted"];
        if (styles.includes(value))
          return { borderStyle: value, borderWidth: "2px" };
        return { borderColor: value };
      },
    };
  }
  init() {
    const startTime = performance.now();

    const elements = document.querySelectorAll(`[class*="${this.prefix}"]`);

    let parsedCount = 0;

    elements.forEach((el) => {
      const classes = Array.from(el.classList).filter((c) =>
        c.startsWith(this.prefix),
      );

      classes.forEach((className) => {
        const styleObj = this.parseClass(className); //chai-bg-red return backgroundColor:red
        if (styleObj) {
          Object.assign(el.style, styleObj);

          el.classList.remove(className);
        }
      });
      parsedCount++;
    });
    const endTime = performance.now();
    console.log(
      `chaiwind intialized in ${(endTime - startTime).toFixed(2)}ms.
      Processed ${parsedCount} elements.
      
      `,
    );
  }

  parseClass(className) {
    if (this.cache.has(className)) {
      return this.cache.get(className);
    }

    const utilityString = className.substring(this.prefix.length); //bg-red

    const firstHyphenIndex = utilityString.indexOf("-");
    if (firstHyphenIndex === -1) return null;

    const utility = utilityString.substring(0, firstHyphenIndex); //bg
    const value = utilityString.substring(firstHyphenIndex + 1); //red

    if (this.rules[utility]) {
      const styleObj = this.rules[utility](value); //({ backgroundColor: value }
      this.cache.set(className, styleObj);
      return styleObj;
    }
    console.warn(`chaiwind:Unknown utility class ${className}`);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const chai = new ChaiEngine();
  chai.init();
});
