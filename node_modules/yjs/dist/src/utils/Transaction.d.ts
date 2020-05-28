/**
 * A transaction is created for every change on the Yjs model. It is possible
 * to bundle changes on the Yjs model in a single transaction to
 * minimize the number on messages sent and the number of observer calls.
 * If possible the user of this library should bundle as many changes as
 * possible. Here is an example to illustrate the advantages of bundling:
 *
 * @example
 * const map = y.define('map', YMap)
 * // Log content when change is triggered
 * map.observe(() => {
 *   console.log('change triggered')
 * })
 * // Each change on the map type triggers a log message:
 * map.set('a', 0) // => "change triggered"
 * map.set('b', 0) // => "change triggered"
 * // When put in a transaction, it will trigger the log after the transaction:
 * y.transact(() => {
 *   map.set('a', 1)
 *   map.set('b', 1)
 * }) // => "change triggered"
 *
 * @public
 */
export class Transaction {
    /**
     * @param {Doc} doc
     * @param {any} origin
     * @param {boolean} local
     */
    constructor(doc: Doc, origin: any, local: boolean);
    /**
     * The Yjs instance.
     * @type {Doc}
     */
    doc: Doc;
    /**
     * Describes the set of deleted items by ids
     * @type {DeleteSet}
     */
    deleteSet: DeleteSet;
    /**
     * Holds the state before the transaction started.
     * @type {Map<Number,Number>}
     */
    beforeState: Map<Number, Number>;
    /**
     * Holds the state after the transaction.
     * @type {Map<Number,Number>}
     */
    afterState: Map<Number, Number>;
    /**
     * All types that were directly modified (property added or child
     * inserted/deleted). New types are not included in this Set.
     * Maps from type to parentSubs (`item.parentSub = null` for YArray)
     * @type {Map<AbstractType<YEvent>,Set<String|null>>}
     */
    changed: Map<AbstractType<YEvent>, Set<String | null>>;
    /**
     * Stores the events for the types that observe also child elements.
     * It is mainly used by `observeDeep`.
     * @type {Map<AbstractType<YEvent>,Array<YEvent>>}
     */
    changedParentTypes: Map<AbstractType<YEvent>, Array<YEvent>>;
    /**
     * @type {Set<ID>}
     */
    _mergeStructs: Set<ID>;
    /**
     * @type {any}
     */
    origin: any;
    /**
     * Stores meta information on the transaction
     * @type {Map<any,any>}
     */
    meta: Map<any, any>;
    /**
     * Whether this change originates from this doc.
     * @type {boolean}
     */
    local: boolean;
}
export function computeUpdateMessageFromTransaction(transaction: Transaction): encoding.Encoder | null;
export function nextID(transaction: Transaction): ID;
export function addChangedTypeToTransaction(transaction: Transaction, type: AbstractType<YEvent>, parentSub: string | null): void;
export function tryGc(ds: DeleteSet, store: StructStore, gcFilter: (arg0: Item) => boolean): void;
export function transact(doc: Doc, f: (arg0: Transaction) => void, origin?: any, local?: boolean): void;
import { Doc } from "./Doc.js";
import { DeleteSet } from "./DeleteSet.js";
import { AbstractType } from "../types/AbstractType.js";
import { YEvent } from "./YEvent.js";
import { ID } from "./ID.js";
import * as encoding from "lib0/encoding";
import { StructStore } from "./StructStore.js";
import { Item } from "../structs/Item.js";
