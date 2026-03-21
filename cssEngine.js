class ChaiEngine {
  constructor() {
    this.prefix = "chai-";
    this.cache = new Map();

    // Helper to allow both numbers (converted to px) and strings (like 100%, 1rem)
    const pxOrStr = (val) => (!val || isNaN(val) ? val : `${val}px`);

    this.rules = {
      // 🎨 Background
      bg: (value) => ({ backgroundColor: value }),

      // 📝 Text & Typography
      text: (value) => {
        const aligns = ["left", "center", "right", "justify"];
        if (aligns.includes(value)) return { textAlign: value };

        const sizes = {
          xs: "12px",
          sm: "14px",
          base: "16px",
          lg: "18px",
          xl: "20px",
          "2xl": "24px",
          "3xl": "30px",
          "4xl": "36px",
          "5xl": "48px",
          "6xl": "64px",
          "7xl": "80px",
        };
        if (sizes[value]) return { fontSize: sizes[value] };

        return { color: value };
      },
      font: (value) => ({ fontFamily: value }),
      bold: () => ({ fontWeight: "bold" }),
      semibold: () => ({ fontWeight: "600" }),
      light: () => ({ fontWeight: "300" }),
      italic: () => ({ fontStyle: "italic" }),
      tracking: (value) => ({ letterSpacing: pxOrStr(value) }),
      leading: (value) => ({ lineHeight: value }),

      // 📦 Spacing (Padding & Margin)
      top: (value) => ({ top: pxOrStr(value) }),
      bottom: (value) => ({ bottom: pxOrStr(value) }),
      left: (value) => ({ left: pxOrStr(value) }),
      right: (value) => ({ right: pxOrStr(value) }),
      inset: (value) => ({ inset: pxOrStr(value) }),

      p: (value) => ({ padding: pxOrStr(value) }),
      px: (value) => ({
        paddingLeft: pxOrStr(value),
        paddingRight: pxOrStr(value),
      }),
      py: (value) => ({
        paddingTop: pxOrStr(value),
        paddingBottom: pxOrStr(value),
      }),
      pt: (value) => ({ paddingTop: pxOrStr(value) }),
      pr: (value) => ({ paddingRight: pxOrStr(value) }),
      pb: (value) => ({ paddingBottom: pxOrStr(value) }),
      pl: (value) => ({ paddingLeft: pxOrStr(value) }),

      m: (value) => ({ margin: pxOrStr(value) }),
      mx: (value) => {
        if (value === "auto")
          return { marginLeft: "auto", marginRight: "auto" };
        return { marginLeft: pxOrStr(value), marginRight: pxOrStr(value) };
      },
      my: (value) => ({
        marginTop: pxOrStr(value),
        marginBottom: pxOrStr(value),
      }),
      mt: (value) => ({ marginTop: pxOrStr(value) }),
      mr: (value) => ({ marginRight: pxOrStr(value) }),
      mb: (value) => ({ marginBottom: pxOrStr(value) }),
      ml: (value) => ({ marginLeft: pxOrStr(value) }),

      w: (value) => {
        if (value === "full") return { width: "100%" };
        if (value === "screen") return { width: "100vw" };
        return { width: pxOrStr(value) };
      },
      h: (value) => {
        if (value === "full") return { height: "100%" };
        if (value === "screen") return { height: "100vh" };
        return { height: pxOrStr(value) };
      },
      "max-w": (value) => ({ maxWidth: pxOrStr(value) }),
      "min-h": (value) => {
        if (value === "full") return { minHeight: "100%" };
        if (value === "screen") return { minHeight: "100vh" };
        return { minHeight: pxOrStr(value) };
      },

      // 🧱 Display & Position
      flex: () => ({ display: "flex" }),
      grid: () => ({ display: "grid" }),
      block: () => ({ display: "block" }),
      "inline-block": () => ({ display: "inline-block" }),
      hidden: () => ({ display: "none" }),
      absolute: () => ({ position: "absolute" }),
      relative: () => ({ position: "relative" }),
      fixed: () => ({ position: "fixed" }),
      sticky: () => ({ position: "sticky" }),

      // 🔄 Flex & Grid utilities
      "flex-col": () => ({ flexDirection: "column" }),
      "flex-row": () => ({ flexDirection: "row" }),
      "flex-wrap": () => ({ flexWrap: "wrap" }),
      items: (value) => ({ alignItems: value }),
      justify: (value) => ({ justifyContent: value }),
      gap: (value) => ({ gap: pxOrStr(value) }),
      "grid-cols": (value) => ({
        gridTemplateColumns: `repeat(${value}, minmax(0, 1fr))`,
      }),

      // 🔲 Borders
      border: (value) => {
        if (!value) return { borderWidth: "1px", borderStyle: "solid" };
        const styles = ["solid", "dashed", "dotted"];
        if (styles.includes(value))
          return { borderStyle: value, borderWidth: "1px" };
        return { borderColor: value, borderWidth: "1px", borderStyle: "solid" };
      },
      "border-t": (value) => ({
        borderTopWidth: "1px",
        borderTopColor: value || "currentColor",
        borderTopStyle: "solid",
      }),
      "border-b": (value) => ({
        borderBottomWidth: "1px",
        borderBottomColor: value || "currentColor",
        borderBottomStyle: "solid",
      }),
      rounded: (value) => {
        if (!value) return { borderRadius: "4px" };
        if (value === "full") return { borderRadius: "9999px" };
        return { borderRadius: pxOrStr(value) };
      },

      // 🌫️ Effects & Misc
      "backdrop-blur": (value) => {
        const sizes = { sm: "4px", md: "12px", lg: "24px", xl: "40px" };
        return { backdropFilter: `blur(${sizes[value] || value || "8px"})`, WebkitBackdropFilter: `blur(${sizes[value] || value || "8px"})` };
      },
      "filter-blur": (value) => ({ filter: `blur(${pxOrStr(value) || "8px"})` }),
      glass: () => ({
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)"
      }),
      "glass-card": () => ({
        background: "rgba(30, 41, 59, 0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
      }),
      "text-gradient": () => ({
        background: "linear-gradient(to right, #60a5fa, #a855f7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent"
      }),

      shadow: (value) => {
        if (value === "lg")
          return {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          };
        return {
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        };
      },
      opacity: (value) => ({ opacity: value / 100 }),
      z: (value) => ({ zIndex: value }),
      pointer: () => ({ cursor: "pointer" }),
      overflow: (value) => ({ overflow: value }),
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
        const styleObj = this.parseClass(className);
        if (styleObj) {
          Object.assign(el.style, styleObj);
          el.classList.remove(className);
        }
      });
      parsedCount++;
    });

    const endTime = performance.now();
    console.log(
      `Chaiwind initialized in ${(endTime - startTime).toFixed(2)}ms. Processed ${parsedCount} elements.`,
    );
  }

  parseClass(className) {
    if (this.cache.has(className)) {
      return this.cache.get(className);
    }

    const utilityString = className.substring(this.prefix.length);
    const firstHyphenIndex = utilityString.indexOf("-");

    let utility, value;

    // FIX: Handle valueless utilities like "chai-flex" or "chai-hidden"
    if (firstHyphenIndex === -1) {
      utility = utilityString;
      value = null;
    } else {
      utility = utilityString.substring(0, firstHyphenIndex);
      // Handle multi-word utilities like flex-col or grid-cols
      if (this.rules[utilityString]) {
        utility = utilityString;
        value = null;
      } else if (
        this.rules[
          `${utility}-${utilityString.substring(firstHyphenIndex + 1).split("-")[0]}`
        ]
      ) {
        // rudimentary check for compound keys like max-w, min-h
        const parts = utilityString.split("-");
        utility = `${parts[0]}-${parts[1]}`;
        value = parts.slice(2).join("-");
      } else {
        value = utilityString.substring(firstHyphenIndex + 1);
      }
    }

    if (this.rules[utility]) {
      const styleObj = this.rules[utility](value);
      this.cache.set(className, styleObj);
      return styleObj;
    }

    console.warn(`chaiwind: Unknown utility class ${className}`);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const chai = new ChaiEngine();
  chai.init();
});
