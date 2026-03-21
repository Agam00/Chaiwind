# 🍃 Chaiwind
**Repository:** [https://github.com/Agam00/Chaiwind.git](https://github.com/Agam00/Chaiwind.git)

**Chaiwind** is a blazing-fast, zero-build, dependency-free **Runtime CSS-in-JS Utility Engine**. 

Designed to bring the convenience of utility-first CSS frameworks straight to the browser, Chaiwind parses classes on the fly and intelligently injects inline styles dynamically without the need for Webpack, Node.js, or any complex build processes.

---

## 🛠️ How It Works

Chaiwind runs natively in the browser on `DOMContentLoaded`. 
1. It scans the document for any element containing classes prefixed with `chai-`.
2. It parses the utility segments logically (e.g., `chai-bg-#ff0000` splits into the utility `bg` and value `#ff0000`).
3. It maps the utility dynamically to its valid CSS-in-JS equivalent through the internal `this.rules` dictionary.
4. It safely assigns the resolved styles directly to the elements via `Object.assign(el.style, styleObj)` and removes the raw class string from the element to keep the DOM completely clean.

---

## 📖 Exhaustive Utility Class Documentation

Below is the complete list of all supported utility classes and exactly what CSS rules they generate. 

> **Important**: All utilities must be prefixed with `chai-`. Numbers are automatically converted to `px` unless otherwise specified (or if you pass a string like `100%`).

### 1. Typography & Text

| Class | CSS Generated | Example |
| :--- | :--- | :--- |
| `chai-text-[color]` | `color: [color]` | `chai-text-#ff0000`, `chai-text-white` |
| `chai-text-[size]` | `font-size: [px]` | `chai-text-sm` (14px), `chai-text-2xl` (24px) |
| `chai-text-[align]` | `text-align: [align]` | `chai-text-center`, `chai-text-right` |
| `chai-font-[family]` | `font-family: [family]` | `chai-font-sans` |
| `chai-bold` | `font-weight: bold` | `chai-bold` |
| `chai-semibold` | `font-weight: 600` | `chai-semibold` |
| `chai-light` | `font-weight: 300` | `chai-light` |
| `chai-italic` | `font-style: italic` | `chai-italic` |
| `chai-tracking-[val]` | `letter-spacing: [val]px` | `chai-tracking-2` |
| `chai-leading-[val]` | `line-height: [val]` | `chai-leading-1.5` |

*(Available text sizes: `xs` (12px), `sm` (14px), `base` (16px), `lg` (18px), `xl` (20px), `2xl` (24px), `3xl` (30px), `4xl` (36px), `5xl` (48px), `6xl` (64px), `7xl` (80px))*
*(Available text aligns: `left`, `center`, `right`, `justify`)*

### 2. Colors & Backgrounds

| Class | CSS Generated | Example |
| :--- | :--- | :--- |
| `chai-bg-[color]` | `background-color: [color]` | `chai-bg-#0f172a`, `chai-bg-transparent` |
| `chai-opacity-[val]`| `opacity: [val/100]` | `chai-opacity-50` (translates to `0.5`) |

### 3. Spacing (Margin & Padding)

| Class | Target Property | Supported Sides / Description | Example |
| :--- | :--- | :--- | :--- |
| `chai-p-[val]` | Padding | All sides | `chai-p-20` |
| `chai-px-[val]` | Padding | Left and Right | `chai-px-40` |
| `chai-py-[val]` | Padding | Top and Bottom | `chai-py-10` |
| `chai-pt-[val]` | Padding | Top | `chai-pt-5` |
| `chai-pr-[val]` | Padding | Right | `chai-pr-5` |
| `chai-pb-[val]`| Padding | Bottom | `chai-pb-5` |
| `chai-pl-[val]` | Padding | Left | `chai-pl-5` |
| `chai-m-[val]` | Margin | All sides | `chai-m-10` |
| `chai-mx-[val]` | Margin | Left and Right | `chai-mx-auto` (Centers block) |
| `chai-my-[val]` | Margin | Top and Bottom | `chai-my-20` |
| `chai-mt-[val]` | Margin | Top | `chai-mt-auto` |
| `chai-mr-[val]` | Margin | Right | `chai-mr-10` |
| `chai-mb-[val]`| Margin | Bottom | `chai-mb-10` |
| `chai-ml-[val]` | Margin | Left | `chai-ml-10` |

### 4. Sizing

| Class | Description | Example / Note |
| :--- | :--- | :--- |
| `chai-w-[val]` | Sets `width` | `chai-w-full` (100%), `chai-w-screen` (100vw), `chai-w-200` (200px) |
| `chai-h-[val]` | Sets `height` | `chai-h-full` (100%), `chai-h-screen` (100vh), `chai-h-100` (100px) |
| `chai-max-w-[val]` | Sets `max-width` | `chai-max-w-screen` (100vw), `chai-max-w-800` (800px) |
| `chai-min-h-[val]` | Sets `min-height` | `chai-min-h-screen` (100vh), `chai-min-h-full` (100%) |

### 5. Layout & Display

| Class | CSS Generated |
| :--- | :--- |
| `chai-flex` | `display: flex` |
| `chai-grid` | `display: grid` |
| `chai-block` | `display: block` |
| `chai-inline-block` | `display: inline-block` |
| `chai-hidden` | `display: none` |
| `chai-absolute` | `position: absolute` |
| `chai-relative` | `position: relative` |
| `chai-fixed` | `position: fixed` |
| `chai-sticky` | `position: sticky` |
| `chai-top-[val]` | `top: [val]px` |
| `chai-bottom-[val]`| `bottom: [val]px` |
| `chai-right-[val]` | `right: [val]px` |
| `chai-left-[val]` | `left: [val]px` |
| `chai-inset-[val]` | `inset: [val]px` |
| `chai-z-[val]` | `z-index: [val]` |
| `chai-overflow-[val]`| `overflow: [val]` (`auto`, `hidden`, etc.) |

### 6. Flexbox & Grid Controls

| Class | CSS Generated | Example |
| :--- | :--- | :--- |
| `chai-flex-col` | `flex-direction: column` | `chai-flex-col` |
| `chai-flex-row` | `flex-direction: row` | `chai-flex-row` |
| `chai-flex-wrap`| `flex-wrap: wrap` | `chai-flex-wrap` |
| `chai-items-[val]`| `align-items: [val]` | `chai-items-center` |
| `chai-justify-[val]`| `justify-content: [val]`| `chai-justify-space-between` |
| `chai-gap-[val]` | `gap: [val]px` | `chai-gap-20` |
| `chai-grid-cols-[val]`| `grid-template-columns: repeat([val], minmax(0, 1fr))` | `chai-grid-cols-3` |

### 7. Borders & Radius

| Class | CSS Generated | Example |
| :--- | :--- | :--- |
| `chai-border` | `border: 1px solid currentColor` | `chai-border` |
| `chai-border-[val]`| If style (`solid`/`dashed`): sets `border-style: [val]`, else `border-color: [val]` | `chai-border-dashed`, `chai-border-#333` |
| `chai-border-t-[color]`| `border-top: 1px solid [color]` | `chai-border-t-#fff` |
| `chai-border-b-[color]`| `border-bottom: 1px solid [color]` | `chai-border-b-rgba(0,0,0,0.1)` |
| `chai-rounded-[val]`| `border-radius: [val]px` (Default is 4px. `full` is 9999px) | `chai-rounded-12`, `chai-rounded-full` |

### 8. Premium Effects & Misc

| Class | CSS Generated | Note |
| :--- | :--- | :--- |
| `chai-shadow` | Standard subtle box shadow | `box-shadow: 0 4px ...` |
| `chai-shadow-lg` | Large prominent box shadow | `box-shadow: 0 10px ...` |
| `chai-pointer` | `cursor: pointer` | Hover pointer on elements |
| `chai-backdrop-blur-[val]` | `backdrop-filter: blur([val])` | Sizes: `sm` (4px), `md` (12px), `lg` (24px), `xl` (40px) |
| `chai-filter-blur-[val]` | `filter: blur([val]px)` | `chai-filter-blur-10` |
| `chai-glass` | Complete glassmorphism styling | Adds rgba background, blur, and subtle border |
| `chai-glass-card` | Intensified glass card UI | Deep blur, low opacity background, 32px shadow |
| `chai-text-gradient`| Vibrant text gradient | Applies linear-gradient to text clip |

---

## 🎨 Extending the Engine

The true architectural power of Chaiwind is how modular and painless it is to inject custom CSS logic directly in JavaScript.

Open `cssEngine.js` and add a new utility resolver key in `this.rules`:

```js
this.rules = {
  // ... existing rules
  
  // Custom Transform Utility
  rotate: (value) => ({ transform: `rotate(${value}deg)` }),
  
  // Custom Predefined Token
  "theme-button": () => ({
    backgroundColor: "#10b981",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "12px 24px",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  })
}
```

Now use it immediately anywhere in the DOM: `<button class="chai-rotate-45 chai-theme-button">Click Me</button>`!

---
*🍃 Built with focus on vanilla simplicity and dynamic execution speed.*
