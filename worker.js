addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Hapus parameter ?m=1 jika ada
  if (url.searchParams.has("m")) {
    url.searchParams.delete("m");
    return Response.redirect(url.href, 301); // Redirect permanen ke URL tanpa ?m=1
  }

  // Clone request asli dan ubah User-Agent ke desktop
  const modifiedHeaders = new Headers(request.headers);
  modifiedHeaders.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
  );

  const modifiedRequest = new Request(url, {
    headers: modifiedHeaders,
    redirect: "manual",
  });

  // Kirim permintaan ke Blogger
  let response = await fetch(modifiedRequest);

  // Tangani redirect dari Blogger
  if ([301, 302, 303, 307, 308].includes(response.status)) {
    let location = response.headers.get("Location");

    if (location) {
      const locationUrl = new URL(location);

      // Hapus parameter m=1 dari URL tujuan redirect
      if (locationUrl.searchParams.has("m")) {
        locationUrl.searchParams.delete("m");
        location = locationUrl.toString();
      }

      // Pastikan tidak redirect ke URL yang sama
      if (location !== url.href) {
        return Response.redirect(location, 301); // Redirect ke URL yang sudah dibersihkan
      }
    }
  }

  // Jika tidak ada redirect, kembalikan respons asli
  return response;
}
