/**
 * Simple test function
 */

export async function onRequest(context) {
    return new Response(JSON.stringify({
        success: true,
        message: 'API is working!',
        timestamp: new Date().toISOString()
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
