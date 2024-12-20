const workerJS = "c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgKGV2ZW50KSA9PiB7CiAgc2VsZi5rZXkgPSBKU09OLnBhcnNlKGF0b2IoZXZlbnQuZGF0YS5rZXkpKTsKfSk7CgpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoImZldGNoIiwgKGV2ZW50KSA9PiB7CiAgaWYgKGV2ZW50LnJlcXVlc3QuaG9zdCkKICAgIGZ1bmN0aW9uIHJlamVjdCgpIHsKICAgICAgbGV0IG1zZyA9IGV2ZW50LnJlcXVlc3QuaGVhZGVycy5nZXQoIkFjY2VwdCIpPy5pbmNsdWRlcygidGV4dC9odG1sIikKICAgICAgICA/ICJQYWdlIG5vdCBhY2Nlc3NpYmxlLCBwbGVhc2UgY29udGFjdCBhZG1pbmlzdHJhdG9yLiIKICAgICAgICA6ICIiOwogICAgICBldmVudC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UobXNnLCB7IHN0YXR1czogNDA0IH0pKTsKICAgIH0KCiAgZnVuY3Rpb24gcmVzb2x2ZShyZXF1ZXN0KSB7CiAgICBjb25zdCBuZXdVcmwgPSBuZXcgVVJMKAogICAgICAiL2RhdGEiICsgcmVxdWVzdC51cmwuc3Vic3RyaW5nKHNlbGYubG9jYXRpb24ub3JpZ2luLmxlbmd0aCksCiAgICAgIHNlbGYubG9jYXRpb24ub3JpZ2luLAogICAgKTsKICAgIGV2ZW50LnJlc3BvbmRXaXRoKAogICAgICAoYXN5bmMgKCkgPT4gewogICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gobmV3VXJsKTsKICAgICAgICBjb25zdCBlbmNyeXB0ZWRDb250ZW50ID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTsKCiAgICAgICAgY29uc3QgZGVjcnlwdGVkRGF0YSA9IGF3YWl0IGRlY3J5cHQoZW5jcnlwdGVkQ29udGVudCk7CiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShkZWNyeXB0ZWREYXRhLCB7CiAgICAgICAgICBoZWFkZXJzOiB7ICJDb250ZW50LVR5cGUiOiAiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtIiB9LAogICAgICAgIH0pOwogICAgICB9KSgpLAogICAgKTsKICB9CgogIGNvbnN0IHJlcXVlc3RVcmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTsKICBjb25zdCBpc0xvY2FsID0gcmVxdWVzdFVybC5vcmlnaW4gPT09IHNlbGYubG9jYXRpb24ub3JpZ2luOwoKICBpZiAoaXNMb2NhbCkgewogICAgaWYgKGtleSkgewogICAgICByZXNvbHZlKGV2ZW50LnJlcXVlc3QpOwogICAgfSBlbHNlIHsKICAgICAgcmVqZWN0KCk7CiAgICB9CiAgfSBlbHNlIHsKICAgIChhc3luYyAoKSA9PiB7CiAgICAgIGV2ZW50LnJlc3BvbmRXaXRoKGF3YWl0IGZldGNoKGV2ZW50LnJlcXVlc3QpKTsKICAgIH0pKCk7CiAgfQp9KTsKCmZ1bmN0aW9uIHNlbmQobXNnLCBldmVudCkgewogIChhc3luYyAoKSA9PiB7CiAgICBpZiAoIWV2ZW50LmNsaWVudElkKSByZXR1cm47CiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBzZWxmLmNsaWVudHMuZ2V0KGV2ZW50LmNsaWVudElkKTsKICAgIGlmICghY2xpZW50KSByZXR1cm47CgogICAgY2xpZW50LnBvc3RNZXNzYWdlKHsKICAgICAgbXNnOiBtc2csCiAgICB9KTsKICB9KSgpOwp9CgpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCAoZXZlbnQpID0+IHsKICBpZiAoZXZlbnQuZGF0YS50eXBlID09PSAiTE9DQUxfU1RPUkFHRV9LRVkiKSB7CiAgICBrZXkgPSBldmVudC5kYXRhLmtleTsKICB9Cn0pOwoKYXN5bmMgZnVuY3Rpb24gZGVjcnlwdChlbmNyeXB0ZWRDb250ZW50KSB7CiAgY29uc3QgZW5jID0gbmV3IFRleHRFbmNvZGVyKCk7CiAgY29uc3Qgc2FsdCA9IHNlbGYua2V5LnNhbHQ7CiAgY29uc3QgaXYgPSBzZWxmLmtleS5pdjsKICBjb25zdCBwd2QgPSBzZWxmLmtleS5wd2Q7CgogIGNvbnN0IGtleU1hdGVyaWFsID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoCiAgICAicmF3IiwKICAgIGVuYy5lbmNvZGUocHdkKSwKICAgIHsgbmFtZTogIlBCS0RGMiIgfSwKICAgIGZhbHNlLAogICAgWyJkZXJpdmVCaXRzIiwgImRlcml2ZUtleSJdLAogICk7CgogIGNvbnN0IGFlc0tleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGVyaXZlS2V5KAogICAgewogICAgICBuYW1lOiAiUEJLREYyIiwKICAgICAgc2FsdDogc2FsdCwKICAgICAgaXRlcmF0aW9uczogMTAwMDAwLAogICAgICBoYXNoOiAiU0hBLTI1NiIsCiAgICB9LAogICAga2V5TWF0ZXJpYWwsCiAgICB7IG5hbWU6ICJBRVMtR0NNIiwgbGVuZ3RoOiAyNTYgfSwKICAgIGZhbHNlLAogICAgWyJkZWNyeXB0Il0sCiAgKTsKCiAgY29uc3QgZGVjcnlwdGVkRGF0YSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGVjcnlwdCgKICAgIHsKICAgICAgbmFtZTogIkFFUy1HQ00iLAogICAgICBpdjogaXYsCiAgICAgIHRhZ0xlbmd0aDogMTI4LAogICAgfSwKICAgIGFlc0tleSwKICAgIGVuY3J5cHRlZENvbnRlbnQsCiAgKTsKCiAgcmV0dXJuIG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShkZWNyeXB0ZWREYXRhKTsKfQ==";
const indexHTML = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICA8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04IiAvPgogICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIC8+CiAgICA8bWV0YSBuYW1lPSJjb2xvci1zY2hlbWUiIGNvbnRlbnQ9ImxpZ2h0IGRhcmsiIC8+CiAgICA8c3R5bGU+CiAgICAgIHByZSB7CiAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgIHRvcDogNTAlOwogICAgICAgIGxlZnQ6IDUwJTsKICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTsKICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgIH0KCiAgICAgIHByZSA+ICogewogICAgICAgIGNvbG9yOiAjZmZmOwogICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDsKICAgICAgICBmb250LWZhbWlseTogQ291cmllciBOZXc7CiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsKICAgICAgfQoKICAgICAgaW5wdXQgewogICAgICAgIHdpZHRoOiAxNzNweDsKICAgICAgICBoZWlnaHQ6IDg2cHg7CiAgICAgIH0KCiAgICAgIGlucHV0OmZvY3VzIHsKICAgICAgICBvdXRsaW5lOiBub25lOwogICAgICB9CgogICAgICBidXR0b24gewogICAgICAgIHdpZHRoOiAyMzhweDsKICAgICAgICBoZWlnaHQ6IDQzcHg7CiAgICAgIH0KCiAgICAgIGJ1dHRvbjpob3ZlciB7CiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHJnYmEoMTczLCAyMTYsIDIzMCwgMC40KTsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2hlYWQ+CiAgPGJvZHk+CiAgICA8cHJlIHN0eWxlPSJ3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7IHdoaXRlLXNwYWNlOiBwcmUtd3JhcCI+CiAgICA8aW5wdXQgcGxhY2Vob2xkZXI9IkVudGVyIEtleSIgaWQ9ImtleSI+CiAgICA8YnIgLz4KICAgIDxidXR0b24gaWQ9ImJ0biI+UmVnaXN0ZXI8L2J1dHRvbj4KICA8L3ByZT4KCiAgICA8c2NyaXB0PgogICAgICBpZiAoInNlcnZpY2VXb3JrZXIiIGluIG5hdmlnYXRvcikgewogICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJsb2FkIiwgKCkgPT4gewogICAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIKICAgICAgICAgICAgLnJlZ2lzdGVyKCJ3b3JrZXIuanMiKQogICAgICAgICAgICAudGhlbigocmVnaXN0cmF0aW9uKSA9PiB7CiAgICAgICAgICAgICAgY29uc29sZS5sb2coCiAgICAgICAgICAgICAgICAiU2VydmljZSBXb3JrZXIgcmVnaXN0ZXJlZCB3aXRoIHNjb3BlOiIsCiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb24uc2NvcGUsCiAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgfSkKICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gewogICAgICAgICAgICAgIGNvbnNvbGUubG9nKCJTZXJ2aWNlIFdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiIsIGVycm9yKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjYnRuIikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiB7CiAgICAgICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgIG1lc3NhZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNrZXkiKS52YWx1ZSwKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KTsKICAgICAgICB9KTsKICAgICAgfSBlbHNlIHsKICAgICAgICBjb25zb2xlLmxvZygiU2VydmljZSB3b3JrZXJzIGFyZSBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3Nlci4iKTsKICAgICAgfQogICAgPC9zY3JpcHQ+CiAgPC9ib2R5Pgo8L2h0bWw+";
const four04HTML = "";

const fileInput = document.querySelector("#fileInput");
const consoleDiv = document.getElementById("console");
let pwd;

fileInput.addEventListener("change", async () => {
  pwd = document.querySelector("#password").value;

  if (fileInput.files.length === 0) {
    log("Please select a file to decompress.");
    return;
  }

  const files = fileInput.files;
  if (files.length > 1) {
    //await encryptFolder(files);
  } else {
    const file = files[0];
    log(`Selected file: ${file.name}`);
  
    if (file.name.endsWith(".zip")) {
      await encryptZip(file);
    } else if (file.name.endsWith(".tar.gz")) {
      //await encryptTarGZ(file);
    } else {
      log("Unsupported file type. ");
    }
  }
});

function log(message, overwriteLast = false) {
  if (overwriteLast) {
    consoleDiv.removeChild(consoleDiv.lastChild);
  }
  let node = document.createElement("span");
  node.innerHTML = message + "<br>";
  consoleDiv.appendChild(node);
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

async function encryptZip(file) {
  const zip = new JSZip();
  const exportZip = new JSZip();

  async function saveToZIP(file, path) {
    console.log(path)
    await exportZip.file('/data' + path, file, { binary: true });
  }
  
  const download = async () => {
    try {
      const content = await exportZip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating ZIP file:", error);
    }
  };
  
  try {
    log("Decompressing...");
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      const dots = ".".repeat(dotCount % 4);
      log(`Decompressing${dots}`, true);
      dotCount++;
    }, 500);
    
    const fileData = await file.arrayBuffer();
    const zipContent = await zip.loadAsync(fileData);
    
    clearInterval(dotInterval);
    log("Decompression done!");

    const totalEntries = Object.keys(zipContent.files).filter(relativePath => !relativePath.endsWith('/')).length;
    let processedEntries = 0;

    for (const [relativePath, entry] of Object.entries(zipContent.files)) {
      if (!relativePath.endsWith('/')) {
        log(`- Encrypting: ${relativePath}...`);
        try {
          const entryData = await entry.async("uint8array");
          const encryptedFile = await encrypt(entryData, pwd);
          await saveToZIP(encryptedFile.encryptedData, relativePath);
          log(`  - ${relativePath} encrypted successfully.`);
        } catch (entryError) {
          log(`  - Error processing ${relativePath}: ${entryError.message}`);
        }
        processedEntries++;
        log(`Progress: ${processedEntries} of ${totalEntries}`);
      }
    }

    log("Encryption complete!");
    log("Adding Managers...");

    save(new File([atob(workerJS)], "worker.js"), "/worker.js");
    save(new File([atob(indexHTML)], "index.html"), "/index.html");
    save(new File([atob(four04HTML)], "404.html"), "/404.html");
    
    log("Managers added.")

    await download();
  } catch (error) {
    log(`Error during encryption: ${error.message}`);
  }
}

async function encrypt(data, password) {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  
  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
      tagLength: 128,
    },
    aesKey,
    data
  );

  return { iv, salt, encryptedData };
}
