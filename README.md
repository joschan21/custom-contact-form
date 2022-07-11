This is a React Contact Form Template, visually appealing and very easy for the viewer to fill out.

## Setup

First, install the neccessary dependencies:

```bash
swiper
react-icons
framer-motion
@tailwindcss/forms
```

Second, require the following TailwindCSS plugin inside `tailwind.config.js`:

```bash
plugins: [require('@tailwindcss/forms')]
```

Third, copy the basic element styles inside `globals.css`:

```bash
@layer base {
  .answerCardStyle {
    @apply min-w-[180px] cursor-pointer flex flex-row sm:flex-col items-center gap-4 sm:gap-0 rounded-lg bg-white border-2 transition p-8 text-center hover:shadow-md hover:border-indigo-600 shadow-sm border-gray-100;
  }
  .selectedAnswerStyle {
    @apply shadow-md border-indigo-600;
  }
}
```
