import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'dbHrIB6rUFtHFnbMOSuXfzpPD8hCbJvHXHNxu57a170'; // Replace with your Unsplash access key

export const fetchUnsplashPhotos = async (query: string): Promise<string | null> => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query,
        client_id: UNSPLASH_ACCESS_KEY,
        per_page: 1, // You can adjust this if you want more images
      },
    });
    const photoUrl = response.data.results?.[0]?.urls?.regular;
    return photoUrl || null;
  } catch (error) {
    console.error('Error fetching photos from Unsplash:', error);
    return null;
  }
};
