/**
 * @private
 */
export class ContentString {
    /**
     * @param {string} str
     */
    constructor(str: string);
    /**
     * @type {string}
     */
    str: string;
    /**
     * @return {number}
     */
    getLength(): number;
    /**
     * @return {Array<any>}
     */
    getContent(): any[];
    /**
     * @return {boolean}
     */
    isCountable(): boolean;
    /**
     * @return {ContentString}
     */
    copy(): ContentString;
    /**
     * @param {number} offset
     * @return {ContentString}
     */
    splice(offset: number): ContentString;
    /**
     * @param {ContentString} right
     * @return {boolean}
     */
    mergeWith(right: ContentString): boolean;
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
export function readContentString(decoder: decoding.Decoder): ContentString;
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
