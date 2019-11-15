
define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/tasks/query", "dojo/on", "dojo/Deferred", "jimu/LayerStructure"],
  function (declare, BaseWidget, Query, on, Deferred, LayerStructure) {

    //To create a widget, you need to derive from BaseWidget.  
    return declare([BaseWidget], {

      baseClass: 'jimu-widget-habitat',

      postCreate: function () {
        this.inherited(arguments);
        console.log('postCreate');
      },

      startup: function () {
        this.inherited(arguments);
        console.log('startup');
      },

      onOpen: function () {
        console.log('onOpen');

        this.getHabitatLayer(this.config.lyrItemId).then((habitatLayer) => {

          // FILTER THE LAYER
          this.filterHabitatLayer(habitatLayer)


          // GET POLYGON COUNT
          this.getHabitatFeatureCount(habitatLayer, this.habitatNode.value, this.map.extent)
        
          on(this.map, "extent-change", (evt) => {
            this.getHabitatFeatureCount(habitatLayer, this.habitatNode.value, this.map.extent)
          });
                    
          on(this.habitatNode, "change", (evt) => {
            // uses the same functons as above
            this.filterHabitatLayer(habitatLayer)
            this.getHabitatFeatureCount(habitatLayer, this.habitatNode.value, this.map.extent)
          })
          
        }).catch((err) => {
          console.error(err)
        })
        
      },

      /** loop over layers in map and get layer using item id */
      getHabitatLayer: function (itemId) {
        
        const deferred = new Deferred()
        const layerStructure = LayerStructure.getInstance();
        
        // TRAVERSE THE LAYERS IN WEBMAP
        layerStructure.traversal((layerNode) => {
          const item = layerNode.isItemLayer();
        
          // FIND LAYER BY ID 
          if (item && item.itemId == itemId) {
            layerNode.getLayerObject().then((habitatLayer) => {
              deferred.resolve(habitatLayer)  // PASS BACK LAYER
            }).catch((err) => {
              deferred.reject('Failed to get Layer')
            })
          }
        });
        
        return deferred
      },

      /** filter layer by habitat */
      filterHabitatLayer: function (habitatLayer) {
        
        // USE ARCGIS JS API METHODS IN LAYER OBJECT.
        habitatLayer.setDefinitionExpression("Main_habit = '" + this.habitatNode.value + "'");
      },
          
      /** Get the number of habitat features in my extent */
      getHabitatFeatureCount: function (habitatLayer, habitatType, extent) {
        
        // BUILD QUERY
        const query = new Query();
        query.where = "Main_habit = '" + habitatType +"'";
        query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS; // INTERSECT WITH MAP EXTENT
        query.geometry = extent
          
        // RUN QUERY
        habitatLayer.queryCount(query).then((count) => {
            this.countNode.innerHTML = count // UPDATE HTML
          }).catch((err) => {
            console.error('Failed to Query');
          });
      },
                           
      /** Feature Action Function */
      showArea: function (area) {
        this.areaNode.innerHTML = "The selected area is: <b>" + area + "</b> acres";
      }
      
    });
  });