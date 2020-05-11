const Corestore = require("corestore");
const RandomAccess = require("random-access-idb");
const Discovery = require("@geut/discovery-swarm-webrtc");
const pump = require("pump");

const CodeMirror = require("codemirror");
const { CodemirrorBinding } = require("y-codemirror/dist/y-codemirror.cjs");
require("codemirror/mode/markdown/markdown");

const MarkdownIt = require("markdown-it");

const { DatYDoc } = require("@sammacbeth/dat-shared-doc");

function randomName() {
  return `store_${Math.ceil(Math.random() * 1e8).toString(10)}`;
}

let address = document.location.hash.substring(1);
if (address.length !== 64) {
  address = null;
}

function storeName() {
  if (!address) {
    return randomName();
  }
  return localStorage.getItem(address) || address;
}

(async () => {
  const storageName = storeName();
  console.log(address, storageName);
  const storage = RandomAccess(storageName);
  const store = new Corestore(storage);
  const opts = {
    announceFeeds: true,
    awareness: true,
    bootstrapEnabled: true,
    policy: "GRANT_ALL_ADMIN",
  };
  const ydoc = address
    ? await DatYDoc.load(address, store, opts)
    : await DatYDoc.create(store, opts);
  const sw = Discovery({
    bootstrap: ["https://signal.dat-web.eu/"],
  });
  if (!address) {
    address = ydoc.key.toString("hex");
    document.location.hash = `#${address}`;
    localStorage.setItem(address, storageName);
  }
  const addressBuf = Buffer.from(address, "hex");

  let peers = 0;
  sw.on("connection", (conn, info) => {
    const stream = store.replicate(info.initiator, { live: true });
    peers += 1;
    pump(stream, conn, stream, (err) => {
      peers -= 1;
      updatePeerCount(peers);
    });
    updatePeerCount(peers);
  });
  sw.join(addressBuf);

  await ydoc.ready;
  const type = ydoc.doc.getText("codemirror");

  function setupEditor() {
    const div =
      document.getElementById("editor") || document.createElement("div");
    div.setAttribute("id", "editor");
    div.setAttribute("class", "column");
    document
      .getElementById("content")
      .insertBefore(div, document.getElementById("doc"));
    const editor = CodeMirror(div, {
      mode: "markdown",
      lineNumbers: true,
      lineWrapping: true,
      spellcheck: true,
      viewportMargin: Infinity,
    });
    const binding = new CodemirrorBinding(
      type,
      editor,
      ydoc.awareness.awareness
    );
    window.binding = binding;
  }

  if (ydoc.writable) {
    setupEditor();
  } else {
    ydoc.multicore.once("writer", () => {
      setupEditor();
    });
  }

  const md = new MarkdownIt();
  const docContents = document.getElementById("doc");
  type.observe(() => {
    docContents.innerHTML = md.render(type.toJSON());
  });

  ydoc.multicore.metadata.doc.on("update", () => {
    updateWriterCount();
  });
  updateWriterCount();

  function updateWriterCount() {
    const writers = [...ydoc.multicore.metadata.getFeeds("ydoc").keys()].length;
    document.getElementById("writer-count").innerText = `${writers}`;
  }

  window.ydoc = ydoc;
})();

function updatePeerCount(peers) {
  document.getElementById("peer-count").innerText = `${peers}`;
}
