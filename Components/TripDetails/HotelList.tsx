// import React, { useState } from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// interface Hotel {
//     address: string;
//     description: string;
//     geo_coordinates: [number, number];
//     image_url: string;
//     name: string;
//     price: string;
//     rating: number;
// }

// interface HotelProps {
//     hotelList: Hotel[];
// }

// const HotelList: React.FC<HotelProps> = ({ hotelList }) => {
//     const placeholderImage = require('@/assets/images/hotel.jpg');

//     return (
//         <View >
//             <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
//                 🏨 Hotel Recommendations
//             </Text>
//             <FlatList
//                 data={hotelList}
//                 keyExtractor={(item) => item.name}
//                 style={{ marginTop: 8 }}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({ item }) => (
//                     <HotelItem item={item} placeholderImage={placeholderImage} />
//                 )}
//             />
//         </View>
//     );
// }

// const HotelItem: React.FC<{ item: Hotel; placeholderImage: any }> = ({ item, placeholderImage }) => {
//     const [imageSource, setImageSource] = useState({ uri: item.image_url });

//     return (
//         <View style={{ marginRight: 20, width: 180 }}>
//             <Image
//                 source={imageSource}
//                 style={{ width: 180, height: 120, borderRadius: 15 }}
//                 onError={() => setImageSource(placeholderImage)}
//             />
//             <View style={{ padding: 5 }}>
//                 <Text style={{ fontFamily: 'Poppins-Medium' }}>
//                     {item.name}
//                 </Text>
//                 <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
//                     <Text style={{ fontFamily: 'Poppins-Regular' }}>
//                         ⭐ {item.rating}
//                     </Text>
//                     <Text style={{ fontFamily: 'Poppins-Regular' }}>
//                         💸 {item.price}
//                     </Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default HotelList;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// Hotel interface
interface Hotel {
    address: string;
    description: string;
    geo_coordinates: [number, number];
    image_url?: string; // Make image_url optional
    name: string;
    price: string;
    rating: number;
}

// Hotel properties interface
interface HotelProps {
    hotelList: Hotel[];
}

// Function to fetch hotel images using Google Places API
const fetchHotelImage = async (hotelName: string): Promise<string> => {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API; // Ensure this key is set correctly

    try {
        // Search for the hotel
        const searchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(hotelName)}&key=${apiKey}`);
        const searchResult = await searchResponse.json();

        if (searchResult.results && searchResult.results.length > 0) {
            const placeId = searchResult.results[0].place_id;
            if (searchResult.results[0].photos && searchResult.results[0].photos.length > 0) {
                const photoReference = searchResult.results[0].photos[0].photo_reference;
                // Construct the photo URL
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
            }
        }

        return 'default_image_url'; // Replace with your actual default image URL
    } catch (error) {
        console.error('Error fetching hotel image:', error);
        return 'default_image_url'; // Replace with your actual default image URL
    }
};

// HotelList component
const HotelList: React.FC<HotelProps> = ({ hotelList }) => {
    const [hotelImages, setHotelImages] = useState<{ [key: string]: string }>({});
    const placeholderImage = require('@/assets/images/hotel.jpg'); // Path to your placeholder image

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = hotelList.map(async (hotel) => {
                if (hotel.name) {
                    const imageUrl = await fetchHotelImage(hotel.name);
                    return { name: hotel.name, imageUrl };
                }
                return null;
            });

            const fetchedImages = await Promise.all(imagePromises);
            const imageMap = fetchedImages.reduce((acc, item) => {
                if (item) {
                    acc[item.name] = item.imageUrl;
                }
                return acc;
            }, {} as { [key: string]: string });

            setHotelImages(imageMap);
        };

        fetchImages();
    }, [hotelList]);

    return (
        <View>
            <Text style={styles.header}>🏨 Hotel Recommendations</Text>
            <FlatList
                data={hotelList}
                keyExtractor={(item) => item.name}
                style={styles.list}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <HotelItem item={item} imageSource={hotelImages[item.name] || ''} placeholderImage={placeholderImage} />
                )}
            />
        </View>
    );
};

// HotelItem component
const HotelItem: React.FC<{ item: Hotel; imageSource: string; placeholderImage: any }> = ({ item, imageSource, placeholderImage }) => {
    return (
        <View style={styles.item}>
            <Image
                source={imageSource ? { uri: imageSource } : placeholderImage}
                style={styles.image}
                onError={() => { /* Handle image load error here */ }}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.rating}>⭐ {item.rating}</Text>
                    <Text style={styles.price}>💸 {item.price}</Text>
                </View>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    header: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        marginBottom: 8,
    },
    list: {
        marginTop: 8,
    },
    item: {
        marginRight: 20,
        width: 180,
    },
    image: {
        width: 180,
        height: 120,
        borderRadius: 15,
    },
    info: {
        padding: 5,
    },
    name: {
        fontFamily: 'Poppins-Medium',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rating: {
        fontFamily: 'Poppins-Regular',
    },
    price: {
        fontFamily: 'Poppins-Regular',
    },
});

export default HotelList;
