// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "nuxt-icon",
  ],
  typescript: {
    strict: true,
  },
  supabase: {
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    redirect: false,
    clientOptions: {
      auth: {
        persistSession: true
      }
    },
  },
})
