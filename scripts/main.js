function init() {
    document.addEventListener("deviceready", deviceready, true);
}

function deviceready() {
    db = window.openDatabase("vovinam", "1.0", "vovinam", 1000000);
    db.transaction(setupDB, errorHandler, dbReady);
}

function setupDB(tx) {
    tx.executeSql('create table if not exists log(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                  'log TEXT, created DATE)');
}

function errorHandler(e) {
    alert(e.message);
}

function dbReady() {

    $('#addButton').on("touchstart", function (e) {
        db.transaction(function (tx) {
            var msg = "Log it ...";
            var d = new Date();

            d.setDate(d.getDate() - randRange(1, 30));

            tx.executeSql("insert into log(log,created) value(?,?)", [msg, d.getTime()]);
        }, errorHandler, function () { $('#result').html('Added a row.'); });
    });

    $('#clearButton').on("touchstart", function (e) {
        db.transaction(function (tx) {
            tx.executeSql("delete from log");
        }, errorHandler, function () { $("#result").html("Cleared all rows."); });
    });

    $("#ShowButton").on("touchstart", function (e) {
        db.transaction(function (tx) {
            tx.executeSql("select * from log order by created desc", [], gotLog, errorHandler);
        }, errorHandler, function () { });
    });
}

function gotLog(tx, results) {

}