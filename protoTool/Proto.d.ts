import * as $protobuf from "protobufjs";
/** Namespace tutorial. */
export namespace tutorial {

    /** Properties of a Person. */
    interface IPerson {

        /** Person name */
        name?: (string|null);

        /** Person id */
        id?: (number|null);

        /** Person email */
        email?: (string|null);

        /** Person phones */
        phones?: (tutorial.Person.IPhoneNumber[]|null);
    }

    /** Represents a Person. */
    class Person implements IPerson {

        /**
         * Constructs a new Person.
         * @param [properties] Properties to set
         */
        constructor(properties?: tutorial.IPerson);

        /** Person name. */
        public name: string;

        /** Person id. */
        public id: number;

        /** Person email. */
        public email: string;

        /** Person phones. */
        public phones: [ 'Array' ].<tutorial.Person.IPhoneNumber>;

        /**
         * Creates a new Person instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Person instance
         */
        public static create(properties?: tutorial.IPerson): tutorial.Person;

        /**
         * Encodes the specified Person message. Does not implicitly {@link tutorial.Person.verify|verify} messages.
         * @param message Person message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tutorial.IPerson, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Person message, length delimited. Does not implicitly {@link tutorial.Person.verify|verify} messages.
         * @param message Person message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tutorial.IPerson, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Person message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tutorial.Person;

        /**
         * Decodes a Person message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tutorial.Person;

        /**
         * Verifies a Person message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a Person message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Person
         */
        public static fromObject(object: [ 'object' ].<string, any>): tutorial.Person;

        /**
         * Creates a plain object from a Person message. Also converts values to other types if specified.
         * @param message Person
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tutorial.Person, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this Person to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    namespace Person {

        /** PhoneType enum. */
        enum PhoneType {
            MOBILE = 0,
            HOME = 1,
            WORK = 2
        }

        /** Properties of a PhoneNumber. */
        interface IPhoneNumber {

            /** PhoneNumber number */
            number?: (string|null);

            /** PhoneNumber type */
            type?: (tutorial.Person.PhoneType|null);
        }

        /** Represents a PhoneNumber. */
        class PhoneNumber implements IPhoneNumber {

            /**
             * Constructs a new PhoneNumber.
             * @param [properties] Properties to set
             */
            constructor(properties?: tutorial.Person.IPhoneNumber);

            /** PhoneNumber number. */
            public number: string;

            /** PhoneNumber type. */
            public type: tutorial.Person.PhoneType;

            /**
             * Creates a new PhoneNumber instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PhoneNumber instance
             */
            public static create(properties?: tutorial.Person.IPhoneNumber): tutorial.Person.PhoneNumber;

            /**
             * Encodes the specified PhoneNumber message. Does not implicitly {@link tutorial.Person.PhoneNumber.verify|verify} messages.
             * @param message PhoneNumber message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tutorial.Person.IPhoneNumber, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PhoneNumber message, length delimited. Does not implicitly {@link tutorial.Person.PhoneNumber.verify|verify} messages.
             * @param message PhoneNumber message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tutorial.Person.IPhoneNumber, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tutorial.Person.PhoneNumber;

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tutorial.Person.PhoneNumber;

            /**
             * Verifies a PhoneNumber message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: [ 'object' ].<string, any>): (string|null);

            /**
             * Creates a PhoneNumber message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PhoneNumber
             */
            public static fromObject(object: [ 'object' ].<string, any>): tutorial.Person.PhoneNumber;

            /**
             * Creates a plain object from a PhoneNumber message. Also converts values to other types if specified.
             * @param message PhoneNumber
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tutorial.Person.PhoneNumber, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

            /**
             * Converts this PhoneNumber to JSON.
             * @returns JSON object
             */
            public toJSON(): [ 'object' ].<string, any>;
        }
    }

    /** Properties of an AddressBook. */
    interface IAddressBook {

        /** AddressBook people */
        people?: (tutorial.IPerson[]|null);
    }

    /** Represents an AddressBook. */
    class AddressBook implements IAddressBook {

        /**
         * Constructs a new AddressBook.
         * @param [properties] Properties to set
         */
        constructor(properties?: tutorial.IAddressBook);

        /** AddressBook people. */
        public people: [ 'Array' ].<tutorial.IPerson>;

        /**
         * Creates a new AddressBook instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddressBook instance
         */
        public static create(properties?: tutorial.IAddressBook): tutorial.AddressBook;

        /**
         * Encodes the specified AddressBook message. Does not implicitly {@link tutorial.AddressBook.verify|verify} messages.
         * @param message AddressBook message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tutorial.IAddressBook, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddressBook message, length delimited. Does not implicitly {@link tutorial.AddressBook.verify|verify} messages.
         * @param message AddressBook message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tutorial.IAddressBook, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddressBook message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddressBook
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tutorial.AddressBook;

        /**
         * Decodes an AddressBook message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddressBook
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tutorial.AddressBook;

        /**
         * Verifies an AddressBook message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an AddressBook message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddressBook
         */
        public static fromObject(object: [ 'object' ].<string, any>): tutorial.AddressBook;

        /**
         * Creates a plain object from an AddressBook message. Also converts values to other types if specified.
         * @param message AddressBook
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tutorial.AddressBook, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this AddressBook to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a Package. */
    interface IPackage {

        /** Package cmd */
        cmd?: (number|null);

        /** Package data */
        data?: (Uint8Array|null);
    }

    /** Represents a Package. */
    class Package implements IPackage {

        /**
         * Constructs a new Package.
         * @param [properties] Properties to set
         */
        constructor(properties?: tutorial.IPackage);

        /** Package cmd. */
        public cmd: number;

        /** Package data. */
        public data: Uint8Array;

        /**
         * Creates a new Package instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Package instance
         */
        public static create(properties?: tutorial.IPackage): tutorial.Package;

        /**
         * Encodes the specified Package message. Does not implicitly {@link tutorial.Package.verify|verify} messages.
         * @param message Package message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tutorial.IPackage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Package message, length delimited. Does not implicitly {@link tutorial.Package.verify|verify} messages.
         * @param message Package message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tutorial.IPackage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Package message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tutorial.Package;

        /**
         * Decodes a Package message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tutorial.Package;

        /**
         * Verifies a Package message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a Package message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Package
         */
        public static fromObject(object: [ 'object' ].<string, any>): tutorial.Package;

        /**
         * Creates a plain object from a Package message. Also converts values to other types if specified.
         * @param message Package
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tutorial.Package, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this Package to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }
}

/** Namespace test. */
export namespace test {

    /** Properties of a Hero. */
    interface IHero {

        /** Hero name */
        name?: (string|null);

        /** Hero id */
        id?: (number|null);

        /** Hero age */
        age?: (number|null);

        /** Hero skills */
        skills?: (string[]|null);
    }

    /** Represents a Hero. */
    class Hero implements IHero {

        /**
         * Constructs a new Hero.
         * @param [properties] Properties to set
         */
        constructor(properties?: test.IHero);

        /** Hero name. */
        public name: string;

        /** Hero id. */
        public id: number;

        /** Hero age. */
        public age: number;

        /** Hero skills. */
        public skills: [ 'Array' ].<string>;

        /**
         * Creates a new Hero instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Hero instance
         */
        public static create(properties?: test.IHero): test.Hero;

        /**
         * Encodes the specified Hero message. Does not implicitly {@link test.Hero.verify|verify} messages.
         * @param message Hero message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: test.IHero, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Hero message, length delimited. Does not implicitly {@link test.Hero.verify|verify} messages.
         * @param message Hero message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: test.IHero, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Hero message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Hero
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): test.Hero;

        /**
         * Decodes a Hero message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Hero
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): test.Hero;

        /**
         * Verifies a Hero message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a Hero message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Hero
         */
        public static fromObject(object: [ 'object' ].<string, any>): test.Hero;

        /**
         * Creates a plain object from a Hero message. Also converts values to other types if specified.
         * @param message Hero
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: test.Hero, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this Hero to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }
}
