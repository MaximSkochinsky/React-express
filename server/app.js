const express = require('express')
const mysql = require('mysql2')
const bodyparser = require('body-parser')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser");
const logger = require("morgan")
const getUserById = require('./sql')
const url = require('url')
const { nextTick } = require('process')
const fs = require('fs')
const { Console } = require('console')


app.use(bodyparser.json())
app.use(cors())



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "mydb"
})


app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password 
    const fullname = req.body.fullname
    const role = req.body.role  
    const age = Number(req.body.age) 
    const passport_id = Number(req.body.passport) 
    let insert_id = 0
    let role_id = 0

    db.query("INSERT INTO account (login, password) VALUES (?, ?)", [username, password], (err, result) => {
        
    })

    db.query("SELECT * FROM account ORDER BY id DESC LIMIT 1",[], async (err, results) => {
        insert_id = results[0].id
        switch(role) {
            case "Admin": 
                role_id = 1;
                break;
            case "Manager":
                role_id = 2;
                break;
            case "Client":
                role_id = 3;
                break;
            default:
                break;
        }
        const insert_user = await db.promise().query('INSERT INTO user (id, fullname, role_id) VALUES(?, ?, ?);', [insert_id, fullname, role_id])
        if (role_id === 2) {
            const insert_manager = await db.promise().query('INSERT INTO managers(id, fullname) VALUES(?, ?);', [insert_id, fullname])
            const insert_profile = await db.promise().query('INSERT INTO personal_file(manager_id, passport_id, education, trainings, age) VALUES(?, ?, ?, ?, ?)', [insert_id, passport_id, 'Higher', '', age])
            const insert_salary_report = await db.promise().query('INSERT INTO salary_report(manager_id, fullname, salary, bonus) VALUES (?, ?, ?, ?)', [insert_id, fullname, 1000, 0])
        }
        else if (role_id === 3) {
            const insert_client = await db.query('INSERT INTO clients(id, fullname) VALUES(?, ?);', [insert_id, fullname]) 

        }



    })


})


app.post('/profile', (req, res) => {
    const username = req.body.username
    const password = req.body.password


    db.query("SELECT * FROM account WHERE login = ? AND password = ? LIMIT 1", [username, password], (err, result) => {
        if (err) {
            res.send({err: err})
        }

        if (result[0]) {
            db.query("SELECT * FROM user WHERE id=?", [result[0].id], (err, data) => {
                 // if (data[0].role_id  === 2) {

                // }
                // else if (data[0].role_id === 3) {

                // }
                if (data) {
                    res.json(data[0])
                }
            })
            
        }
        else {
            res.send({message: "Wrong login/password combination"})
        }

    })
})








// app.get('/', (req, res) => {
//     const data = db.query("SELECT * FROM user", (err, res) => {
        // console.log(res[0])
//     })
// })


app.get('/auto', async (req, res) => {
    const cars = await db.promise().query("SELECT DISTINCT name FROM auto")
    const colors = await db.promise().query("SELECT DISTINCT color FROM auto")
    colors.pop()
    cars.pop()
    
    let options_car = []
    let options_color = []

    res.send({cars: cars[0], colors: colors[0]})
})


app.post('/auto/buy', async (req, res) => {
    let data = req.body


    let info = await db.promise().query("SELECT * FROM auto WHERE name=? AND color=? AND release_year > ? AND release_year < ? AND price > ? AND price < ? AND for_sale = true", 
    [data.selectedCar, data.selectedColor, data.selectedMinDate, data.selectedMaxDate, data.selectedMinPrice, data.selectedMaxPrice])


    
    const adress = []
    for (let inf of info[0])  {
        let dealership = await db.promise().query("SELECT * FROM dealership WHERE id=?", [inf.dealership_id])
        inf.adress = dealership[0][0].adress
        inf.dealership = dealership[0][0].name
        inf.number = dealership[0][0].phone_number
    }


    
    // console.log(info[0])
    res.send(info[0])
})


app.get('/login_validation', async (req, res) => {
    const data = await db.promise().query("SELECT * FROM account")
    // console.log(data[0])
    res.send(data[0])
})




app.post('/payment', async (req, res) => {
    console.log(req.body.state)
    const data = req.body

    db.query('UPDATE auto SET for_sale = false WHERE id=?', [data.state.car.id])
    const managers = await db.promise().query("SELECT * FROM managers ORDER BY RAND() LIMIT 1")
    
    await db.promise().query("UPDATE salary_report SET bonus = bonus + ? WHERE manager_id = ?", [data.state.car.price * 0.005, managers[0][0].id])
    await db.promise().query("INSERT INTO contracts(auto_id, client_id, manager_id, price, dealership_id) VALUES(?, ?, ?, ?, ?)", 
        [data.state.car.id, Number(data.state.client.id), managers[0][0].id, data.state.car.price, data.state.car.dealership_id])
    db.query("SELECT * FROM contracts ORDER BY id DESC LIMIT 1", async (err, res) => {
        const id = res[0].id
        const manager = await db.promise().query("SELECT * FROM managers WHERE id = ?", [managers[0][0].id])
        console.log(manager)
        const fullnameManager = manager[0][0].fullname
        const client = await db.promise().query("SELECT * FROM clients WHERE id = ?", [Number(data.state.client.id)])
        console.log(client)
        const fullnameClient = client[0][0].fullname
        await db.promise().query("INSERT INTO contracts_log(contract_id, date, client_fullname, manager_fullname) VALUES(?, now(), ?, ?)", [id, fullnameClient, fullnameManager])
    })

})



app.post('/search', async (req, res) => {
    let data = req.body
    let info = await db.promise().query("SELECT * FROM dealership WHERE name=?", [data.name])
    res.send(info[0])
})



app.post('/contracts', async (req, res) => {
    let result = req.body
    let contractsInfo = []
    const contracts = await db.promise().query('SELECT * FROM contracts WHERE manager_id=?', [result.id])
    for await( let contract of contracts[0]) {
        let info = Object.assign({}, contract)
        let auto = await db.promise().query("SELECT * FROM auto WHERE id=?", [contract.auto_id])
        info.auto = auto[0][0].name
        let client = await db.promise().query("SELECT * FROM clients  WHERE id=?", [contract.client_id])
        info.client = client[0][0].fullname
        info.vin = auto[0][0].vin
        contractsInfo.push(info)
    }


 
    res.send(contractsInfo)
})




app.post('/contracts/manage', async (req, res) => {
    let contractsInfo = []
    const contracts = await db.promise().query('SELECT * FROM contracts')
    for await( let contract of contracts[0]) {
        let info = Object.assign({}, contract)
        let auto = await db.promise().query("SELECT * FROM auto WHERE id=?", [contract.auto_id])
        info.auto = auto[0][0].name
        let client = await db.promise().query("SELECT * FROM clients  WHERE id=?", [contract.client_id])
        info.client = client[0][0].fullname
        info.vin = auto[0][0].vin
        contractsInfo.push(info)
    }
    res.send(contractsInfo)
})

app.post('/auto/manage', async (req, res) => {
    const auto = await db.promise().query('SELECT * FROM auto') 
    res.send(auto[0])
})

app.post('/salary/manage', async (req, res) => {
    const salary = await db.promise().query('SELECT * FROM mydb.salary_report  JOIN mydb.personal_file ON personal_file.manager_id = salary_report.manager_id') 
    res.send(salary[0])
})

app.post('/salary/manage/change', async (req, res) => {
    const data = req.body
    db.query("UPDATE salary_report SET salary = ? WHERE fullname = ?", [Number(data.salary), data.fullname])
})


app.post('/auto/manage/change', async (req, res) => {
    const data = req.body
    console.log(data)
    db.query("UPDATE auto SET price=? WHERE vin=?", [data.price, data.vin])
})


app.post('/auto/manage/delete', async (req, res) => {
    console.log(req.body)
    const data = req.body
    const auto =  await db.promise().query("SELECT * FROM auto WHERE vin=?", [data.vin], async (err, res) => {
        for await (let auto of res) {
            await db.promise().query("DELETE contracts_log, contracts, auto FROM contracts_log" +
            "INNER JOIN contracts INNER JOIN auto  WHERE contracts.auto_id = ? AND  contracts_log.contract_id = contracts.id AND auto.id = ?", [auto.id, auto.id])
        }
    }) 
})



app.listen(3001, () => {
    // console.log('server is running')
})