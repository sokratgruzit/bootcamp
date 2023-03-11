
module.exports = {
 
  runtimeCompiler: true,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  }
}