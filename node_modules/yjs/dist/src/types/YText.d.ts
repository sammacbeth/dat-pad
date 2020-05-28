export class ItemListPosition {
    /**
     * @param {Item|null} left
     * @param {Item|null} right
     */
    constructor(left: Item | null, right: Item | null);
    left: Item | null;
    right: Item | null;
}
export class ItemTextListPosition extends ItemListPosition {
    /**
     * @param {Item|null} left
     * @param {Item|null} right
     * @param {Map<string,any>} currentAttributes
     */
    constructor(left: Item | null, right: Item | null, currentAttributes: Map<string, any>);
    currentAttributes: Map<string, any>;
}
export class ItemInsertionResult extends ItemListPosition {
    /**
     * @param {Item|null} left
     * @param {Item|null} right
     * @param {Map<string,any>} negatedAttributes
     */
    constructor(left: Item | null, right: Item | null, negatedAttributes: Map<string, any>);
    negatedAttributes: Map<string, any>;
}
/**
 * The Quill Delta format represents changes on a text document with
 * formatting information. For mor information visit {@link https://quilljs.com/docs/delta/|Quill Delta}
 *
 * @example
 *   {
 *     ops: [
 *       { insert: 'Gandalf', attributes: { bold: true } },
 *       { insert: ' the ' },
 *       { insert: 'Grey', attributes: { color: '#cccccc' } }
 *     ]
 *   }
 *
 */
/**
  * Attributes that can be assigned to a selection of text.
  *
  * @example
  *   {
  *     bold: true,
  *     font-size: '40px'
  *   }
  *
  * @typedef {Object} TextAttributes
  */
/**
 * @typedef {Object} DeltaItem
 * @property {number|undefined} DeltaItem.delete
 * @property {number|undefined} DeltaItem.retain
 * @property {string|undefined} DeltaItem.string
 * @property {Object<string,any>} DeltaItem.attributes
 */
/**
 * Event that describes the changes on a YText type.
 */
export class YTextEvent extends YEvent {
    /**
     * @param {YText} ytext
     * @param {Transaction} transaction
     */
    constructor(ytext: YText, transaction: Transaction);
    /**
     * @type {Array<DeltaItem>|null}
     */
    _delta: Array<DeltaItem> | null;
    /**
     * Compute the changes in the delta format.
     * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
     *
     * @type {Array<DeltaItem>}
     *
     * @public
     */
    get delta(): DeltaItem[];
}
/**
 * Type that represents text with formatting information.
 *
 * This type replaces y-richtext as this implementation is able to handle
 * block formats (format information on a paragraph), embeds (complex elements
 * like pictures and videos), and text formats (**bold**, *italic*).
 *
 * @extends AbstractType<YTextEvent>
 */
export class YText extends AbstractType<YTextEvent> {
    /**
     * @param {String} [string] The initial value of the YText.
     */
    constructor(string?: string | undefined);
    /**
     * Array of pending operations on this type
     * @type {Array<function():void>?}
     */
    _pending: Array<() => void> | null;
    /**
     * Number of characters of this text type.
     *
     * @type {number}
     */
    get length(): number;
    /**
     * @param {Doc} y
     * @param {Item} item
     */
    _integrate(y: Doc, item: Item): void;
    _copy(): YText;
    /**
     * Returns the unformatted string representation of this YText type.
     *
     * @return {string}
     * @public
     */
    toJSON(): string;
    /**
     * Apply a {@link Delta} on this shared YText type.
     *
     * @param {any} delta The changes to apply on this element.
     *
     * @public
     */
    applyDelta(delta: any): void;
    /**
     * Returns the Delta representation of this YText type.
     *
     * @param {Snapshot} [snapshot]
     * @param {Snapshot} [prevSnapshot]
     * @param {function('removed' | 'added', ID):any} [computeYChange]
     * @return {any} The Delta representation of this type.
     *
     * @public
     */
    toDelta(snapshot?: Snapshot | undefined, prevSnapshot?: Snapshot | undefined, computeYChange?: ((arg0: "removed" | "added", arg1: ID) => any) | undefined): any;
    /**
     * Insert text at a given index.
     *
     * @param {number} index The index at which to start inserting.
     * @param {String} text The text to insert at the specified position.
     * @param {TextAttributes} [attributes] Optionally define some formatting
     *                                    information to apply on the inserted
     *                                    Text.
     * @public
     */
    insert(index: number, text: string, attributes?: Object | undefined): void;
    /**
     * Inserts an embed at a index.
     *
     * @param {number} index The index to insert the embed at.
     * @param {Object} embed The Object that represents the embed.
     * @param {TextAttributes} attributes Attribute information to apply on the
     *                                    embed
     *
     * @public
     */
    insertEmbed(index: number, embed: Object, attributes?: Object): void;
    /**
     * Deletes text starting from an index.
     *
     * @param {number} index Index at which to start deleting.
     * @param {number} length The number of characters to remove. Defaults to 1.
     *
     * @public
     */
    delete(index: number, length: number): void;
    /**
     * Assigns properties to a range of text.
     *
     * @param {number} index The position where to start formatting.
     * @param {number} length The amount of characters to assign properties to.
     * @param {TextAttributes} attributes Attribute information to apply on the
     *                                    text.
     *
     * @public
     */
    format(index: number, length: number, attributes: Object): void;
}
export function readYText(decoder: decoding.Decoder): YText;
/**
 * Attributes that can be assigned to a selection of text.
 */
export type TextAttributes = Object;
export type DeltaItem = {
    delete: number | undefined;
    retain: number | undefined;
    string: string | undefined;
    attributes: {
        [x: string]: any;
    };
};
import { Item } from "../structs/Item.js";
import { YEvent } from "../utils/YEvent.js";
import { Transaction } from "../utils/Transaction.js";
import { AbstractType } from "./AbstractType.js";
import { Doc } from "../utils/Doc.js";
import { Snapshot } from "../utils/Snapshot.js";
import { ID } from "../utils/ID.js";
import * as decoding from "lib0/decoding";
