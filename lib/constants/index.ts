//CONSTANTES DO APP
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Ecommerce App";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "App base para ecommerce utilizando Next.js";
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = parseInt(process.env.LATEST_PRODUCTS_LIMIT || "4", 10);

//SigInForm
export const siginDefaultValues = {
    email: '',
    password: ''
};
