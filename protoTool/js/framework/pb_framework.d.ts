import * as $protobuf from "protobufjs";
import Long = require("long");
export = pb_framework;

declare namespace pb_framework {


    namespace tutorial {

        interface IPerson {
            name?: (string|null);
            id?: (number|null);
            email?: (string|null);
            phones?: (tutorial.Person.PhoneNumber[]|null);
        }

        class Person implements IPerson {
            constructor(p?: tutorial.IPerson);
            public name: string;
            public id: number;
            public email: string;
            public phones: tutorial.Person.PhoneNumber[];
            public static create(properties?: tutorial.IPerson): tutorial.Person;
            public static encode(m: tutorial.Person, w?: $protobuf.default.Writer): $protobuf.default.Writer;
            public static decode(r: ($protobuf.default.Reader|Uint8Array), l?: number): tutorial.Person;
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Person {

            enum PhoneType {
                MOBILE = 0,
                HOME = 1,
                WORK = 2
            }

            interface IPhoneNumber {
                number?: (string|null);
                type?: (tutorial.Person.PhoneType|null);
            }

            class PhoneNumber implements IPhoneNumber {
                constructor(p?: tutorial.Person.IPhoneNumber);
                public number: string;
                public type: tutorial.Person.PhoneType;
                public static create(properties?: tutorial.Person.IPhoneNumber): tutorial.Person.PhoneNumber;
                public static encode(m: tutorial.Person.PhoneNumber, w?: $protobuf.default.Writer): $protobuf.default.Writer;
                public static decode(r: ($protobuf.default.Reader|Uint8Array), l?: number): tutorial.Person.PhoneNumber;
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IAddressBook {
            people?: (tutorial.Person[]|null);
        }

        class AddressBook implements IAddressBook {
            constructor(p?: tutorial.IAddressBook);
            public people: tutorial.Person[];
            public static create(properties?: tutorial.IAddressBook): tutorial.AddressBook;
            public static encode(m: tutorial.AddressBook, w?: $protobuf.default.Writer): $protobuf.default.Writer;
            public static decode(r: ($protobuf.default.Reader|Uint8Array), l?: number): tutorial.AddressBook;
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IPackage {
            cmd?: (number|null);
            data?: (Uint8Array|null);
        }

        class Package implements IPackage {
            constructor(p?: tutorial.IPackage);
            public cmd: number;
            public data: Uint8Array;
            public static create(properties?: tutorial.IPackage): tutorial.Package;
            public static encode(m: tutorial.Package, w?: $protobuf.default.Writer): $protobuf.default.Writer;
            public static decode(r: ($protobuf.default.Reader|Uint8Array), l?: number): tutorial.Package;
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    namespace test {

        interface IHero {
            name?: (string|null);
            id?: (number|null);
            age?: (number|null);
            skills?: (string[]|null);
        }

        class Hero implements IHero {
            constructor(p?: test.IHero);
            public name: string;
            public id: number;
            public age: number;
            public skills: string[];
            public static create(properties?: test.IHero): test.Hero;
            public static encode(m: test.Hero, w?: $protobuf.default.Writer): $protobuf.default.Writer;
            public static decode(r: ($protobuf.default.Reader|Uint8Array), l?: number): test.Hero;
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
