# ArcGIS Web App Builder Habitat Demo

This repository contains two code samples from the "Developers Guide to Web AppBuilder" demo presented at the Esri UK Annual Conference 2019.

There are two main folders
- Widget - Containing the habitat widget used in the demo
- Theme - Containing the habitat theme used in the demo

Both items are in a working state and can be added to the stemapp or app wigdets folder.

To download the ArcGIS Web AppBuilder Developer edition visit - https://developers.arcgis.com/web-appbuilder/

## Additional Style Libraries (optional)

The esri calcite web html, css and js framework was used to improve visuals of the widget.

https://esri.github.io/calcite-web/

To add this to your app
- Open up init.js within your application. This is found under "somelocation\WebAppBuilderForArcGIS\server\apps" and will be a number.
- on line 53, an array called ```var resources = []``` exists. replace it with the following:
    - ``` var resources = ["https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/css/calcite-web.min.css", "https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/js/calcite-web.min.js"]; ```

More information on this process can be found here - https://developers.arcgis.com/web-appbuilder/sample-code/add-a-third-party-library.htm


## Task Runner (optional)
 Gulp was used as a task runner during the demo. This simply copied the themes and widgets into place. 
 A gulpfile.js contains the code that completes this task. To use please ensure you have 

 1) installed gulp - https://gulpjs.com/
 2) Updated the app location to point to your target app (See gulpfile.js)
 3) Updated the builder location to point to your WAB (See gulpfile.js)

 Once done you can run "gulp" in the root of the project using cmd or powershell.
 This will copy the widgets and themes. 

 A number of other task runners can be used if prefered.
