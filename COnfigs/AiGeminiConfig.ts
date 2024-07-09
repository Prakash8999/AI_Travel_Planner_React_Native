const {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain",
  };
  

export	const chatSession = model.startChat({
	  generationConfig,
	  history: [
		{
		  role: "user",
		  parts: [
			{text: "Generate travel plan for location : New York, USA for one day and one night for family with luxury budget with flight details, flight price with booking urls, hotels option list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, description, and place to visit nearby with place name, place detail, place image url, geo coordinates, ticket pricing, time t travel day each of the location for one day and one night with each day plan with the best time to visit in JSON format."},
		  ],
		},
		{
		  role: "model",
		  parts: [
			{text: "```json\n{\n  \"travel_plan\": {\n    \"location\": \"New York, USA\",\n    \"duration\": \"1 day and 1 night\",\n    \"budget\": \"luxury\",\n    \"flight\": {\n      \"details\": \"Roundtrip flight from [Your Departure City] to New York (JFK or LGA)\",\n      \"price\": \"Varies based on your departure city and time of year. Use flight search engines like Kayak, Google Flights, or Skyscanner for prices.\",\n      \"booking_urls\": [\n        \"https://www.kayak.com/\",\n        \"https://www.google.com/flights\",\n        \"https://www.skyscanner.com/\"\n      ]\n    },\n    \"hotel\": {\n      \"options\": [\n        {\n          \"name\": \"The Peninsula New York\",\n          \"address\": \"700 Fifth Avenue, New York, NY 10019\",\n          \"price\": \"From $1,500 per night\",\n          \"image_url\": \"https://www.peninsula.com/en/new-york/images/gallery/hero-image-01.jpg\",\n          \"geo_coordinates\": \"40.7580° N, 73.9785° W\",\n          \"rating\": \"4.5 stars\",\n          \"description\": \"Elegant hotel with stunning city views, Michelin-starred dining, and a rooftop pool.\"\n        },\n        {\n          \"name\": \"The Ritz-Carlton New York, Central Park\",\n          \"address\": \"50 Central Park South, New York, NY 10019\",\n          \"price\": \"From $1,200 per night\",\n          \"image_url\": \"https://www.ritzcarlton.com/en/hotels/new-york/central-park/images/hero-image-1418942.jpg\",\n          \"geo_coordinates\": \"40.7655° N, 73.9762° W\",\n          \"rating\": \"4.7 stars\",\n          \"description\": \"Luxurious hotel with Central Park views, renowned dining, and exceptional service.\"\n        },\n        {\n          \"name\": \"The St. Regis New York\",\n          \"address\": \"2 East 55th Street, New York, NY 10022\",\n          \"price\": \"From $1,000 per night\",\n          \"image_url\": \"https://www.marriott.com/static/media/images/hotels/nycsr/nycsr_exterior_1440x810.jpg\",\n          \"geo_coordinates\": \"40.7585° N, 73.9697° W\",\n          \"rating\": \"4.6 stars\",\n          \"description\": \"Historic hotel with elegant rooms, renowned dining, and a legendary Bloody Mary.\"\n        }\n      ]\n    },\n    \"itinerary\": {\n      \"day_1\": {\n        \"morning\": {\n          \"time\": \"9:00 AM\",\n          \"location\": \"Top of the Rock Observation Deck\",\n          \"details\": \"Enjoy panoramic views of the city from the 70th floor of Rockefeller Center. Get there early for sunrise views.\",\n          \"image_url\": \"https://www.rockefellercenter.com/sites/default/files/styles/hero_top/public/2018-03/Top-of-the-Rock-Observation-Deck-15.jpg?itok=42qXv-1S\",\n          \"geo_coordinates\": \"40.7588° N, 73.9788° W\",\n          \"ticket_pricing\": \"Varies, book in advance online.\",\n          \"travel_time\": \"1 hour\"\n        },\n        \"afternoon\": {\n          \"time\": \"12:00 PM\",\n          \"location\": \"Central Park\",\n          \"details\": \"Stroll through the iconic park, rent a bike, or have lunch at one of the many restaurants. See the Bethesda Terrace and Fountain.\",\n          \"image_url\": \"https://www.centralparknyc.org/sites/default/files/styles/hero_image/public/slideshow-images/central-park-01.jpg?itok=u3zG8uR8\",\n          \"geo_coordinates\": \"40.7742° N, 73.9745° W\",\n          \"ticket_pricing\": \"Free\",\n          \"travel_time\": \"15 minutes (by subway)\"\n        },\n        \"evening\": {\n          \"time\": \"6:00 PM\",\n          \"location\": \"Dinner at The NoMad Restaurant\",\n          \"details\": \"Enjoy a Michelin-starred dining experience at this elegant restaurant known for its seasonal cuisine and stunning décor.\",\n          \"image_url\": \"https://www.nomadiclub.com/media/images/nomad_restaurant_nyc_hero.jpg\",\n          \"geo_coordinates\": \"40.7365° N, 73.9925° W\",\n          \"ticket_pricing\": \"Varies, reservations recommended.\",\n          \"travel_time\": \"1 hour\"\n        }\n      },\n      \"day_2\": {\n        \"morning\": {\n          \"time\": \"9:00 AM\",\n          \"location\": \"The Metropolitan Museum of Art\",\n          \"details\": \"Explore world-renowned art collections, including Egyptian artifacts, European paintings, and American fashion.\" ,\n          \"image_url\": \"https://www.metmuseum.org/sites/default/files/styles/gallery_full_bleed_16x9/public/images/home_hero_0002.jpg?itok=L1Qf6J3Y\",\n          \"geo_coordinates\": \"40.7794° N, 73.9632° W\",\n          \"ticket_pricing\": \"Suggested donation, book online.\",\n          \"travel_time\": \"30 minutes (by subway)\"\n        },\n        \"afternoon\": {\n          \"time\": \"1:00 PM\",\n          \"location\": \"Lunch at The Clocktower\",\n          \"details\": \"Indulge in a sophisticated lunch at this elegant restaurant in the heart of Midtown, known for its modern American cuisine.\" ,\n          \"image_url\": \"https://theclocktowernyc.com/wp-content/uploads/2018/02/Clocktower-Interior-4.jpg\",\n          \"geo_coordinates\": \"40.7500° N, 73.9824° W\",\n          \"ticket_pricing\": \"Varies, reservations recommended.\",\n          \"travel_time\": \"15 minutes\"\n        },\n        \"evening\": {\n          \"time\": \"5:00 PM\",\n          \"location\": \"Shopping on Fifth Avenue\",\n          \"details\": \"Explore luxury boutiques and iconic department stores like Bergdorf Goodman and Saks Fifth Avenue.\" ,\n          \"image_url\": \"https://www.nycgo.com/images/content/article/hero/shopping-on-5th-avenue-16x9.jpg\",\n          \"geo_coordinates\": \"40.7579° N, 73.9732° W\",\n          \"ticket_pricing\": \"Free\",\n          \"travel_time\": \"10 minutes\"\n        },\n        \"night\": {\n          \"time\": \"8:00 PM\",\n          \"location\": \"Broadway Show\",\n          \"details\": \"Experience a world-class Broadway show in Times Square. Book tickets in advance for popular shows.\" ,\n          \"image_url\": \"https://www.playbill.com/image/75804\",\n          \"geo_coordinates\": \"40.7580° N, 73.9855° W\",\n          \"ticket_pricing\": \"Varies depending on the show and seating.\",\n          \"travel_time\": \"5 minutes\"\n        }\n      }\n    },\n    \"best_time_to_visit\": \"Spring (April-May) and Fall (September-October) offer pleasant weather and less crowds.\"\n  }\n}\n```\n\n**Notes:**\n\n* This plan is a suggestion and can be customized based on your family's interests.\n* Flight prices are estimates and can fluctuate.\n* Hotel prices are based on average rates and can vary depending on the time of year and availability.\n* Advance reservations are highly recommended for restaurants and attractions, especially during peak season.\n* This plan includes a combination of iconic attractions, cultural experiences, and fine dining to provide a luxurious and memorable experience.\n* Consider using public transportation (subway) for getting around the city, as it is efficient and cost-effective.\n* It is important to factor in travel time between locations when planning your itinerary. \n"},
		  ],
		},
	  ],
	});
  
	// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
	// console.log(result.response.text());
  