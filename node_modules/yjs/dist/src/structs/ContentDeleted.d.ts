export class ContentDeleted {
    /**
     * @param {number} len
     */
    constructor(len: number);
    len: number;
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
     * @return {ContentDeleted}
     */
    copy(): ContentDeleted;
    /**
     * @param {number} offset
     * @return {ContentDeleted}
     */
    splice(offset: number): ContentDeleted;
    /**
     * @param {ContentDeleted} right
     * @return {boolean}
     */
    mergeWith(right: ContentDeleted): boolean;
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
export function readContentDeleted(decoder: decoding.Decoder): ContentDeleted;
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
