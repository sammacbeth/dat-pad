export class ContentAny {
    /**
     * @param {Array<any>} arr
     */
    constructor(arr: any[]);
    /**
     * @type {Array<any>}
     */
    arr: Array<any>;
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
     * @return {ContentAny}
     */
    copy(): ContentAny;
    /**
     * @param {number} offset
     * @return {ContentAny}
     */
    splice(offset: number): ContentAny;
    /**
     * @param {ContentAny} right
     * @return {boolean}
     */
    mergeWith(right: ContentAny): boolean;
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
export function readContentAny(decoder: decoding.Decoder): ContentAny;
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
