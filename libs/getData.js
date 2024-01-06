export async function getData(endpoint) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    //console.log(baseUrl + "Base URL");
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
      },
      // cache: "no-store",
      cache: "default",
      // cache: "force-cache",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    //console.log(error);
  }
}
