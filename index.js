const Corestore = require('corestore');
const RandomAccess = require('random-access-idb');
const Discovery = require('@geut/discovery-swarm-webrtc');
const pump = require('pump');

const Quill = require('quill');
const { QuillBinding } = require('y-quill');
const QuillCursors = require('quill-cursors');

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
  text.innerText = 'Looking for peers...'

  sw.on("connection", (conn, info) => {
    const stream = store.replicate(info.initiator, { live: true });
    pump(stream, conn, stream, (err) => {
      console.log("stream end/error", err);
    });
  });
  sw.join(addressBuf);

  await ydoc.ready;
  text.innerText = 'Loading document...'

  Quill.register('modules/cursors', QuillCursors)
  const editor = new Quill("#editor", {
    modules: {
      cursors: true,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']            
      ],
    },
    placeholder: 'Type something...',
    theme: "snow",
  });
  
  if (!ydoc.writable) {
    editor.enable(false);
    ydoc.multicore.on('writer', () => {
      editor.enable(true);
    })
  }
  const type = ydoc.doc.getText("quill");
  const binding = new QuillBinding(type, editor, ydoc.awareness.awareness);

  window.ydoc = ydoc;
})();
