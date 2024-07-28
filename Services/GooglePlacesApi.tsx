// export const GetPhotoRef = async (placename:string) => {
// 	const resp = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json' +
// 		'? query ='+placename+
// 		'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_API)

// 		const result = await resp.json()
// 		console.log(result);
		
// }

export const GetPhotoRef = async (placeName: string): Promise<string | null> => {
	try {
	  const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API}`);
	  const result = await response.json();
  
	  if (result.results.length > 0) {
		const placeId = result.results[0].place_id;
		const photoResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API}`);
		const photoResult = await photoResponse.json();
  
		if (photoResult.result && photoResult.result.photos && photoResult.result.photos.length > 0) {
		  const photoReference = photoResult.result.photos[0].photo_reference;
		  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API}`;
		}
	  }
  
	  return null;
	} catch (error) {
	  console.error("Error fetching place photo:", error);
	  return null;
	}
  };
  