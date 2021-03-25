function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
define("ERRCODE_INTERNAL_SERVER", 500);
define("SUCCESS_RESPONSE", 200);
define("ERRCODE_FROBIDDEN", 403);
define("ERRCODE_BADREQUEST", 400);
define("UNDEFINED", "undefined");

define("YES", 1);
define("NO", 0);