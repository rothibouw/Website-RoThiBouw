/***************************  CONTACT API UTILITY  ***************************/

export async function submitContactForm(formData, language = 'nl') {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept-Language': language
      },
      body: formData
    });

    const data = await response.json();

    // Check if response is not ok (4xx, 5xx status codes)
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message');
    }

    return data;
  } catch (error) {
    // Re-throw error with consistent message format
    throw new Error(error.message || 'An error occurred while submitting the form');
  }
}
