
const { task, dest, src, series } = require('gulp');

const appLocation = '<Location of target app in WAB> e.g C:\\arcgis-web-appbuilder-2.12\\WebAppBuilderForArcGIS\\server\\apps\\6'
const builderLocation = '<Location of Builder> e.g C:\\arcgis-web-appbuilder-2.12\\WebAppBuilderForArcGIS'
const widgetName = "Habitat"
const themeName = "HabitatTheme"

const stemapp_widget = builderLocation + '\\client\\stemapp\\widgets\\' + widgetName
const stemapp_theme = builderLocation + '\\client\\stemapp\\themes\\' + themeName
const app_widegt = appLocation + '\\widgets\\' + widgetName
const app_theme = appLocation + '\\themes\\' + themeName

task("widget", function () {
    return src(['./widget/' + widgetName + '/**/*'])
    .pipe(dest(stemapp_widget))
    .pipe(dest(app_widegt));
});


task("theme", function () {
    return src(['./theme/' + themeName + '/**/*'])
    .pipe(dest(stemapp_theme))
    .pipe(dest(app_theme));
});


exports.default = series("widget", "theme");