export class Snapshot {
    /**
     * @param {DeleteSet} ds
     * @param {Map<number,number>} sv state map
     */
    constructor(ds: DeleteSet, sv: Map<number, number>);
    /**
     * @type {DeleteSet}
     */
    ds: DeleteSet;
    /**
     * State Map
     * @type {Map<number,number>}
     */
    sv: Map<number, number>;
}
export function equalSnapshots(snap1: Snapshot, snap2: Snapshot): boolean;
export function encodeSnapshot(snapshot: Snapshot): Uint8Array;
export function decodeSnapshot(buf: Uint8Array): Snapshot;
export function createSnapshot(ds: DeleteSet, sm: Map<number, number>): Snapshot;
export const emptySnapshot: Snapshot;
export function snapshot(doc: Doc): Snapshot;
export function isVisible(item: Item, snapshot: Snapshot | undefined): boolean;
export function splitSnapshotAffectedStructs(transaction: Transaction, snapshot: Snapshot): void;
import { DeleteSet } from "./DeleteSet.js";
import { Doc } from "./Doc.js";
import { Item } from "../structs/Item.js";
import { Transaction } from "./Transaction.js";
