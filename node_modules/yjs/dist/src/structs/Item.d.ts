export function followRedone(store: StructStore, id: ID): {
    item: Item;
    diff: number;
};
export function keepItem(item: Item | null, keep: boolean): void;
export function splitItem(transaction: Transaction, leftItem: Item, diff: number): Item;
export function redoItem(transaction: Transaction, item: Item, redoitems: Set<Item>): Item | null;
/**
 * Abstract class that represents any content.
 */
export class Item extends AbstractStruct {
    /**
     * @param {ID} id
     * @param {Item | null} left
     * @param {ID | null} origin
     * @param {Item | null} right
     * @param {ID | null} rightOrigin
     * @param {AbstractType<any>} parent
     * @param {string | null} parentSub
     * @param {AbstractContent} content
     */
    constructor(id: ID, left: Item | null, origin: ID | null, right: Item | null, rightOrigin: ID | null, parent: AbstractType<any>, parentSub: string | null, content: AbstractContent);
    /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     * @readonly
     */
    origin: ID | null;
    /**
     * The item that is currently to the left of this item.
     * @type {Item | null}
     */
    left: Item | null;
    /**
     * The item that is currently to the right of this item.
     * @type {Item | null}
     */
    right: Item | null;
    /**
     * The item that was originally to the right of this item.
     * @readonly
     * @type {ID | null}
     */
    rightOrigin: ID | null;
    /**
     * The parent type.
     * @type {AbstractType<any>}
     * @readonly
     */
    parent: AbstractType<any>;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     * @readonly
     */
    parentSub: String | null;
    /**
     * If this type's effect is reundone this type refers to the type that undid
     * this operation.
     * @type {ID | null}
     */
    redone: ID | null;
    /**
     * @type {AbstractContent}
     */
    content: AbstractContent;
    countable: boolean;
    /**
     * If true, do not garbage collect this Item.
     */
    keep: boolean;
    /**
     * Returns the next non-deleted item
     */
    get next(): Item | null;
    /**
     * Returns the previous non-deleted item
     */
    get prev(): Item | null;
    /**
     * Computes the last content address of this Item.
     */
    get lastId(): ID;
    /**
     * Try to merge two items
     *
     * @param {Item} right
     * @return {boolean}
     */
    mergeWith(right: Item): boolean;
    /**
     * Mark this Item as deleted.
     *
     * @param {Transaction} transaction
     */
    delete(transaction: Transaction): void;
    /**
     * @param {StructStore} store
     * @param {boolean} parentGCd
     */
    gc(store: StructStore, parentGCd: boolean): void;
    /**
     * Transform the properties of this type to binary and write it to an
     * BinaryEncoder.
     *
     * This is called when this Item is sent to a remote peer.
     *
     * @param {encoding.Encoder} encoder The encoder to write data to.
     * @param {number} offset
     */
    write(encoder: encoding.Encoder, offset: number): void;
}
/**
 * A lookup map for reading Item content.
 *
 * @type {Array<function(decoding.Decoder):AbstractContent>}
 */
export const contentRefs: Array<(arg0: decoding.Decoder) => AbstractContent>;
/**
 * Do not implement this class!
 */
export class AbstractContent {
    /**
     * @return {number}
     */
    getLength(): number;
    /**
     * @return {Array<any>}
     */
    getContent(): any[];
    /**
     * Should return false if this Item is some kind of meta information
     * (e.g. format information).
     *
     * * Whether this Item should be addressable via `yarray.get(i)`
     * * Whether this Item should be counted when computing yarray.length
     *
     * @return {boolean}
     */
    isCountable(): boolean;
    /**
     * @return {AbstractContent}
     */
    copy(): AbstractContent;
    /**
     * @param {number} offset
     * @return {AbstractContent}
     */
    splice(offset: number): AbstractContent;
    /**
     * @param {AbstractContent} right
     * @return {boolean}
     */
    mergeWith(right: AbstractContent): boolean;
    /**
     * @param {Transaction} transaction
     * @param {Item} item
     */
    integrate(transaction: Transaction, item: Item): void;
    /**
     * @param {Transaction} transaction
     */
    delete(transaction: Transaction): void;
    /**
     * @param {StructStore} store
     */
    gc(store: StructStore): void;
    /**
     * @param {encoding.Encoder} encoder
     * @param {number} offset
     */
    write(encoder: encoding.Encoder, offset: number): void;
    /**
     * @return {number}
     */
    getRef(): number;
}
/**
 * @private
 */
export class ItemRef extends AbstractStructRef {
    /**
     * @param {decoding.Decoder} decoder
     * @param {ID} id
     * @param {number} info
     */
    constructor(decoder: decoding.Decoder, id: ID, info: number);
    /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     */
    left: ID | null;
    /**
     * The item that was originally to the right of this item.
     * @type {ID | null}
     */
    right: ID | null;
    /**
     * If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
     * and we read the next string as parentYKey.
     * It indicates how we store/retrieve parent from `y.share`
     * @type {string|null}
     */
    parentYKey: string | null;
    /**
     * The parent type.
     * @type {ID | null}
     */
    parent: ID | null;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     */
    parentSub: String | null;
    /**
     * @type {AbstractContent}
     */
    content: AbstractContent;
    length: number;
    /**
     * @param {Transaction} transaction
     * @param {StructStore} store
     * @param {number} offset
     * @return {Item|GC}
     */
    toStruct(transaction: Transaction, store: StructStore, offset: number): GC | Item;
}
import { StructStore } from "../utils/StructStore.js";
import { ID } from "../utils/ID.js";
import { Transaction } from "../utils/Transaction.js";
import { AbstractStruct } from "./AbstractStruct.js";
import { AbstractType } from "../types/AbstractType.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import { AbstractStructRef } from "./AbstractStruct.js";
import { GC } from "./GC.js";
