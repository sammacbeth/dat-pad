/**
 * @template T
 * Event that describes the changes on a YMap.
 */
export class YMapEvent<T> extends YEvent {
    /**
     * @param {YMap<T>} ymap The YArray that changed.
     * @param {Transaction} transaction
     * @param {Set<any>} subs The keys that changed.
     */
    constructor(ymap: YMap<T>, transaction: Transaction, subs: Set<any>);
    keysChanged: Set<any>;
}
/**
 * @template T number|string|Object|Array|Uint8Array
 * A shared Map implementation.
 *
 * @extends AbstractType<YMapEvent<T>>
 * @implements {IterableIterator}
 */
export class YMap<T> extends AbstractType<YMapEvent<T>> {
    /**
     * @type {Map<string,any>?}
     * @private
     */
    _prelimContent: Map<string, any> | null;
    /**
     * Integrate this type into the Yjs instance.
     *
     * * Save this struct in the os
     * * This type is sent to other client
     * * Observer functions are fired
     *
     * @param {Doc} y The Yjs instance
     * @param {Item} item
     */
    _integrate(y: Doc, item: Item): void;
    _copy(): YMap<any>;
    /**
     * Transforms this Shared Type to a JSON object.
     *
     * @return {Object<string,T>}
     */
    toJSON(): {
        [x: string]: T;
    };
    /**
     * Returns the keys for each element in the YMap Type.
     *
     * @return {IterableIterator<string>}
     */
    keys(): IterableIterator<string>;
    /**
     * Returns the keys for each element in the YMap Type.
     *
     * @return {IterableIterator<string>}
     */
    values(): IterableIterator<string>;
    /**
     * Returns an Iterator of [key, value] pairs
     *
     * @return {IterableIterator<any>}
     */
    entries(): IterableIterator<any>;
    /**
     * Executes a provided function on once on overy key-value pair.
     *
     * @param {function(T,string,YMap<T>):void} f A function to execute on every element of this YArray.
     */
    forEach(f: (arg0: T, arg1: string, arg2: YMap<T>) => void): {
        [x: string]: T;
    };
    /**
     * @return {IterableIterator<T>}
     */
    "__@iterator"(): IterableIterator<T>;
    /**
     * Remove a specified element from this YMap.
     *
     * @param {string} key The key of the element to remove.
     */
    delete(key: string): void;
    /**
     * Adds or updates an element with a specified key and value.
     *
     * @param {string} key The key of the element to add to this YMap
     * @param {T} value The value of the element to add
     */
    set(key: string, value: T): T;
    /**
     * Returns a specified element from this YMap.
     *
     * @param {string} key
     * @return {T|undefined}
     */
    get(key: string): T | undefined;
    /**
     * Returns a boolean indicating whether the specified key exists or not.
     *
     * @param {string} key The key to test.
     * @return {boolean}
     */
    has(key: string): boolean;
}
export function readYMap(decoder: decoding.Decoder): YMap<any>;
import { YEvent } from "../utils/YEvent.js";
import { Transaction } from "../utils/Transaction.js";
import { AbstractType } from "./AbstractType.js";
import { Doc } from "../utils/Doc.js";
import { Item } from "../structs/Item.js";
import * as decoding from "lib0/decoding";
