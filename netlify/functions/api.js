export async function handler(event, context) {
    try {
        const { category, selectedCategory, selectedLanguage } = event.queryStringParameters;
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&q=${category}&lang=${selectedLanguage}&apikey=${process.env.GNEWS_API_KEY}`);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: response.ok,
                articles: Array.isArray(data.articles) ? data.articles : [],
                error: response.ok ? null : data.errors?.[0] || data.error || "failed to fetch",
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                articles: [],
                error: error.message || "Server error",
            }),
        };
    }
}