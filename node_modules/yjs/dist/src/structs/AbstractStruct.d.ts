export class AbstractStruct {
    /**
     * @param {ID} id
     * @param {number} length
     */
    constructor(id: ID, length: number);
    /**
     * The uniqe identifier of this struct.
     * @type {ID}
     * @readonly
     */
    id: ID;
    length: number;
    deleted: boolean;
    /**
     * Merge this struct with the item to the right.
     * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
     * Also this method does *not* remove right from StructStore!
     * @param {AbstractStruct} right
     * @return {boolean} wether this merged with right
     */
    mergeWith(right: AbstractStruct): boolean;
    /**
     * @param {encoding.Encoder} encoder The encoder to write data to.
     * @param {number} offset
     * @param {number} encodingRef
     */
    write(encoder: encoding.Encoder, offset: number, encodingRef: number): void;
    /**
     * @param {Transaction} transaction
     */
    integrate(transaction: Transaction): void;
}
export class AbstractStructRef {
    /**
     * @param {ID} id
     */
    constructor(id: ID);
    /**
     * @type {Array<ID>}
     */
    _missing: Array<ID>;
    /**
     * The uniqe identifier of this type.
     * @type {ID}
     */
    id: ID;
    /**
     * @param {Transaction} transaction
     * @return {Array<ID|null>}
     */
    getMissing(transaction: Transaction): (ID | null)[];
    /**
     * @param {Transaction} transaction
     * @param {StructStore} store
     * @param {number} offset
     * @return {AbstractStruct}
     */
    toStruct(transaction: Transaction, store: StructStore, offset: number): AbstractStruct;
}
import { ID } from "../utils/ID.js";
import * as encoding from "lib0/encoding";
import { Transaction } from "../utils/Transaction.js";
import { StructStore } from "../utils/StructStore.js";
