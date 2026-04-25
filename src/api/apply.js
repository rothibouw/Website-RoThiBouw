/***************************  APPLY API UTILITY  ***************************/

export async function submitApplicationForm(formData, language = 'nl') {
  try {
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Accept-Language': language
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send application');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'An error occurred while submitting the application');
  }
}
