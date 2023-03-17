/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.default.Reader, $Writer = $protobuf.default.Writer, $util = $protobuf.default.util;

// Exported root namespace
const $root = {};

export const tutorial = $root.tutorial = (() => {

    /**
     * Namespace tutorial.
     * @exports tutorial
     * @namespace
     */
    const tutorial = {};

    tutorial.Person = (function() {

        /**
         * Properties of a Person.
         * @memberof tutorial
         * @interface IPerson
         * @property {string|null} [name] Person name
         * @property {number|null} [id] Person id
         * @property {string|null} [email] Person email
         * @property {Array.<tutorial.Person.PhoneNumber>|null} [phones] Person phones
         */

        /**
         * Constructs a new Person.
         * @memberof tutorial
         * @classdesc Represents a Person.
         * @implements IPerson
         * @constructor
         * @param {tutorial.IPerson=} [p] Properties to set
         */
        function Person(p) {
            this.phones = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        /**
         * Person name.
         * @member {string} name
         * @memberof tutorial.Person
         * @instance
         */
        Person.prototype.name = "";

        /**
         * Person id.
         * @member {number} id
         * @memberof tutorial.Person
         * @instance
         */
        Person.prototype.id = 0;

        /**
         * Person email.
         * @member {string} email
         * @memberof tutorial.Person
         * @instance
         */
        Person.prototype.email = "";

        /**
         * Person phones.
         * @member {Array.<tutorial.Person.PhoneNumber>} phones
         * @memberof tutorial.Person
         * @instance
         */
        Person.prototype.phones = $util.emptyArray;

        /**
         * Creates a new Person instance using the specified properties.
         * @function create
         * @memberof tutorial.Person
         * @static
         * @param {tutorial.IPerson=} [properties] Properties to set
         * @returns {tutorial.Person} Person instance
         */
        Person.create = function create(properties) {
            return new Person(properties);
        };

        /**
         * Encodes the specified Person message. Does not implicitly {@link tutorial.Person.verify|verify} messages.
         * @function encode
         * @memberof tutorial.Person
         * @static
         * @param {tutorial.Person} m Person message or plain object to encode
         * @param {$protobuf.default.Writer} [w] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Person.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.name != null && Object.hasOwnProperty.call(m, "name"))
                w.uint32(10).string(m.name);
            if (m.id != null && Object.hasOwnProperty.call(m, "id"))
                w.uint32(16).int32(m.id);
            if (m.email != null && Object.hasOwnProperty.call(m, "email"))
                w.uint32(26).string(m.email);
            if (m.phones != null && m.phones.length) {
                for (var i = 0; i < m.phones.length; ++i)
                    $root.tutorial.Person.PhoneNumber.encode(m.phones[i], w.uint32(34).fork()).ldelim();
            }
            return w;
        };

        /**
         * Decodes a Person message from the specified reader or buffer.
         * @function decode
         * @memberof tutorial.Person
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} r Reader or buffer to decode from
         * @param {number} [l] Message length if known beforehand
         * @returns {tutorial.Person} Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Person.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.tutorial.Person();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1: {
                        m.name = r.string();
                        break;
                    }
                case 2: {
                        m.id = r.int32();
                        break;
                    }
                case 3: {
                        m.email = r.string();
                        break;
                    }
                case 4: {
                        if (!(m.phones && m.phones.length))
                            m.phones = [];
                        m.phones.push($root.tutorial.Person.PhoneNumber.decode(r, r.uint32()));
                        break;
                    }
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        /**
         * Gets the default type url for Person
         * @function getTypeUrl
         * @memberof tutorial.Person
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Person.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tutorial.Person";
        };

        /**
         * PhoneType enum.
         * @name tutorial.Person.PhoneType
         * @enum {number}
         * @property {number} MOBILE=0 MOBILE value
         * @property {number} HOME=1 HOME value
         * @property {number} WORK=2 WORK value
         */
        Person.PhoneType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MOBILE"] = 0;
            values[valuesById[1] = "HOME"] = 1;
            values[valuesById[2] = "WORK"] = 2;
            return values;
        })();

        Person.PhoneNumber = (function() {

            /**
             * Properties of a PhoneNumber.
             * @memberof tutorial.Person
             * @interface IPhoneNumber
             * @property {string|null} [number] PhoneNumber number
             * @property {tutorial.Person.PhoneType|null} [type] PhoneNumber type
             */

            /**
             * Constructs a new PhoneNumber.
             * @memberof tutorial.Person
             * @classdesc Represents a PhoneNumber.
             * @implements IPhoneNumber
             * @constructor
             * @param {tutorial.Person.IPhoneNumber=} [p] Properties to set
             */
            function PhoneNumber(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * PhoneNumber number.
             * @member {string} number
             * @memberof tutorial.Person.PhoneNumber
             * @instance
             */
            PhoneNumber.prototype.number = "";

            /**
             * PhoneNumber type.
             * @member {tutorial.Person.PhoneType} type
             * @memberof tutorial.Person.PhoneNumber
             * @instance
             */
            PhoneNumber.prototype.type = 0;

            /**
             * Creates a new PhoneNumber instance using the specified properties.
             * @function create
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {tutorial.Person.IPhoneNumber=} [properties] Properties to set
             * @returns {tutorial.Person.PhoneNumber} PhoneNumber instance
             */
            PhoneNumber.create = function create(properties) {
                return new PhoneNumber(properties);
            };

            /**
             * Encodes the specified PhoneNumber message. Does not implicitly {@link tutorial.Person.PhoneNumber.verify|verify} messages.
             * @function encode
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {tutorial.Person.PhoneNumber} m PhoneNumber message or plain object to encode
             * @param {$protobuf.default.Writer} [w] Writer to encode to
             * @returns {$protobuf.default.Writer} Writer
             */
            PhoneNumber.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.number != null && Object.hasOwnProperty.call(m, "number"))
                    w.uint32(10).string(m.number);
                if (m.type != null && Object.hasOwnProperty.call(m, "type"))
                    w.uint32(16).int32(m.type);
                return w;
            };

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer.
             * @function decode
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {$protobuf.default.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {tutorial.Person.PhoneNumber} PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
             */
            PhoneNumber.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.tutorial.Person.PhoneNumber();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1: {
                            m.number = r.string();
                            break;
                        }
                    case 2: {
                            m.type = r.int32();
                            break;
                        }
                    default:
                        r.skipType(t & 7);
                        break;
                    }
                }
                return m;
            };

            /**
             * Gets the default type url for PhoneNumber
             * @function getTypeUrl
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PhoneNumber.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/tutorial.Person.PhoneNumber";
            };

            return PhoneNumber;
        })();

        return Person;
    })();

    tutorial.AddressBook = (function() {

        /**
         * Properties of an AddressBook.
         * @memberof tutorial
         * @interface IAddressBook
         * @property {Array.<tutorial.Person>|null} [people] AddressBook people
         */

        /**
         * Constructs a new AddressBook.
         * @memberof tutorial
         * @classdesc Represents an AddressBook.
         * @implements IAddressBook
         * @constructor
         * @param {tutorial.IAddressBook=} [p] Properties to set
         */
        function AddressBook(p) {
            this.people = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        /**
         * AddressBook people.
         * @member {Array.<tutorial.Person>} people
         * @memberof tutorial.AddressBook
         * @instance
         */
        AddressBook.prototype.people = $util.emptyArray;

        /**
         * Creates a new AddressBook instance using the specified properties.
         * @function create
         * @memberof tutorial.AddressBook
         * @static
         * @param {tutorial.IAddressBook=} [properties] Properties to set
         * @returns {tutorial.AddressBook} AddressBook instance
         */
        AddressBook.create = function create(properties) {
            return new AddressBook(properties);
        };

        /**
         * Encodes the specified AddressBook message. Does not implicitly {@link tutorial.AddressBook.verify|verify} messages.
         * @function encode
         * @memberof tutorial.AddressBook
         * @static
         * @param {tutorial.AddressBook} m AddressBook message or plain object to encode
         * @param {$protobuf.default.Writer} [w] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        AddressBook.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.people != null && m.people.length) {
                for (var i = 0; i < m.people.length; ++i)
                    $root.tutorial.Person.encode(m.people[i], w.uint32(10).fork()).ldelim();
            }
            return w;
        };

        /**
         * Decodes an AddressBook message from the specified reader or buffer.
         * @function decode
         * @memberof tutorial.AddressBook
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} r Reader or buffer to decode from
         * @param {number} [l] Message length if known beforehand
         * @returns {tutorial.AddressBook} AddressBook
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        AddressBook.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.tutorial.AddressBook();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1: {
                        if (!(m.people && m.people.length))
                            m.people = [];
                        m.people.push($root.tutorial.Person.decode(r, r.uint32()));
                        break;
                    }
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        /**
         * Gets the default type url for AddressBook
         * @function getTypeUrl
         * @memberof tutorial.AddressBook
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AddressBook.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tutorial.AddressBook";
        };

        return AddressBook;
    })();

    tutorial.Package = (function() {

        /**
         * Properties of a Package.
         * @memberof tutorial
         * @interface IPackage
         * @property {number|null} [cmd] Package cmd
         * @property {Uint8Array|null} [data] Package data
         */

        /**
         * Constructs a new Package.
         * @memberof tutorial
         * @classdesc Represents a Package.
         * @implements IPackage
         * @constructor
         * @param {tutorial.IPackage=} [p] Properties to set
         */
        function Package(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        /**
         * Package cmd.
         * @member {number} cmd
         * @memberof tutorial.Package
         * @instance
         */
        Package.prototype.cmd = 0;

        /**
         * Package data.
         * @member {Uint8Array} data
         * @memberof tutorial.Package
         * @instance
         */
        Package.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new Package instance using the specified properties.
         * @function create
         * @memberof tutorial.Package
         * @static
         * @param {tutorial.IPackage=} [properties] Properties to set
         * @returns {tutorial.Package} Package instance
         */
        Package.create = function create(properties) {
            return new Package(properties);
        };

        /**
         * Encodes the specified Package message. Does not implicitly {@link tutorial.Package.verify|verify} messages.
         * @function encode
         * @memberof tutorial.Package
         * @static
         * @param {tutorial.Package} m Package message or plain object to encode
         * @param {$protobuf.default.Writer} [w] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Package.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.cmd != null && Object.hasOwnProperty.call(m, "cmd"))
                w.uint32(8).uint32(m.cmd);
            if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                w.uint32(18).bytes(m.data);
            return w;
        };

        /**
         * Decodes a Package message from the specified reader or buffer.
         * @function decode
         * @memberof tutorial.Package
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} r Reader or buffer to decode from
         * @param {number} [l] Message length if known beforehand
         * @returns {tutorial.Package} Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Package.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.tutorial.Package();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1: {
                        m.cmd = r.uint32();
                        break;
                    }
                case 2: {
                        m.data = r.bytes();
                        break;
                    }
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        /**
         * Gets the default type url for Package
         * @function getTypeUrl
         * @memberof tutorial.Package
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Package.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tutorial.Package";
        };

        return Package;
    })();

    return tutorial;
})();

export const test = $root.test = (() => {

    /**
     * Namespace test.
     * @exports test
     * @namespace
     */
    const test = {};

    test.Hero = (function() {

        /**
         * Properties of a Hero.
         * @memberof test
         * @interface IHero
         * @property {string|null} [name] Hero name
         * @property {number|null} [id] Hero id
         * @property {number|null} [age] Hero age
         * @property {Array.<string>|null} [skills] Hero skills
         */

        /**
         * Constructs a new Hero.
         * @memberof test
         * @classdesc Represents a Hero.
         * @implements IHero
         * @constructor
         * @param {test.IHero=} [p] Properties to set
         */
        function Hero(p) {
            this.skills = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        /**
         * Hero name.
         * @member {string} name
         * @memberof test.Hero
         * @instance
         */
        Hero.prototype.name = "";

        /**
         * Hero id.
         * @member {number} id
         * @memberof test.Hero
         * @instance
         */
        Hero.prototype.id = 0;

        /**
         * Hero age.
         * @member {number} age
         * @memberof test.Hero
         * @instance
         */
        Hero.prototype.age = 0;

        /**
         * Hero skills.
         * @member {Array.<string>} skills
         * @memberof test.Hero
         * @instance
         */
        Hero.prototype.skills = $util.emptyArray;

        /**
         * Creates a new Hero instance using the specified properties.
         * @function create
         * @memberof test.Hero
         * @static
         * @param {test.IHero=} [properties] Properties to set
         * @returns {test.Hero} Hero instance
         */
        Hero.create = function create(properties) {
            return new Hero(properties);
        };

        /**
         * Encodes the specified Hero message. Does not implicitly {@link test.Hero.verify|verify} messages.
         * @function encode
         * @memberof test.Hero
         * @static
         * @param {test.Hero} m Hero message or plain object to encode
         * @param {$protobuf.default.Writer} [w] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Hero.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.name != null && Object.hasOwnProperty.call(m, "name"))
                w.uint32(10).string(m.name);
            if (m.id != null && Object.hasOwnProperty.call(m, "id"))
                w.uint32(16).int32(m.id);
            if (m.age != null && Object.hasOwnProperty.call(m, "age"))
                w.uint32(24).int32(m.age);
            if (m.skills != null && m.skills.length) {
                for (var i = 0; i < m.skills.length; ++i)
                    w.uint32(34).string(m.skills[i]);
            }
            return w;
        };

        /**
         * Decodes a Hero message from the specified reader or buffer.
         * @function decode
         * @memberof test.Hero
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} r Reader or buffer to decode from
         * @param {number} [l] Message length if known beforehand
         * @returns {test.Hero} Hero
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Hero.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.test.Hero();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1: {
                        m.name = r.string();
                        break;
                    }
                case 2: {
                        m.id = r.int32();
                        break;
                    }
                case 3: {
                        m.age = r.int32();
                        break;
                    }
                case 4: {
                        if (!(m.skills && m.skills.length))
                            m.skills = [];
                        m.skills.push(r.string());
                        break;
                    }
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        /**
         * Gets the default type url for Hero
         * @function getTypeUrl
         * @memberof test.Hero
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Hero.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/test.Hero";
        };

        return Hero;
    })();

    return test;
})();

export { $root as default };
