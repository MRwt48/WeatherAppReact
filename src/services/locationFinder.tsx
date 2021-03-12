const locationFinder = new Promise<any>((resolve, reject) => {
  const pos = { lat: null, lon: null };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const getPosition = new Promise<any>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  if ("geolocation" in navigator) {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      getPosition
        .then((position) => {
          pos.lat = position.coords.latitude;
          pos.lon = position.coords.longitude;
          resolve(pos);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } else {
    console.log("Not available");
    reject(new Error("Location not available"));
  }
});

export default locationFinder;
