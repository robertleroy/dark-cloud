module.exports = {
  pluginOptions: {
      ghPages: {
          message: 'Updates',
      },
  },
  pwa: {
    name: 'Dark Cloud',
    short_name:"Dark Cloud",
    title:"Dark Cloud",
    themeColor: '#000000',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    
  }
};