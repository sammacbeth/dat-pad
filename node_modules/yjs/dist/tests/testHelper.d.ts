export * from "../src/internals.js";
export class TestYInstance extends Y.Doc {
    /**
     * @param {TestConnector} testConnector
     * @param {number} clientID
     */
    constructor(testConnector: TestConnector, clientID: number);
    userID: number;
    /**
     * @type {TestConnector}
     */
    tc: TestConnector;
    /**
     * @type {Map<TestYInstance, Array<Uint8Array>>}
     */
    receiving: Map<TestYInstance, Array<Uint8Array>>;
    /**
     * Disconnect from TestConnector.
     */
    disconnect(): void;
    /**
     * Append yourself to the list of known Y instances in testconnector.
     * Also initiate sync with all clients.
     */
    connect(): void;
    /**
     * Receive a message from another client. This message is only appended to the list of receiving messages.
     * TestConnector decides when this client actually reads this message.
     *
     * @param {Uint8Array} message
     * @param {TestYInstance} remoteClient
     */
    _receive(message: Uint8Array, remoteClient: TestYInstance): void;
}
/**
 * Keeps track of TestYInstances.
 *
 * The TestYInstances add/remove themselves from the list of connections maiained in this object.
 * I think it makes sense. Deal with it.
 */
export class TestConnector {
    /**
     * @param {prng.PRNG} gen
     */
    constructor(gen: prng.PRNG);
    /**
     * @type {Set<TestYInstance>}
     */
    allConns: Set<TestYInstance>;
    /**
     * @type {Set<TestYInstance>}
     */
    onlineConns: Set<TestYInstance>;
    /**
     * @type {prng.PRNG}
     */
    prng: prng.PRNG;
    /**
     * Create a new Y instance and add it to the list of connections
     * @param {number} clientID
     */
    createY(clientID: number): TestYInstance;
    /**
     * Choose random connection and flush a random message from a random sender.
     *
     * If this function was unable to flush a message, because there are no more messages to flush, it returns false. true otherwise.
     * @return {boolean}
     */
    flushRandomMessage(): boolean;
    /**
     * @return {boolean} True iff this function actually flushed something
     */
    flushAllMessages(): boolean;
    reconnectAll(): void;
    disconnectAll(): void;
    syncAll(): void;
    /**
     * @return {boolean} Whether it was possible to disconnect a randon connection.
     */
    disconnectRandom(): boolean;
    /**
     * @return {boolean} Whether it was possible to reconnect a random connection.
     */
    reconnectRandom(): boolean;
}
export function init<T>(tc: t.TestCase, { users }?: {
    users?: number | undefined;
}, initTestObject?: InitTestObjectCallback<T> | undefined): {
    testObjects: any[];
    testConnector: TestConnector;
    users: TestYInstance[];
    array0: Y.Array<any>;
    array1: Y.Array<any>;
    array2: Y.Array<any>;
    map0: Y.Map<any>;
    map1: Y.Map<any>;
    map2: Y.Map<any>;
    map3: Y.Map<any>;
    text0: Y.Text;
    text1: Y.Text;
    text2: Y.Text;
    xml0: Y.XmlElement;
    xml1: Y.XmlElement;
    xml2: Y.XmlElement;
};
export function compare(users: TestYInstance[]): void;
export function compareItemIDs(a: Y.Item | null, b: Y.Item | null): boolean;
export function compareStructStores(ss1: StructStore, ss2: StructStore): undefined;
export function compareDS(ds1: DeleteSet, ds2: DeleteSet): void;
export function applyRandomTests<T>(tc: t.TestCase, mods: ((arg0: Y.Doc, arg1: prng.PRNG, arg2: T) => void)[], iterations: number, initTestObject?: InitTestObjectCallback<T> | undefined): {
    testObjects: any[];
    testConnector: TestConnector;
    users: TestYInstance[];
    array0: Y.Array<any>;
    array1: Y.Array<any>;
    array2: Y.Array<any>;
    map0: Y.Map<any>;
    map1: Y.Map<any>;
    map2: Y.Map<any>;
    map3: Y.Map<any>;
    text0: Y.Text;
    text1: Y.Text;
    text2: Y.Text;
    xml0: Y.XmlElement;
    xml1: Y.XmlElement;
    xml2: Y.XmlElement;
};
export type InitTestObjectCallback<T> = (y: TestYInstance) => T;
import * as Y from "../src/index.js";
import * as prng from "lib0/prng";
import * as t from "lib0/testing";
import { StructStore } from "../src/utils/StructStore.js";
import { DeleteSet } from "../src/utils/DeleteSet.js";
