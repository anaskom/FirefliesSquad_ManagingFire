var table = ee.FeatureCollection("users/IAsekoGG/fire_archive_M-C61_388701");
var dataset_landcover = ee.ImageCollection('ESA/WorldCover/v200').first();
var dataset = ee.Image('USGS/SRTMGL1_003');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation);
var k = dataset_landcover.addBands(slope).addBands(elevation)
print(k)
var visualization = {
  bands: ['Map'],
};
 
//Map.centerObject(dataset);

//Map.addLayer(dataset, visualization, 'Landcover');

var result = ee.Image(k).reduceRegions({
    collection: table,
    reducer: ee.Reducer.mode(),
    scale: 1000
  })
  
Map.addLayer(result);

var result_forest = result//.filter(ee.Filter.eq('mode', 10));

Map.addLayer(result_forest);

Export.table.toDrive({
  collection: result_forest,
  description: 'landcover_result',
  folder: 'Nasa hac',  // Set your desired folder name
  fileFormat: 'shp'
});