export class StructStore {
    /**
     * @type {Map<number,Array<GC|Item>>}
     */
    clients: Map<number, Array<GC | Item>>;
    /**
     * Store incompleted struct reads here
     * `i` denotes to the next read operation
     * We could shift the array of refs instead, but shift is incredible
     * slow in Chrome for arrays with more than 100k elements
     * @see tryResumePendingStructRefs
     * @type {Map<number,{i:number,refs:Array<GCRef|ItemRef>}>}
     */
    pendingClientsStructRefs: Map<number, {
        i: number;
        refs: Array<GCRef | ItemRef>;
    }>;
    /**
     * Stack of pending structs waiting for struct dependencies
     * Maximum length of stack is structReaders.size
     * @type {Array<GCRef|ItemRef>}
     */
    pendingStack: Array<GCRef | ItemRef>;
    /**
     * @type {Array<decoding.Decoder>}
     */
    pendingDeleteReaders: Array<decoding.Decoder>;
}
export function getStateVector(store: StructStore): Map<number, number>;
export function getState(store: StructStore, client: number): number;
export function integretyCheck(store: StructStore): void;
export function addStruct(store: StructStore, struct: GC | Item): void;
export function findIndexSS(structs: any[], clock: number): number;
export function find(store: StructStore, id: ID): GC | Item;
export function getItem(store: StructStore, id: ID): Item;
export function findIndexCleanStart(transaction: Transaction, structs: (GC | Item)[], clock: number): number;
export function getItemCleanStart(transaction: Transaction, id: ID): Item;
export function getItemCleanEnd(transaction: Transaction, store: StructStore, id: ID): Item;
export function replaceStruct(store: StructStore, struct: GC | Item, newStruct: GC | Item): void;
export function iterateStructs(transaction: Transaction, structs: (GC | Item)[], clockStart: number, len: number, f: (arg0: GC | Item) => void): void;
import { GC } from "../structs/GC.js";
import { Item } from "../structs/Item.js";
import { GCRef } from "../structs/GC.js";
import { ItemRef } from "../structs/Item.js";
import * as decoding from "lib0/decoding";
import { ID } from "./ID.js";
import { Transaction } from "./Transaction.js";
