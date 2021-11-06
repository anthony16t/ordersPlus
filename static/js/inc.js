export async function fetchData(url) {
    const rep = await fetch(url);
    const data = await rep.json();
    console.log('waiting 1 second')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('1 second done')
    return data;
}

export let refs = { shopify: '/static/images/website/shopify.png' };
