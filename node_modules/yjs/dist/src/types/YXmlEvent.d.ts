/**
 * An Event that describes changes on a YXml Element or Yxml Fragment
 */
export class YXmlEvent extends YEvent {
    /**
     * @param {YXmlElement|YXmlFragment} target The target on which the event is created.
     * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
     *                   child list changed.
     * @param {Transaction} transaction The transaction instance with wich the
     *                                  change was created.
     */
    constructor(target: YXmlFragment | YXmlElement, subs: Set<string | null>, transaction: Transaction);
    /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */
    childListChanged: Boolean;
    /**
     * Set of all changed attributes.
     * @type {Set<string|null>}
     */
    attributesChanged: Set<string | null>;
}
import { YEvent } from "../utils/YEvent.js";
import { YXmlFragment } from "./YXmlFragment.js";
import { YXmlElement } from "./YXmlElement.js";
import { Transaction } from "../utils/Transaction.js";
