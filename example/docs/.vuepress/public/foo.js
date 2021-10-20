const fs = require('fs');
const uglifycss = require('uglifycss');
const config = require('prismjs/components');
const getLoader = require('prismjs/dependencies');

const pluginList = {
  autolinker: true,
  "inline-color": true,
  "diff-highlight": true,
  "data-uri-highlight": true
};

const getPath = (type) => (name) => `prismjs/${config[type].meta.path.replace(/\{id\}/g, name)}`;

const isPlugin = (dep) => config.plugins[dep] != null;

const getNoCSS = (type, name) => !!config[type][name].noCSS;

const getThemePath = (theme) => {
  if (theme.includes('/')) {
    const [themePackage, themeName] = theme.split('/');
    return `${themePackage}/themes/prism-${themeName}.css`;
  }
  if (theme === 'default') {
    theme = 'prism';
  } else {
    theme = `prism-${theme}`;
  }
  return getPath('themes')(theme);
};

const getPluginPath = getPath('plugins');

function loadPlugins(app, css, plugins) {
  plugins.forEach((plugin) => {
    if (pluginList[plugin]) {
      require(`./${plugin}`);
    }
  });
  if (app.siteData !== undefined) {
    app.siteData.head = app.siteData.head || [];
  }
  if (css) {
    const pluginCss = getLoader(config, [...plugins]).getIds().reduce((deps, dep) => {
      const css = [];
      if (isPlugin(dep) && !getNoCSS('plugins', dep)) {
        css.unshift(`${getPluginPath(dep)}.css`);
      }
      return [...deps, ...css];
    }, ([]));
    pluginCss.forEach(async (cssPath) => {
      try {
        fs.accessSync(`node_modules/${cssPath}`);
        console.log(`node_modules/${cssPath}`);
        const uglified = uglifycss.processString(
          fs.readFileSync(`node_modules/${cssPath}`).toString(),
          { maxLineLen: 500, expandVars: true }
        );
        if (uglified) {
          if (app.siteData !== undefined) {
            app.siteData.head.push(['style', { type: 'text/css' }, uglified]);
          }
        }
      } catch (error) {
      }
    });
  }
}

function loadTheme(app, css, theme = null) {
  if (css && theme) {
    const themeCssPath = getThemePath(theme);
    try {
      fs.accessSync(`node_modules/${themeCssPath}`);
      console.log(`node_modules/${themeCssPath}`);
      const uglified = uglifycss.processString(
        fs.readFileSync(`node_modules/${themeCssPath}`).toString(),
        { maxLineLen: 500, expandVars: true }
      );
      if (uglified) {
        if (app.siteData !== undefined) {
          app.siteData.head = app.siteData.head || [];
          app.siteData.head.push(['style', { type: 'text/css' }, uglified]);
        } else {

        }
      }
    } catch (error) {

    }
  }
}

module.exports = {
  loadPlugins,
  loadTheme
}