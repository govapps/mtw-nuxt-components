# MTW Nuxt Components

<a target="_blank" href="https://nuxt.com/">![Nuxt](https://img.shields.io/badge/Nuxt-v3.6.5-3fb27f)</a>
<a target="_blank" href="https://tailwindcss.com/">
![Tailwind](https://img.shields.io/badge/Tailwind-v3.3.3-38bdf8)
</a>
<a target="_blank" href="https://eslint.org/">![Eslint](https://img.shields.io/badge/Eslint-8.47.0-4930bd)</a>

<img src="assets/images/mtw-components-cover.png"/>

Welcome to the Nuxt.js Component Repository! This repository contains a collection of reusable components that can be integrated into Nuxt.js projects to accelerate development and maintain design consistency throughout the application.

See the components documentation on the [Wiki](https://github.com/govapps/mtw-nuxt-components/wiki)

## How to Use

### 1. Add in nuxt project with tailwind

``` bash
pnpm add govapps/mtw-nuxt-components
```

### 2. Add config in file `nuxt.config.ts`
``` ts
components: [
  "~/node_modules/mtw-nuxt-components/components"
]
```
### 3. Add config in file `tailwind.config.ts`
``` ts
module.exports = {
  content: [
    "./node_modules/mtw-nuxt-components/components/**/*.{js,vue,ts}",
  ],
``` 

### 3. Use the components:
To use a component in your Nuxt.js project, import it in any component where you want to use it. For example:
```html
<template>
  <div class="text-center">
    <Text is-bold>
      Hi there!
    </text>
    <Switch class="mt-2" :value="true" />
  </div>
</template>
```

## Development

### 1. Make sure to install the dependencies:

``` bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install

```

### 2. Start the development server on http://localhost:3000

```bash
npm run dev
```

## Contribution

If you would like to contribute to this project, feel free to submit pull requests. Be sure to follow inclusion guidelines and follow existing code standards.

## License

This repository is licensed under the MIT License, which means you are free to use, modify, and distribute the components according to the terms of the license.

We hope these components prove valuable for your Nuxt.js project! If you have any questions or suggestions, feel free to open an issue in this repository. Thank you for contributing and using our components!