# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Optional CDN for Photos (Cloudinary)

The project supports Cloudinary for faster image delivery with a local fallback.

1. Copy `.env.example` to `.env`.
2. Fill `VITE_CLOUDINARY_CLOUD_NAME` with your Cloudinary cloud name.
3. Keep `VITE_CLOUDINARY_FOLDER` aligned with your upload folder (default: `elite-vtc`).

If `VITE_CLOUDINARY_CLOUD_NAME` is empty, the app automatically uses local images from `public/photos`.
