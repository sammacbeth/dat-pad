/**
 * @private
 */
export class ContentJSON {
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
     * @return {ContentJSON}
     */
    copy(): ContentJSON;
    /**
     * @param {number} offset
     * @return {ContentJSON}
     */
    splice(offset: number): ContentJSON;
    /**
     * @param {ContentJSON} right
     * @return {boolean}
     */
    mergeWith(right: ContentJSON): boolean;
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
export function readContentJSON(decoder: decoding.Decoder): ContentJSON;
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
