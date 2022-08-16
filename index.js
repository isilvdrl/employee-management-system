var express = require('express')
var ejs = require('ejs')
var mysql = require('mysql');
var bodyParser = require('body-parser');

mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_project"

})


var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"

    })
    con.query("SELECT* FROM employees", (err, result) => {
        res.render('pages/index', { result: result })
    })
    con.query("SELECT* FROM locations", (err, result) => {
        res.render('pages/index', { result: result })
    })

});

app.get('/create', function (req, res) {

    res.render('pages/create');

})

app.post('/insert', function (req, res) {
    var isim = req.body.isim;
    var soyisim = req.body.soyisim;
    var tel = req.body.tel;
    var startDate = req.body.startDate;
    var maas = req.body.maas;
    var departman = req.body.departman;
    var unvan = req.body.unvan;
    var yonetici = req.body.yonetici;
    var mail = req.body.mail;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"

    })
    con.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected');
            var query = "INSERT INTO employees (isim,soyisim,tel,startDate,maas,departman,unvan,yonetici,mail) VALUES ?";
            var values = [[isim, soyisim, tel, startDate, maas, departman, unvan, yonetici, mail]];
            con.query(query, [values], (err, result) => {

                con.query("SELECT* FROM employees", (err, result) => {
                    res.render('pages/index', { result: result })
                })
            });

        }


    })
})

app.post('/delete', function (req, res) {

    var id = req.body.id;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"
    })

    var query = "DELETE FROM employees WHERE id='" + id + "'";
    con.query(query, (err, result) => {

        con.query("SELECT * FROM employees", (err, result) => {
            res.render('pages/index', { result: result })
        })

    })
})

////////////////

app.get('/create_location', function (req, res) {

    res.render('pages/create_location');

})

app.post('/insertlocation', function (req, res) {
    var adres = req.body.adres;
    var postakodu = req.body.postakodu;
    var sehir = req.body.sehir;
    var ulke = req.body.ulke;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"

    })
    con.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected');
            var query = "INSERT INTO locations (adres,postakodu,sehir,ulke) VALUES ?";
            var values = [[adres, postakodu, sehir, ulke]];
            con.query(query, [values], (err, result) => {

                con.query("SELECT* FROM locations", (err, result) => {
                    res.render('pages/location', { result: result })
                })
            });

        }


    })
})



////////


app.post('/insert_title', function (req, res) {
    var baslangic = req.body.baslangic;
    var bitis = req.body.bitis;
    var unvan = req.body.unvan;
    var departman = req.body.departman;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"

    })
    con.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected');
            var query = "INSERT INTO unvan (baslangic,bitis,unvan,departman) VALUES ?";
            var values = [[baslangic, bitis, unvan, departman]];
            con.query(query, [values], (err, result) => {

                con.query("SELECT* FROM unvan", (err, result) => {
                    res.render('pages/index', { result: result })
                })
            });

        }


    })
})

//////////////

app.post('/edit', function (req, res) {
    var id = req.body.id;
    res.render('pages/edit', { id: id });
});

app.post('/edit_employee', function (req, res) {

    var id = req.body.id;
    var isim = req.body.isim;
    var soyisim = req.body.soyisim;
    var tel = req.body.tel;
    var startDate = req.body.startDate;
    var maas = req.body.maas;
    var departman = req.body.departman;
    var unvan = req.body.unvan;
    var yonetici = req.body.yonetici;
    var mail = req.body.mail;


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"
    })


    //update the employee info
    con.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected');
            var query = "UPDATE employees SET isim='" + isim + "', soyisim='" + soyisim + "', tel='" + tel + "'," +
                "startDate='" + startDate + "', maas='" + maas + "',departman='" + departman + "',unvan='" + unvan + "', yonetici='" + yonetici + "',mail='" + mail + "'WHERE id='" + id + "'";


            con.query(query, (err, result) => {

                con.query("SELECT * FROM employees", (err, result) => {

                    res.render('pages/index', { result: result })
                })
            });
        }
    })


})

app.post('/title', function (req, res) {
    var id = req.body.id;
    res.render('pages/title', { id: id });
});

app.post('/edit_title', function (req, res) {
    var id = req.body.id;
    var isim = req.body.isim;
    var soyisim = req.body.soyisim;
    var tel = req.body.tel;
    var startDate = req.body.startDate;
    var maas = req.body.maas;
    var departman = req.body.departman;
    var unvan = req.body.unvan;
    var yonetici = req.body.yonetici;
    var mail = req.body.mail;
    //connect to database
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"
    })


    con.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected');
            var query = "UPDATE unvan SET unvan='" + unvan + "', startDate = '" + startDate + "'  WHERE isim='" + isim + "', soyisim='" + soyisim + "', tel='" + tel + "',maas='" + maas + "',departman='" + departman + "',yonetici='" + yonetici + "',mail='" + mail + "', id='" + id + "'";


            con.query(query, (err, result) => {

                con.query("SELECT * FROM employees", (err, result) => {

                    res.render('pages/index', { result: result })
                })
            });
        }
    })


})



app.get('/about', function (req, res) {
    res.render('pages/about')
})

app.get('/contact', function (req, res) {
    res.render('pages/contact')
})
