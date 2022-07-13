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
  .desktop-card {
    @apply min-w-[180px] cursor-pointer sm:flex sm:flex-col sm:items-center sm:gap-0 rounded-lg bg-white border-2 transition p-8 text-center hover:shadow-md hover:border-accent-600 shadow-sm border-gray-100;
  }
  .desktop-card-selected {
    @apply shadow-md border-accent-600;
  }
  .mobile-card {
    @apply flex gap-4 items-center my-2 p-4 cursor-pointer rounded-lg bg-white border shadow-sm border-gray-200;
  }
  .mobile-card-selected {
    @apply shadow-md border-accent-600;
  }
  .contact-form-background {
    @apply bg-gray-100;
  }
}
```
