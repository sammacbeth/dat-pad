export class ContentBinary {
    /**
     * @param {Uint8Array} content
     */
    constructor(content: Uint8Array);
    content: Uint8Array;
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
     * @return {ContentBinary}
     */
    copy(): ContentBinary;
    /**
     * @param {number} offset
     * @return {ContentBinary}
     */
    splice(offset: number): ContentBinary;
    /**
     * @param {ContentBinary} right
     * @return {boolean}
     */
    mergeWith(right: ContentBinary): boolean;
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
export function readContentBinary(decoder: decoding.Decoder): ContentBinary;
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
