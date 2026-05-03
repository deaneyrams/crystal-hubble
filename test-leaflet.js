import('leaflet').then(m => {
  console.log("Leaflet import resolved.");
  console.log("Keys:", Object.keys(m));
  console.log("Default:", m.default);
}).catch(e => console.error(e));
