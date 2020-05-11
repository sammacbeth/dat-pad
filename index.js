const Corestore = require('corestore');
const RandomAccess = require('random-access-idb');
const Discovery = require('@geut/discovery-swarm-webrtc');
const pump = require('pump');

const CodeMirror = require('codemirror');
const { CodemirrorBinding } = require('y-codemirror/dist/y-codemirror.cjs');
require('codemirror/mode/markdown/markdown');

const MarkdownIt = require('markdown-it');

const { DatYDoc } = require("@sammacbeth/dat-shared-doc")

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
const text = document.querySelector('#editor p');

(async () => {
  const storageName = storeName();
  console.log(address, storageName);
  const storage = RandomAccess(storageName);
  const store = new Corestore(storage);
  const opts = {
    announceFeeds: true,
    awareness: true,
    bootstrapEnabled: true,
    policy: "GRANT_ALL_ADMIN"
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
  // text.innerText = 'Looking for peers...'

  sw.on("connection", (conn, info) => {
    const stream = store.replicate(info.initiator, { live: true });
    pump(stream, conn, stream, (err) => {
      console.log("stream end/error", err);
    });
  });
  sw.join(addressBuf);

  await ydoc.ready;
  // text.innerText = 'Loading document...'

  const editor = CodeMirror(document.getElementById('editor'), {
    mode: 'markdown',
    lineNumbers: true,
    lineWrapping: true,
    spellcheck: true,
    viewportMargin: Infinity,
  })
  
  // if (!ydoc.writable) {
  //   editor.enable(false);
  //   ydoc.multicore.on('writer', () => {
  //     editor.enable(true);
  //   })
  // }
  const type = ydoc.doc.getText("codemirror");
  const binding = new CodemirrorBinding(type, editor, ydoc.awareness.awareness);

  const md = new MarkdownIt();
  const docContents = document.getElementById('doc');
  type.observe(() => {
    docContents.innerHTML = md.render(type.toJSON())
  })

  window.ydoc = ydoc;
  window.binding = binding;
})();
