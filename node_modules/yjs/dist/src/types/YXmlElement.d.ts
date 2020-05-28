/**
 * An YXmlElement imitates the behavior of a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}.
 *
 * * An YXmlElement has attributes (key value pairs)
 * * An YXmlElement has childElements that must inherit from YXmlElement
 */
export class YXmlElement extends YXmlFragment {
    constructor(nodeName?: string);
    nodeName: string;
    /**
     * @type {Map<string, any>|null}
     */
    _prelimAttrs: Map<string, any> | null;
    /**
     * Creates an Item with the same effect as this Item (without position effect)
     *
     * @return {YXmlElement}
     */
    _copy(): YXmlElement;
    /**
     * Removes an attribute from this YXmlElement.
     *
     * @param {String} attributeName The attribute name that is to be removed.
     *
     * @public
     */
    removeAttribute(attributeName: string): void;
    /**
     * Sets or updates an attribute.
     *
     * @param {String} attributeName The attribute name that is to be set.
     * @param {String} attributeValue The attribute value that is to be set.
     *
     * @public
     */
    setAttribute(attributeName: string, attributeValue: string): void;
    /**
     * Returns an attribute value that belongs to the attribute name.
     *
     * @param {String} attributeName The attribute name that identifies the
     *                               queried value.
     * @return {String} The queried attribute value.
     *
     * @public
     */
    getAttribute(attributeName: string): string;
    /**
     * Returns all attribute name/value pairs in a JSON Object.
     *
     * @param {Snapshot} [snapshot]
     * @return {Object<string, any>} A JSON Object that describes the attributes.
     *
     * @public
     */
    getAttributes(snapshot?: Snapshot | undefined): {
        [x: string]: any;
    };
}
export function readYXmlElement(decoder: decoding.Decoder): YXmlElement;
import { YXmlFragment } from "./YXmlFragment.js";
import { Snapshot } from "../utils/Snapshot.js";
import * as decoding from "lib0/decoding";
