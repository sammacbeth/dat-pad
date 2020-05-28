export const structGCRefNumber: 0;
/**
 * @private
 */
export class GC extends AbstractStruct {
    /**
     * @param {ID} id
     * @param {number} length
     */
    constructor(id: ID, length: number);
    delete(): void;
    /**
     * @param {GC} right
     * @return {boolean}
     */
    mergeWith(right: GC): boolean;
    /**
     * @param {encoding.Encoder} encoder
     * @param {number} offset
     */
    write(encoder: encoding.Encoder, offset: number): void;
}
/**
 * @private
 */
export class GCRef extends AbstractStructRef {
    /**
     * @param {decoding.Decoder} decoder
     * @param {ID} id
     * @param {number} info
     */
    constructor(decoder: decoding.Decoder, id: ID, info: number);
    /**
     * @type {number}
     */
    length: number;
    /**
     * @param {Transaction} transaction
     * @param {StructStore} store
     * @param {number} offset
     * @return {GC}
     */
    toStruct(transaction: Transaction, store: StructStore, offset: number): GC;
    id: any;
}
import { AbstractStruct } from "./AbstractStruct.js";
import * as encoding from "lib0/encoding";
import { ID } from "../utils/ID.js";
import { AbstractStructRef } from "./AbstractStruct.js";
import { Transaction } from "../utils/Transaction.js";
import { StructStore } from "../utils/StructStore.js";
import * as decoding from "lib0/decoding";
