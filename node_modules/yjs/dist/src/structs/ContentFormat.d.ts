/**
 * @private
 */
export class ContentFormat {
    /**
     * @param {string} key
     * @param {Object} value
     */
    constructor(key: string, value: Object);
    key: string;
    value: Object;
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
     * @return {ContentFormat}
     */
    copy(): ContentFormat;
    /**
     * @param {number} offset
     * @return {ContentFormat}
     */
    splice(offset: number): ContentFormat;
    /**
     * @param {ContentFormat} right
     * @return {boolean}
     */
    mergeWith(right: ContentFormat): boolean;
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
export function readContentFormat(decoder: decoding.Decoder): ContentFormat;
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
