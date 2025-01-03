/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Person', null, global);
goog.exportSymbol('proto.Phone', null, global);
goog.exportSymbol('proto.Phone.PHONE_TYPE', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Person = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 4, null, null);
};
goog.inherits(proto.Person, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Person.displayName = 'proto.Person';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Person.prototype.toObject = function(opt_includeInstance) {
  return proto.Person.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Person} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Person.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getField(msg, 1),
    name: jspb.Message.getField(msg, 2),
    email: jspb.Message.getField(msg, 3)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.Person.extensions, proto.Person.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Person}
 */
proto.Person.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Person;
  return proto.Person.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Person} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Person}
 */
proto.Person.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFixed32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.Person.extensionsBinary,
        proto.Person.prototype.getExtension,
        proto.Person.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Person.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Person.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Person} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Person.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeFixed32(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.Person.extensionsBinary, proto.Person.prototype.getExtension);
};


/**
 * required fixed32 id = 1;
 * @return {number}
 */
proto.Person.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.Person.prototype.setId = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Person.prototype.clearId = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Person.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required string name = 2;
 * @return {string}
 */
proto.Person.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.Person.prototype.setName = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.Person.prototype.clearName = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Person.prototype.hasName = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string email = 3;
 * @return {string}
 */
proto.Person.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.Person.prototype.setEmail = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.Person.prototype.clearEmail = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Person.prototype.hasEmail = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object.<number, jspb.ExtensionFieldInfo>}
 */
proto.Person.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object.<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.Person.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Phone = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Phone, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Phone.displayName = 'proto.Phone';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Phone.prototype.toObject = function(opt_includeInstance) {
  return proto.Phone.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Phone} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Phone.toObject = function(includeInstance, msg) {
  var f, obj = {
    num: jspb.Message.getField(msg, 1),
    type: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Phone}
 */
proto.Phone.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Phone;
  return proto.Phone.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Phone} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Phone}
 */
proto.Phone.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNum(value);
      break;
    case 2:
      var value = /** @type {!proto.Phone.PHONE_TYPE} */ (reader.readEnum());
      msg.setType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Phone.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Phone.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Phone} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Phone.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {!proto.Phone.PHONE_TYPE} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.Phone.PHONE_TYPE = {
  MOBILE: 1,
  HOME: 2
};


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `phonesList`.
 * @type {!jspb.ExtensionFieldInfo.<!Array.<!proto.Phone>>}
 */
proto.Phone.phonesList = new jspb.ExtensionFieldInfo(
    10,
    {phonesList: 0},
    proto.Phone,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         proto.Phone.toObject),
    1);

proto.Person.extensionsBinary[10] = new jspb.ExtensionFieldBinaryInfo(
    proto.Phone.phonesList,
    jspb.BinaryReader.prototype.readMessage,
    jspb.BinaryWriter.prototype.writeRepeatedMessage,
    proto.Phone.serializeBinaryToWriter,
    proto.Phone.deserializeBinaryFromReader,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
proto.Person.extensions[10] = proto.Phone.phonesList;

/**
 * optional string num = 1;
 * @return {string}
 */
proto.Phone.prototype.getNum = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Phone.prototype.setNum = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Phone.prototype.clearNum = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Phone.prototype.hasNum = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional PHONE_TYPE type = 2;
 * @return {!proto.Phone.PHONE_TYPE}
 */
proto.Phone.prototype.getType = function() {
  return /** @type {!proto.Phone.PHONE_TYPE} */ (jspb.Message.getFieldWithDefault(this, 2, 1));
};


/** @param {!proto.Phone.PHONE_TYPE} value */
proto.Phone.prototype.setType = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.Phone.prototype.clearType = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Phone.prototype.hasType = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * A tuple of {field number, class constructor} for the extension
 * field named `phonesList`.
 * @type {!jspb.ExtensionFieldInfo.<!Array.<!proto.Phone>>}
 */
proto.Phone.phonesList = new jspb.ExtensionFieldInfo(
    10,
    {phonesList: 0},
    proto.Phone,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         proto.Phone.toObject),
    1);

proto.Person.extensionsBinary[10] = new jspb.ExtensionFieldBinaryInfo(
    proto.Phone.phonesList,
    jspb.BinaryReader.prototype.readMessage,
    jspb.BinaryWriter.prototype.writeRepeatedMessage,
    proto.Phone.serializeBinaryToWriter,
    proto.Phone.deserializeBinaryFromReader,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
proto.Person.extensions[10] = proto.Phone.phonesList;

goog.object.extend(exports, proto);
