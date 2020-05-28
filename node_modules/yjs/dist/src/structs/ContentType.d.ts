/**
 * @type {Array<function(decoding.Decoder):AbstractType<any>>}
 * @private
 */
export const typeRefs: Array<(arg0: decoding.Decoder) => AbstractType<any>>;
export const YArrayRefID: 0;
export const YMapRefID: 1;
export const YTextRefID: 2;
export const YXmlElementRefID: 3;
export const YXmlFragmentRefID: 4;
export const YXmlHookRefID: 5;
export const YXmlTextRefID: 6;
/**
 * @private
 */
export class ContentType {
    /**
     * @param {AbstractType<YEvent>} type
     */
    constructor(type: AbstractType<YEvent>);
    /**
     * @type {AbstractType<any>}
     */
    type: AbstractType<any>;
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
     * @return {ContentType}
     */
    copy(): ContentType;
    /**
     * @param {number} offset
     * @return {ContentType}
     */
    splice(offset: number): ContentType;
    /**
     * @param {ContentType} right
     * @return {boolean}
     */
    mergeWith(right: ContentType): boolean;
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
export function readContentType(decoder: decoding.Decoder): ContentType;
import * as decoding from "lib0/decoding";
import { AbstractType } from "../types/AbstractType.js";
import { Transaction } from "../utils/Transaction.js";
import { Item } from "./Item.js";
import { StructStore } from "../utils/StructStore.js";
import * as encoding from "lib0/encoding";
import { YEvent } from "../utils/YEvent.js";
