/**
 * Represents text in a Dom Element. In the future this type will also handle
 * simple formatting information like bold and italic.
 */
export class YXmlText extends YText {
    constructor(string?: string | undefined);
    _copy(): YXmlText;
    /**
     * Creates a Dom Element that mirrors this YXmlText.
     *
     * @param {Document} [_document=document] The document object (you must define
     *                                        this when calling this method in
     *                                        nodejs)
     * @param {Object<string, any>} [hooks] Optional property to customize how hooks
     *                                             are presented in the DOM
     * @param {any} [binding] You should not set this property. This is
     *                               used if DomBinding wants to create a
     *                               association to the created DOM type.
     * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
     *
     * @public
     */
    toDOM(_document?: Document | undefined, hooks?: {
        [x: string]: any;
    } | undefined, binding?: any): Text;
    toString(): any;
}
export function readYXmlText(decoder: decoding.Decoder): YXmlText;
import { YText } from "./YText.js";
import * as decoding from "lib0/decoding";
