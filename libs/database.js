"use strict";
var mongoose = require("mongoose");

var database = (function() {
  var conn = null;
  var init = function(config) {
    console.log(
      "Trying to connect to " +
        config.host +
        "/" +
        config.database +
        " MongoDB database"
    );
    var options = {
      useNewUrlParser: true
    };

    var connString = `mongodb://${config.host}/${config.database}`;
    mongoose.connect(connString, options);
    conn = mongoose.connection;
    conn.on("error", console.error.bind(console, "connection error:"));
    conn.once("open", function() {
      console.log("db connection open");
    });
    return conn;
  };

  var close = function() {
    if (conn) {
      conn.close(function() {
        console.log(
          "Mongoose default connection disconnected through app termination"
        );
        process.exit(0);
      });
    }
  };

  return {
    init,
    close
  };
})();

module.exports = database;
