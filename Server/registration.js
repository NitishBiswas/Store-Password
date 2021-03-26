const express = require('express');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', //empty for window
  database: 'password',
});

app.listen(1111, function () {
  console.log('start');
});

con.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('connected');
  }
});

let tableName;

app.post('/', function (req, res) {
  var table_name = req.body.table.split('@', 1);
  table_name[0] = table_name[0].replaceAll('.', '');
  if (req.body.ID) {
    const query =
      'Update ' +
      table_name[0] +
      " set Title='" +
      req.body.Title +
      "',Username='" +
      req.body.Username +
      "',Password='" +
      req.body.Password +
      "' where ID=" +
      req.body.ID +
      '';
    con.query(query, function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.Title) {
    const sql =
      'INSERT into ' +
      table_name[0] +
      " values(null,'" +
      req.body.Title +
      "','" +
      req.body.Username +
      "','" +
      req.body.Password +
      "')";
    con.query(sql, function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    });
  } else {
    var tab = req.body.table.split('@', 1);
    tab[0] = tab[0].replaceAll('.', '');
    const sql =
      'SELECT * FROM ' +
      tab[0] +
      " where Title like '" +
      req.body.search +
      "%'";
    con.query(sql, function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    });
  }
});

app.get('/', function (req, res) {
  const sql = 'SELECT * FROM ' + tableName + ' Order By Title';
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
});

app.get('/registration', function (req, res) {
  if (req.body.Gmail) {
    con.query(
      "SELECT * FROM registration where Gmail='" + req.body.Gmail + "'",
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          res.send(rows);
        }
      },
    );
  } else {
    con.query('SELECT * FROM registration', function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    });
  }
});

app.post('/registration', function (req, res) {
  if (req.body.Note) {
    const search =
      "select * from registration where Gmail='" +
      req.body.Gmail +
      "' and Password='" +
      req.body.Password +
      "'";
    tableName = req.body.Gmail.split('@', 1);
    tableName[0] = tableName[0].replaceAll('.', '');
    const searchTable =
      "select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME='" +
      tableName[0] +
      "'";
    con.query(search, function (e, r, f) {
      if (e) {
        console.log(e);
      } else {
        if (r.length) {
          con.query(searchTable, function (ee, rr, ff) {
            if (rr.length === 0) {
              const query =
                'create table ' +
                tableName[0] +
                '(ID int AUTO_INCREMENT PRIMARY KEY, Title varchar(100), Username varchar(100), Password varchar(100))';
              con.query(query, function (eee, rrr, fff) {
                if (eee) {
                  console.log(eee);
                }
              });
            }
          });
        }
        res.send(r);
      }
    });
  } else if (req.body.ID) {
    const query =
      "Update registration set Name='" +
      req.body.Name +
      "',Gmail='" +
      req.body.Gmail +
      "',Phone=" +
      req.body.Phone +
      ",Password='" +
      req.body.Password +
      "', Image='" +
      req.body.Image +
      "' where ID=" +
      req.body.ID +
      '';
    con.query(query, function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.Registration) {
    const sq =
      "select Gmail from registration where Gmail='" + req.body.Gmail + "'";
    con.query(sq, function (e, r, f) {
      if (e) {
        console.log(e);
      } else if (r.length === 0) {
        const sql =
          "INSERT into registration values(null,'" +
          req.body.Name +
          "','" +
          req.body.Gmail +
          "'," +
          req.body.Phone +
          ", '" +
          req.body.Password +
          "','" +
          req.body.Image +
          "')";
        con.query(sql, function (error, rows, fields) {
          if (error) {
            console.log(error);
          } else {
            res.send(rows);
          }
        });
      }
    });
  } else if (req.body.Check) {
    const sql1 =
      "select Gmail from registration where Gmail='" + req.body.Gmail + "'";
    con.query(sql1, function (ee, rr, ff) {
      if (ee) {
        console.log(ee);
      } else if (rr.length !== 0) {
        res.send(rr);
      }
    });
  } else if (req.body.NewPassword) {
    const sql2 =
      "Update registration set Password='" +
      req.body.Password +
      "' where Gmail='" +
      req.body.Gmail +
      "' ";
    con.query(sql2, function (eee, rrr, fff) {
      if (eee) {
        console.log(eee);
      } else {
        res.send(rrr);
      }
    });
  }
});

app.delete('/', function (req, res) {
  var id = req.body.ID;
  var table = req.body.tableName.split('@', 1);
  table[0] = table[0].replaceAll('.', '');
  var sql = 'DELETE from ' + table[0] + ' where ID = ' + id + '';
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
});

app.delete('/registration', function (req, res) {
  var id = req.body.ID;
  var table = req.body.tableName.split('@', 1);
  table[0] = table[0].replaceAll('.', '');
  var sql = 'DELETE from registration where ID = ' + id + '';
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
  con.query('Drop table ' + table[0] + '', function (error, rows, fields) {
    if (error) {
      console.log(error);
    }
  });
});
