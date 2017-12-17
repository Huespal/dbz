var observable = require("data/observable");
var DBZ = (function (_super) {
    __extends(DBZ, _super);
    function DBZ() {
        _super.call(this);
    }
    return DBZ;
})(observable.Observable);
exports.DBZ = DBZ;
exports.mainViewModel = new DBZ();
