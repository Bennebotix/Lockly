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
    await decompressZip(file);
  } else if (file.name.endsWith(".tar.gz")) {
    log("TAR.GZ decompression is not implemented in this demo.");
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

async function decompressZip(file) {
  const zip = new JSZip();
  exportZip = new JSZip();
  try {
    log("Setting things up...");
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      const dots = ".".repeat(dotCount % 4);
      log(`Setting things up${dots}`, true);
      dotCount++;
    }, 500);
    const fileData = await file.arrayBuffer();
    const zipContent = await zip.loadAsync(fileData);
    clearInterval(dotInterval);
    log("ZIP file decompressed. Contents:");

    const totalEntries = Object.keys(zipContent.files).filter(relativePath => !relativePath.endsWith('/')).length;
    let processedEntries = 0;

    for (const [relativePath, entry] of Object.entries(zipContent.files)) {
      if (!relativePath.endsWith('/')) {
        log(`- Decompressing: ${relativePath}...`);
        try {
          const hashedKey = await hash(pwd);
          const encryptedFile = await encrypt(entry, hashedKey);
          await save(encryptedFile, relativePath);
          log(`  - ${relativePath} encrypted successfully.`);
        } catch (entryError) {
          log(`  - Error decompressing ${relativePath}: ${entryError.message}`);
        }
        processedEntries++;
        log(`Progress: ${processedEntries} of ${totalEntries} items processed.`);
      }
    }

    log("Decompression complete!");

    exportZip.generateAsync({ type: "base64" }).then(content => {
      location.href = "data:application/zip;base64," + content;
    });
  } catch (error) {
    log(`Error during decompression: ${error.message}`);
  }
}

async function save(file, path) {
  await exportZip.file(path, file, { binary: true });
}

async function hash(password) {
  const enc = new TextEncoder();
  const keyMaterial = enc.encode(password);
  return await crypto.subtle.digest("SHA-256", keyMaterial);
}


async function encrypt(data, key) {
  const nativeKey = await crypto.subtle.importKey(
    "raw",
    key,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    false,
    ["encrypt", "decrypt"]
  );
  return await crypto.subtle.encrypt({ name: "RSA-OAEP" }, nativeKey, data);
}
