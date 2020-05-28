/**
 * @private
 */
export class ContentEmbed {
    /**
     * @param {Object} embed
     */
    constructor(embed: Object);
    embed: Object;
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
     * @return {ContentEmbed}
     */
    copy(): ContentEmbed;
    /**
     * @param {number} offset
     * @return {ContentEmbed}
     */
    splice(offset: number): ContentEmbed;
    /**
     * @param {ContentEmbed} right
     * @return {boolean}
     */
    mergeWith(right: ContentEmbed): boolean;
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
export function readContentEmbed(decoder: decoding.Decoder): ContentEmbed;
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
