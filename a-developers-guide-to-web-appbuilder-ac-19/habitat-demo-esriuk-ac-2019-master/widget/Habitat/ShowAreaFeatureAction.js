///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseFeatureAction',
  'jimu/WidgetManager',
  "esri/geometry/geometryEngine"
], function(declare, BaseFeatureAction, WidgetManager,geometryEngine){
  var clazz = declare(BaseFeatureAction, {

    iconFormat: 'png',

    /** Check to ensure only polygons */
    isFeatureSupported: function(featureSet){
      return featureSet.features.length > 0 && featureSet.features[0].geometry.type !== 'point' && featureSet.features[0].geometry.type !== 'polyline';
    },

    onExecute: function(featureSet){

      // Get hold of the habitat widget
      WidgetManager.getInstance().triggerWidgetOpen(this.widgetId)
      .then((myWidget) => {

        // Find the area of the selected Polygon
        const area = geometryEngine.geodesicArea(featureSet.features[0].geometry, "acres");

        // push to function in widget - this causes it to open
        myWidget.showArea(area.toFixed(2));
      });
    }

  });
  return clazz;
});