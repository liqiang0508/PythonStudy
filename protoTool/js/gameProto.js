/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("./protobuf");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.tutorial = (function() {

    /**
     * Namespace tutorial.
     * @exports tutorial
     * @namespace
     */
    var tutorial = {};

    tutorial.Person = (function() {

        /**
         * Properties of a Person.
         * @memberof tutorial
         * @interface IPerson
         * @property {string|null} [name] Person name
         * @property {number|null} [id] Person id
         * @property {string|null} [email] Person email
         * @property {Array.<tutorial.Person.IPhoneNumber>|null} [phones] Person phones
         */

        /**
         * Constructs a new Person.
         * @memberof tutorial
         * @classdesc Represents a Person.
         * @implements IPerson
         * @constructor
         * @param {tutorial.IPerson=} [properties] Properties to set
         */
        function Person(properties) {
            this.phones = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
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
         * @member {Array.<tutorial.Person.IPhoneNumber>} phones
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
         * @param {tutorial.IPerson} message Person message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Person.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
            if (message.phones != null && message.phones.length)
                for (var i = 0; i < message.phones.length; ++i)
                    $root.tutorial.Person.PhoneNumber.encode(message.phones[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Person message, length delimited. Does not implicitly {@link tutorial.Person.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tutorial.Person
         * @static
         * @param {tutorial.IPerson} message Person message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Person.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Person message from the specified reader or buffer.
         * @function decode
         * @memberof tutorial.Person
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tutorial.Person} Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Person.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tutorial.Person();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                case 3:
                    message.email = reader.string();
                    break;
                case 4:
                    if (!(message.phones && message.phones.length))
                        message.phones = [];
                    message.phones.push($root.tutorial.Person.PhoneNumber.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Person message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tutorial.Person
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tutorial.Person} Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Person.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Person message.
         * @function verify
         * @memberof tutorial.Person
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Person.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.phones != null && message.hasOwnProperty("phones")) {
                if (!Array.isArray(message.phones))
                    return "phones: array expected";
                for (var i = 0; i < message.phones.length; ++i) {
                    var error = $root.tutorial.Person.PhoneNumber.verify(message.phones[i]);
                    if (error)
                        return "phones." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Person message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tutorial.Person
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tutorial.Person} Person
         */
        Person.fromObject = function fromObject(object) {
            if (object instanceof $root.tutorial.Person)
                return object;
            var message = new $root.tutorial.Person();
            if (object.name != null)
                message.name = String(object.name);
            if (object.id != null)
                message.id = object.id | 0;
            if (object.email != null)
                message.email = String(object.email);
            if (object.phones) {
                if (!Array.isArray(object.phones))
                    throw TypeError(".tutorial.Person.phones: array expected");
                message.phones = [];
                for (var i = 0; i < object.phones.length; ++i) {
                    if (typeof object.phones[i] !== "object")
                        throw TypeError(".tutorial.Person.phones: object expected");
                    message.phones[i] = $root.tutorial.Person.PhoneNumber.fromObject(object.phones[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Person message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tutorial.Person
         * @static
         * @param {tutorial.Person} message Person
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Person.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.phones = [];
            if (options.defaults) {
                object.name = "";
                object.id = 0;
                object.email = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.phones && message.phones.length) {
                object.phones = [];
                for (var j = 0; j < message.phones.length; ++j)
                    object.phones[j] = $root.tutorial.Person.PhoneNumber.toObject(message.phones[j], options);
            }
            return object;
        };

        /**
         * Converts this Person to JSON.
         * @function toJSON
         * @memberof tutorial.Person
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Person.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
            var valuesById = {}, values = Object.create(valuesById);
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
             * @param {tutorial.Person.IPhoneNumber=} [properties] Properties to set
             */
            function PhoneNumber(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
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
             * @param {tutorial.Person.IPhoneNumber} message PhoneNumber message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PhoneNumber.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.number != null && Object.hasOwnProperty.call(message, "number"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.number);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                return writer;
            };

            /**
             * Encodes the specified PhoneNumber message, length delimited. Does not implicitly {@link tutorial.Person.PhoneNumber.verify|verify} messages.
             * @function encodeDelimited
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {tutorial.Person.IPhoneNumber} message PhoneNumber message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PhoneNumber.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer.
             * @function decode
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tutorial.Person.PhoneNumber} PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PhoneNumber.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tutorial.Person.PhoneNumber();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.number = reader.string();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {tutorial.Person.PhoneNumber} PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PhoneNumber.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PhoneNumber message.
             * @function verify
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PhoneNumber.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.number != null && message.hasOwnProperty("number"))
                    if (!$util.isString(message.number))
                        return "number: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };

            /**
             * Creates a PhoneNumber message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tutorial.Person.PhoneNumber} PhoneNumber
             */
            PhoneNumber.fromObject = function fromObject(object) {
                if (object instanceof $root.tutorial.Person.PhoneNumber)
                    return object;
                var message = new $root.tutorial.Person.PhoneNumber();
                if (object.number != null)
                    message.number = String(object.number);
                switch (object.type) {
                case "MOBILE":
                case 0:
                    message.type = 0;
                    break;
                case "HOME":
                case 1:
                    message.type = 1;
                    break;
                case "WORK":
                case 2:
                    message.type = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a PhoneNumber message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tutorial.Person.PhoneNumber
             * @static
             * @param {tutorial.Person.PhoneNumber} message PhoneNumber
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PhoneNumber.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.number = "";
                    object.type = options.enums === String ? "MOBILE" : 0;
                }
                if (message.number != null && message.hasOwnProperty("number"))
                    object.number = message.number;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.tutorial.Person.PhoneType[message.type] : message.type;
                return object;
            };

            /**
             * Converts this PhoneNumber to JSON.
             * @function toJSON
             * @memberof tutorial.Person.PhoneNumber
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PhoneNumber.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
         * @property {Array.<tutorial.IPerson>|null} [people] AddressBook people
         */

        /**
         * Constructs a new AddressBook.
         * @memberof tutorial
         * @classdesc Represents an AddressBook.
         * @implements IAddressBook
         * @constructor
         * @param {tutorial.IAddressBook=} [properties] Properties to set
         */
        function AddressBook(properties) {
            this.people = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddressBook people.
         * @member {Array.<tutorial.IPerson>} people
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
         * @param {tutorial.IAddressBook} message AddressBook message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddressBook.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.people != null && message.people.length)
                for (var i = 0; i < message.people.length; ++i)
                    $root.tutorial.Person.encode(message.people[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AddressBook message, length delimited. Does not implicitly {@link tutorial.AddressBook.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tutorial.AddressBook
         * @static
         * @param {tutorial.IAddressBook} message AddressBook message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddressBook.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddressBook message from the specified reader or buffer.
         * @function decode
         * @memberof tutorial.AddressBook
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tutorial.AddressBook} AddressBook
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddressBook.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tutorial.AddressBook();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.people && message.people.length))
                        message.people = [];
                    message.people.push($root.tutorial.Person.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddressBook message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tutorial.AddressBook
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tutorial.AddressBook} AddressBook
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddressBook.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddressBook message.
         * @function verify
         * @memberof tutorial.AddressBook
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddressBook.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.people != null && message.hasOwnProperty("people")) {
                if (!Array.isArray(message.people))
                    return "people: array expected";
                for (var i = 0; i < message.people.length; ++i) {
                    var error = $root.tutorial.Person.verify(message.people[i]);
                    if (error)
                        return "people." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AddressBook message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tutorial.AddressBook
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tutorial.AddressBook} AddressBook
         */
        AddressBook.fromObject = function fromObject(object) {
            if (object instanceof $root.tutorial.AddressBook)
                return object;
            var message = new $root.tutorial.AddressBook();
            if (object.people) {
                if (!Array.isArray(object.people))
                    throw TypeError(".tutorial.AddressBook.people: array expected");
                message.people = [];
                for (var i = 0; i < object.people.length; ++i) {
                    if (typeof object.people[i] !== "object")
                        throw TypeError(".tutorial.AddressBook.people: object expected");
                    message.people[i] = $root.tutorial.Person.fromObject(object.people[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AddressBook message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tutorial.AddressBook
         * @static
         * @param {tutorial.AddressBook} message AddressBook
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddressBook.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.people = [];
            if (message.people && message.people.length) {
                object.people = [];
                for (var j = 0; j < message.people.length; ++j)
                    object.people[j] = $root.tutorial.Person.toObject(message.people[j], options);
            }
            return object;
        };

        /**
         * Converts this AddressBook to JSON.
         * @function toJSON
         * @memberof tutorial.AddressBook
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddressBook.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AddressBook;
    })();

    tutorial.Package = (function() {

        /**
         * Properties of a Package.
         * @memberof tutorial
         * @interface IPackage
         * @property {number|null} [id] Package id
         * @property {Uint8Array|null} [data] Package data
         */

        /**
         * Constructs a new Package.
         * @memberof tutorial
         * @classdesc Represents a Package.
         * @implements IPackage
         * @constructor
         * @param {tutorial.IPackage=} [properties] Properties to set
         */
        function Package(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Package id.
         * @member {number} id
         * @memberof tutorial.Package
         * @instance
         */
        Package.prototype.id = 0;

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
         * @param {tutorial.IPackage} message Package message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Package.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified Package message, length delimited. Does not implicitly {@link tutorial.Package.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tutorial.Package
         * @static
         * @param {tutorial.IPackage} message Package message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Package.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Package message from the specified reader or buffer.
         * @function decode
         * @memberof tutorial.Package
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tutorial.Package} Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Package.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tutorial.Package();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Package message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tutorial.Package
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tutorial.Package} Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Package.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Package message.
         * @function verify
         * @memberof tutorial.Package
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Package.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a Package message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tutorial.Package
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tutorial.Package} Package
         */
        Package.fromObject = function fromObject(object) {
            if (object instanceof $root.tutorial.Package)
                return object;
            var message = new $root.tutorial.Package();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a Package message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tutorial.Package
         * @static
         * @param {tutorial.Package} message Package
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Package.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this Package to JSON.
         * @function toJSON
         * @memberof tutorial.Package
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Package.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Package;
    })();

    return tutorial;
})();

$root.test = (function() {

    /**
     * Namespace test.
     * @exports test
     * @namespace
     */
    var test = {};

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
         * @param {test.IHero=} [properties] Properties to set
         */
        function Hero(properties) {
            this.skills = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
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
         * @param {test.IHero} message Hero message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hero.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.age != null && Object.hasOwnProperty.call(message, "age"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.age);
            if (message.skills != null && message.skills.length)
                for (var i = 0; i < message.skills.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.skills[i]);
            return writer;
        };

        /**
         * Encodes the specified Hero message, length delimited. Does not implicitly {@link test.Hero.verify|verify} messages.
         * @function encodeDelimited
         * @memberof test.Hero
         * @static
         * @param {test.IHero} message Hero message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hero.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Hero message from the specified reader or buffer.
         * @function decode
         * @memberof test.Hero
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {test.Hero} Hero
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hero.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.test.Hero();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                case 3:
                    message.age = reader.int32();
                    break;
                case 4:
                    if (!(message.skills && message.skills.length))
                        message.skills = [];
                    message.skills.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Hero message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof test.Hero
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {test.Hero} Hero
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hero.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Hero message.
         * @function verify
         * @memberof test.Hero
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hero.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.age != null && message.hasOwnProperty("age"))
                if (!$util.isInteger(message.age))
                    return "age: integer expected";
            if (message.skills != null && message.hasOwnProperty("skills")) {
                if (!Array.isArray(message.skills))
                    return "skills: array expected";
                for (var i = 0; i < message.skills.length; ++i)
                    if (!$util.isString(message.skills[i]))
                        return "skills: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Hero message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof test.Hero
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {test.Hero} Hero
         */
        Hero.fromObject = function fromObject(object) {
            if (object instanceof $root.test.Hero)
                return object;
            var message = new $root.test.Hero();
            if (object.name != null)
                message.name = String(object.name);
            if (object.id != null)
                message.id = object.id | 0;
            if (object.age != null)
                message.age = object.age | 0;
            if (object.skills) {
                if (!Array.isArray(object.skills))
                    throw TypeError(".test.Hero.skills: array expected");
                message.skills = [];
                for (var i = 0; i < object.skills.length; ++i)
                    message.skills[i] = String(object.skills[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Hero message. Also converts values to other types if specified.
         * @function toObject
         * @memberof test.Hero
         * @static
         * @param {test.Hero} message Hero
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hero.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.skills = [];
            if (options.defaults) {
                object.name = "";
                object.id = 0;
                object.age = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.age != null && message.hasOwnProperty("age"))
                object.age = message.age;
            if (message.skills && message.skills.length) {
                object.skills = [];
                for (var j = 0; j < message.skills.length; ++j)
                    object.skills[j] = message.skills[j];
            }
            return object;
        };

        /**
         * Converts this Hero to JSON.
         * @function toJSON
         * @memberof test.Hero
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hero.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Hero;
    })();

    return test;
})();

module.exports = $root;
