
// // export default PlanedTrip;
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// interface Place {
//   image_url?: string;
//   name?: string;
//   detail?: string;
//   geo_coordinates?: [number, number];
//   ticket_pricing?: string;
//   time_to_travel?: string;
// }

// interface Itinerary {
//   best_time_to_visit: string;
//   day: number;
//   description: string;
//   title: string;
//   places?: Place[];
// }

// interface ItineraryProps {
//   details: Itinerary[];
// }

// const PlanedTrip: React.FC<ItineraryProps> = ({ details }) => {
//   const [photos, setPhotos] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       const photoPromises = details.flatMap(async (item) => {
//         if (item.places) {
//           const placePhotos = await Promise.all(
//             item.places.map(async (place) => {
//               if (place.name) {
//                 const photoUrl = await fetchUnsplashPhotos(place.name);
//                 return { name: place.name, photoUrl };
//               }
//               return null;
//             })
//           );
//           return placePhotos.filter(Boolean) as { name: string; photoUrl: string }[];
//         }
//         return [];
//       });

//       const fetchedPhotos = await Promise.all(photoPromises);
//       const photoMap = fetchedPhotos.flat().reduce((acc, { name, photoUrl }) => {
//         acc[name] = photoUrl;
//         return acc;
//       }, {} as { [key: string]: string });
//       setPhotos(photoMap);
//     };

//     fetchPhotos();
//   }, [details]);

//   return (
//     <ScrollView style={{ marginTop: 10 }}>
//       <Text style={styles.header}>🏕️ Plan Details</Text>
//       {details.map((item) => (
//         <View key={item.day} style={styles.itineraryItem}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.description}>{item.description}</Text>
//           <Text style={styles.bestTime}>Best time to visit: {item.best_time_to_visit}</Text>
//           <Text style={styles.day}>Day {item.day}</Text>
//           {item.places?.map((place, index) => (
//             <View key={index} style={styles.place}>
//               <Image
//                 source={{ uri: photos[place.name || ''] || 'default_image_url' }}
//                 style={styles.image}
//                 defaultSource={require('@/assets/images/placeholderimg.png')} // Add a local placeholder image
//               />
//               <Text style={styles.placeName}>{place.name}</Text>
//               <Text style={styles.placeDetail}>{place.detail}</Text>
//               {place.geo_coordinates && (
//                 <Text style={styles.placeCoordinates}>
//                   Coordinates: {place.geo_coordinates[0].toFixed(4)}, {place.geo_coordinates[1].toFixed(4)}
//                 </Text>
//               )}
//               <Text style={styles.placeTicket}>Ticket Pricing: {place.ticket_pricing}</Text>
//               <Text style={styles.placeTime}>Time to Travel: {place.time_to_travel}</Text>
//             </View>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 20,
//     fontFamily: 'Poppins-Bold',
//     marginBottom: 10,
//   },
//   itineraryItem: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: 'Poppins-Bold',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 14,
//     fontFamily: 'Poppins-Regular',
//     marginBottom: 5,
//   },
//   bestTime: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Italic',
//     color: 'gray',
//     marginBottom: 5,
//   },
//   day: {
//     fontSize: 14,
//     fontFamily: 'Poppins-Regular',
//     marginBottom: 10,
//   },
//   place: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   placeName: {
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//     marginBottom: 5,
//   },
//   placeDetail: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//     color: 'gray',
//     marginBottom: 5,
//   },
//   placeCoordinates: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//     color: 'gray',
//     marginBottom: 5,
//   },
//   placeTicket: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//     color: 'gray',
//     marginBottom: 5,
//   },
//   placeTime: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//     color: 'gray',
//   },
// });

// export default PlanedTrip;

import { GetPhotoRef } from '@/Services/GooglePlacesApi';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
// import { GetPhotoRef } from './path/to/googlePlacesService'; // Update the path accordingly

interface Place {
  image_url?: string;
  name?: string;
  detail?: string;
  geo_coordinates?: [number, number];
  ticket_pricing?: string;
  time_to_travel?: string;
}

interface Itinerary {
  best_time_to_visit: string;
  day: number;
  description: string;
  title: string;
  places?: Place[];
}

interface ItineraryProps {
  details: Itinerary[];
}

const PlanedTrip: React.FC<ItineraryProps> = ({ details }) => {
  const [photos, setPhotos] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchPhotos = async () => {
      const photoPromises = details.flatMap(async (item) => {
        if (item.places) {
          const placePhotos = await Promise.all(
            item.places.map(async (place) => {
              if (place.name) {
                const photoUrl = await GetPhotoRef(place.name);
                return { name: place.name, photoUrl };
              }
              return null;
            })
          );
          return placePhotos.filter(Boolean) as { name: string; photoUrl: string }[];
        }
        return [];
      });

      const fetchedPhotos = await Promise.all(photoPromises);
      const photoMap = fetchedPhotos.flat().reduce((acc, { name, photoUrl }) => {
        acc[name] = photoUrl;
        return acc;
      }, {} as { [key: string]: string });
      setPhotos(photoMap);
    };

    fetchPhotos();
  }, [details]);

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <Text style={styles.header}>🏕️ Plan Details</Text>
      {details.map((item) => (
        <View key={item.day} style={styles.itineraryItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.bestTime}>Best time to visit: {item.best_time_to_visit}</Text>
          <Text style={styles.day}>Day {item.day}</Text>
          {item.places?.map((place, index) => (
            <View key={index} style={styles.place}>
              <Image
                source={ photos[place.name || ''] ? { uri:    photos[place.name || '']   } :  require('@/assets/images/placeholderimg.png')}
                style={styles.image}
                defaultSource={require('@/assets/images/placeholderimg.png')} // Add a local placeholder image
              />
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeDetail}>{place.detail}</Text>
              {place.geo_coordinates && (
                <Text style={styles.placeCoordinates}>
                  Coordinates: {place.geo_coordinates[0].toFixed(4)}, {place.geo_coordinates[1].toFixed(4)}
                </Text>
              )}
              <Text style={styles.placeTicket}>Ticket Pricing: {place.ticket_pricing}</Text>
              <Text style={styles.placeTime}>Time to Travel: {place.time_to_travel}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  itineraryItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  bestTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Italic',
    color: 'gray',
    marginBottom: 5,
  },
  day: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  place: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  placeDetail: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
    marginBottom: 5,
  },
  placeCoordinates: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
    marginBottom: 5,
  },
  placeTicket: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
    marginBottom: 5,
  },
  placeTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
});

export default PlanedTrip;
