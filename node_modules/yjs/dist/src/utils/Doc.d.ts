/**
 * A Yjs instance handles the state of shared data.
 * @extends Observable<string>
 */
export class Doc extends Observable<string> {
    /**
     * @param {Object} conf configuration
     * @param {boolean} [conf.gc] Disable garbage collection (default: gc=true)
     * @param {function(Item):boolean} [conf.gcFilter] Will be called before an Item is garbage collected. Return false to keep the Item.
     */
    constructor({ gc, gcFilter }?: {
        gc?: boolean;
        gcFilter?: (arg0: Item) => boolean;
    });
    gc: boolean;
    gcFilter: (arg0: Item) => boolean;
    clientID: number;
    /**
     * @type {Map<string, AbstractType<YEvent>>}
     */
    share: Map<string, AbstractType<YEvent>>;
    store: StructStore;
    /**
     * @type {Transaction | null}
     */
    _transaction: Transaction | null;
    /**
     * @type {Array<Transaction>}
     */
    _transactionCleanups: Array<Transaction>;
    /**
     * Changes that happen inside of a transaction are bundled. This means that
     * the observer fires _after_ the transaction is finished and that all changes
     * that happened inside of the transaction are sent as one message to the
     * other peers.
     *
     * @param {function(Transaction):void} f The function that should be executed as a transaction
     * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
     *
     * @public
     */
    transact(f: (arg0: Transaction) => void, origin?: any): void;
    /**
     * Define a shared data type.
     *
     * Multiple calls of `y.get(name, TypeConstructor)` yield the same result
     * and do not overwrite each other. I.e.
     * `y.define(name, Y.Array) === y.define(name, Y.Array)`
     *
     * After this method is called, the type is also available on `y.share.get(name)`.
     *
     * *Best Practices:*
     * Define all types right after the Yjs instance is created and store them in a separate object.
     * Also use the typed methods `getText(name)`, `getArray(name)`, ..
     *
     * @example
     *   const y = new Y(..)
     *   const appState = {
     *     document: y.getText('document')
     *     comments: y.getArray('comments')
     *   }
     *
     * @param {string} name
     * @param {Function} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
     * @return {AbstractType<any>} The created type. Constructed with TypeConstructor
     *
     * @public
     */
    get(name: string, TypeConstructor?: Function): AbstractType<any>;
    /**
     * @template T
     * @param {string} name
     * @return {YArray<T>}
     *
     * @public
     */
    getArray<T>(name: string): YArray<T>;
    /**
     * @param {string} name
     * @return {YText}
     *
     * @public
     */
    getText(name: string): YText;
    /**
     * @param {string} name
     * @return {YMap<any>}
     *
     * @public
     */
    getMap(name: string): YMap<any>;
    /**
     * @param {string} name
     * @return {YXmlFragment}
     *
     * @public
     */
    getXmlFragment(name: string): YXmlFragment;
}
import { Observable } from "lib0/observable";
import { Item } from "../structs/Item.js";
import { AbstractType } from "../types/AbstractType.js";
import { YEvent } from "./YEvent.js";
import { StructStore } from "./StructStore.js";
import { Transaction } from "./Transaction.js";
import { YArray } from "../types/YArray.js";
import { YText } from "../types/YText.js";
import { YMap } from "../types/YMap.js";
import { YXmlFragment } from "../types/YXmlFragment.js";
