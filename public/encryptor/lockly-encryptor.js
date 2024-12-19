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
    log("Setting thigs up...");
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      const dots = ".".repeat(dotCount % 4);
      log(`Setting thigs up${dots}`, true);
      dotCount++;
    }, 500);
    const fileData = await file.arrayBuffer();
    const zipContent = await zip.loadAsync(fileData);
    clearInterval(dotInterval);
    log("ZIP file decompressed. Contents:");

    // Get the total number of entries for a progress indicator
    const totalEntries = Object.keys(zipContent.files).length;
    let processedEntries = 0;

    await zip.forEach(async (relativePath, entry) => {
      if (relativePath[relativePath.split('').length - 1] !== '/')
      log(`- Decompressing: ${relativePath}...`);
      try {
        await save(encrypt(entry, hash(new File(pwd, 'key.txt'))), relativePath);
        log(`  - ${relativePath} encrypted successfully.`);
      } catch (entryError) {
        log(`  - Error decompressing ${relativePath}: ${entryError.message}`);
      }
      processedEntries++;
      log(`Progress: ${processedEntries} of ${totalEntries} items processed.`);
    });

    log("Decompression complete!");

    exportZip.generateAsync({ type: "base64" }).then(function (content) {
      location.href = "data:application/zip;base64," + content;
    });
  } catch (error) {
    log(`Error during decompression: ${error.message}`);
  }
}

async function save(file, path) {
  console.log(path);
  await exportZip.file(path, file, { binary: true });
}

async function hash(file) {
  return await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
}

async function encrypt(file, key) {
  const nativeKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "RSA-OAEP" },
    false,
    ["encrypt", "decrypt"],
  );
  return await crypto.encrypt({ name: "RSA-OAEP" }, nativeKey, file);
}
