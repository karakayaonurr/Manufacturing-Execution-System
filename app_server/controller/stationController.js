var sql = require('mssql');

var dbConfig = {
    server: "ONURPC",
    database: "MES",
    user: "root",
    password: "123456",
    port: 1433
}

var OrderID = new Array();
var ItemName = new Array();
var ItemCode = new Array();
var OrderStatus = new Array();
var OrderTarget = new Array();
var OrderProduced = new Array();
var OrderRemaining = new Array();
var Reason = new Array();

var POLLING_INTERVAL = 1000;
var pollingTimer;

module.exports.indexPost = function(req,res){
    password = req.body.password;
    station = req.body.station;
        if(station == "Tel Kesme"){
            stationTable = "TelKesmeOrdersTable"
        }else if(typeof station=='undefined'){
            res.render('login', {
            });
        }else{
            stationTable = station+"OrdersTable"
        }

        var conn = new sql.ConnectionPool(dbConfig);
        var req = new sql.Request(conn);
        
        if(typeof stationTable!='undefined' && typeof password!='undefined'){
        
            conn.connect(function (err){
                if (err){
                    console.log(err);
                    return;
                }
                req.query("SELECT * FROM UsersTable, "+stationTable+" WHERE UserPassword = '"+password+"'", function (err, recordset){
                    if(err){
                        console.log(err);
                    }
                    else {
                        if(recordset.recordset.length != 0){
                            const sqlObjToString = JSON.stringify(recordset.recordset)
                            const toJSONSql = JSON.parse(sqlObjToString)
                            length = recordset.recordset.length

                            UserID = toJSONSql[0]["UserID"]
                            UserName = toJSONSql[0]["UserName"],
                            UserPassword = toJSONSql[0]["UserPassword"],
                            UserPhoto = toJSONSql[0]["UserPhoto"],
                            UserAuthority = toJSONSql[0]["UserAuthority"]

                            for(i=0; i<length; i++){
                                OrderID[i] = toJSONSql[i]["OrderID"],
                                ItemName[i] = toJSONSql[i]["ItemName"],
                                ItemCode[i] = toJSONSql[i]["ItemCode"],
                                OrderStatus[i] = toJSONSql[i]["OrderStatus"],
                                OrderTarget[i] = toJSONSql[i]["OrderTarget"],
                                OrderProduced[i] = toJSONSql[i]["OrderProduced"],
                                OrderRemaining[i] = toJSONSql[i]["OrderRemaining"],
                                Reason[i] = toJSONSql[i]["Reason"]
                            }
                            res.render('station',{
                                length,
                                UserID,
                                UserName,
                                UserPassword,
                                UserPhoto,
                                UserAuthority,
                                OrderID,
                                ItemName,
                                ItemCode,
                                OrderStatus,
                                OrderTarget,
                                OrderProduced,
                                OrderRemaining,
                                Reason
                            });
                        }else{
                            res.render('login', {
                            });
                        } 
                    }
                    conn.close();
                });
            });
        }
}

module.exports.indexGet = function(req,res){
    res.render('login');
}
