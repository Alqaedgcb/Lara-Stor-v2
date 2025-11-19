
import { NextResponse } from 'next/server';

// Utility function to convert data URI to Blob
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export async function POST(request: Request) {
  try {
    const { userImage, productImage } = await request.json();
    
    if (!userImage || !productImage) {
      return NextResponse.json({ error: 'User image and product image are required' }, { status: 400 });
    }

    const webhookUrl = 'https://ahdab.app.n8n.cloud/webhook-test/lara-store';

    const formData = new FormData();
    formData.append('userImage', dataURItoBlob(userImage), 'userImage.webp');
    formData.append('productImage', dataURItoBlob(productImage), 'productImage.webp');

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Webhook error:', errorText);
      return NextResponse.json({ error: `فشل الاتصال بالخدمة الخارجية: ${webhookResponse.statusText}` }, { status: webhookResponse.status });
    }

    // Assuming the webhook returns the image data URI in a JSON response
    const result = await webhookResponse.json();
    
    // The external service must return a JSON object with a `tryOnImage` property
    // which is a data URI string. e.g. { "tryOnImage": "data:image/webp;base64,..." }
    return NextResponse.json({ tryOnImage: result.tryOnImage });

  } catch (error) {
    console.error('API route error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
