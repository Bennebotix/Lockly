const consoleDiv = document.getElementById("console");
let pwd;
let exportZip;

document.querySelector("#encryptBtn").addEventListener("click", async () => {
  const fileInput = document.querySelector("#fileInput");
  pwd = document.querySelector("#password").value;

  if (fileInput.files.length === 0) {
    log("Please select a file to decompress.");
    return;
  }

  const file = fileInput.files[0];
  log(`Selected file: ${file.name}`);

  if (file.name.endsWith(".zip")) {
    await encryptZip(file);
  } else if (file.name.endsWith(".tar.gz")) {
    log("TAR.GZ decompression is not implemented yet");
  } else {
    log("Unsupported file type. ");
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
  const download = async () => {
    try {
      const content = await exportZip.generateAsync({ type: "blob" });  // Generate as Blob
      const url = URL.createObjectURL(content); // Create a URL for the blob
  
      const a = document.createElement("a");
      a.href = url;
      a.download = "file.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating ZIP file:", error);
    }
  };
  
  const zip = new JSZip();
  exportZip = new JSZip();
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
    log("ZIP file decompressed.");

    const totalEntries = Object.keys(zipContent.files).filter(relativePath => !relativePath.endsWith('/')).length;
    let processedEntries = 0;

    for (const [relativePath, entry] of Object.entries(zipContent.files)) {
      if (!relativePath.endsWith('/')) {
        log(`- Decompressing: ${relativePath}...`);
        try {
          const entryData = await entry.async("uint8array");
          const encryptedFile = await encrypt(entryData, pwd);
          await save(encryptedFile.encryptedData, relativePath);
          log(`  - ${relativePath} encrypted successfully.`);
        } catch (entryError) {
          log(`  - Error processing ${relativePath}: ${entryError.message}`);
        }
        processedEntries++;
        log(`Progress: ${processedEntries} of ${totalEntries}`);
      }
    }

    log("Encryption complete!");

    download();
  } catch (error) {
    log(`Error during encryption: ${error.message}`);
  }
}


async function save(file, path) {
  await exportZip.file(path, file, { binary: true });
}

async function encrypt(data, password) {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16)); // Generate random salt
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

  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
      tagLength: 128,
    },
    aesKey,
    data
  );

  return { iv, salt, encryptedData }; // Return IV, salt, and encrypted data
}
