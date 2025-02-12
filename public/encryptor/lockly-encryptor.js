let salt = {};
let ogIV = {};
const IV = (v) => Object.values(ogIV).map(a => (a + v) % 255).reduce((a, c, i) => ({ ...a, [i]: c }), {})

const fileInput = document.querySelector("#fileInput");
const consoleDiv = document.querySelector("#console");
let buildDir;
let pwd;

fileInput.addEventListener("change", async () => {
  salt = window.crypto.getRandomValues(new Uint8Array(16));
  ogIV = window.crypto.getRandomValues(new Uint8Array(12));
  
  buildDir = document.querySelector("#buildDir").value.replace("/", "");
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

const downloadKey = async () => {
  try {
    const content = new Blob([btoa(JSON.stringify({ iv: ogIV, salt: salt, pwd: pwd }))], { type: "text/plain" });
    const url = URL.createObjectURL(content);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "key.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    URL.revokeObjectURL(url);

    return new Promise(r => r);
  } catch (error) {
    console.error("Error generating Key file:", error);
  }
};

async function encryptZip(file) {
  const zip = new JSZip();
  const exportZip = new JSZip();
  
  const workerJS = btoa(await fetch("/worker.js").then(r => r.text()));
  const indexHTML = btoa(await fetch("/index.html").then(r => r.text()));
  const four04HTML = btoa(await fetch("/404.html").then(r => r.text()));

  async function saveToZIP(file, path) {
    await exportZip.file(path, file, { binary: true });
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

      await downloadKey();
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

    for (const [relativePathFull, entry] of Object.entries(zipContent.files)) {
      if (!relativePathFull.endsWith("/") && relativePathFull.startsWith(buildDir)) {
        let relativePath = relativePathFull.replace(buildDir, "");
        relativePath = relativePath.substring(relativePath.indexOf("/") + 1);
        log(`- Encrypting: ${relativePath}...`);
        try {
          const entryData = await entry.async("uint8array");
          const encryptedFile = await encrypt(entryData, pwd);
          await saveToZIP(encryptedFile, '/data/' + relativePath);
          log(`  - ${relativePath} encrypted successfully.`);
        } catch (entryError) {
          log(`  - Error processing ${relativePath}: ${JSON.stringify(entryError, 1, 2)}`);
        }
        processedEntries++;
        log(`Progress: ${processedEntries} of ${totalEntries}`);
      }
    }

    log("Encryption complete!");
    log("Adding Managers...");

    saveToZIP(new File([atob(workerJS)], "worker.js"), "/worker.js");
    saveToZIP(new File([atob(indexHTML)], "index.html"), "/index.html");
    saveToZIP(new File([atob(four04HTML)], "404.html"), "/404.html");
    
    log("Managers added.")

    await download();
  } catch (error) {
    log(`Error during encryption: ${error.message}`);
  }
}

async function encrypt(data, password) {
  const enc = new TextEncoder();
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

  console.log(aesKey)
  console.log(data)

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: ogIV,
      tagLength: 128,
    },
    aesKey,
    data
  );

  return encryptedData;
}
