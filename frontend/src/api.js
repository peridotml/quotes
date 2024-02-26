import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function search(text, topK, filter) {
  const data = {
    text,
    filter,
    top_k: topK,
  };

  try {
    const response = await axios.post(`${apiBaseUrl}/query`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error making query:', error);
  }
}
