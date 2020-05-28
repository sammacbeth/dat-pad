/**
 * A relative position is based on the Yjs model and is not affected by document changes.
 * E.g. If you place a relative position before a certain character, it will always point to this character.
 * If you place a relative position at the end of a type, it will always point to the end of the type.
 *
 * A numeric position is often unsuited for user selections, because it does not change when content is inserted
 * before or after.
 *
 * ```Insert(0, 'x')('a|bc') = 'xa|bc'``` Where | is the relative position.
 *
 * One of the properties must be defined.
 *
 * @example
 *   // Current cursor position is at position 10
 *   const relativePosition = createRelativePositionFromIndex(yText, 10)
 *   // modify yText
 *   yText.insert(0, 'abc')
 *   yText.delete(3, 10)
 *   // Compute the cursor position
 *   const absolutePosition = createAbsolutePositionFromRelativePosition(y, relativePosition)
 *   absolutePosition.type === yText // => true
 *   console.log('cursor location is ' + absolutePosition.index) // => cursor location is 3
 *
 */
export class RelativePosition {
    /**
     * @param {ID|null} type
     * @param {string|null} tname
     * @param {ID|null} item
     */
    constructor(type: ID | null, tname: string | null, item: ID | null);
    /**
     * @type {ID|null}
     */
    type: ID | null;
    /**
     * @type {string|null}
     */
    tname: string | null;
    /**
     * @type {ID | null}
     */
    item: ID | null;
}
export function createRelativePositionFromJSON(json: any): RelativePosition;
export class AbsolutePosition {
    /**
     * @param {AbstractType<any>} type
     * @param {number} index
     */
    constructor(type: AbstractType<any>, index: number);
    /**
     * @type {AbstractType<any>}
     */
    type: AbstractType<any>;
    /**
     * @type {number}
     */
    index: number;
}
export function createAbsolutePosition(type: AbstractType<any>, index: number): AbsolutePosition;
export function createRelativePosition(type: AbstractType<any>, item: ID | null): RelativePosition;
export function createRelativePositionFromTypeIndex(type: AbstractType<any>, index: number): RelativePosition;
export function writeRelativePosition(encoder: encoding.Encoder, rpos: RelativePosition): encoding.Encoder;
export function encodeRelativePosition(rpos: RelativePosition): Uint8Array;
export function readRelativePosition(decoder: decoding.Decoder): RelativePosition | null;
export function decodeRelativePosition(uint8Array: Uint8Array): RelativePosition | null;
export function createAbsolutePositionFromRelativePosition(rpos: RelativePosition, doc: Doc): AbsolutePosition | null;
export function compareRelativePositions(a: RelativePosition | null, b: RelativePosition | null): boolean;
import { ID } from "./ID.js";
import { AbstractType } from "../types/AbstractType.js";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import { Doc } from "./Doc.js";
