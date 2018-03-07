require('dotenv').config()

const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8080;

if(!process.env.BLOCKCHAIN){
    console.log("BLOCKCHAIN is not defined in .env file");
    process.exit(1);
}
const blockchainURL = process.env.BLOCKCHAIN

if(!process.env.DOCTOR_PORT){
    console.log("DOCTOR_PORT is not defined in .env file");
    process.exit(1);
} 
const doctorPort = process.env.DOCTOR_PORT

if(!process.env.PHARMACIST_PORT){
    console.log("PHARMACIST_PORT is not defined in .env file");
    process.exit(1);
}
const pharmacistPort = process.env.PHARMACIST_PORT

if(!process.env.CHANNEL){
    console.log("CHANNEL is not defined in .env file");
    process.exit(1);
}
const CHANNEL = process.env.CHANNEL

if(!process.env.CHAINCODENAME){
    console.log("CHAINCODENAME is not defined in .env file");
    process.exit(1);
}
const CHAINCODENAME = process.env.CHAINCODENAME

if(!process.env.CHAINCODEVER){
    console.log("CHAINCODEVER is not defined in .env file");
    process.exit(1);
}
const CHAINCODEVER = process.env.CHAINCODEVER

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var blockchainstatus = true;

var RXint = 3;
var rxlog = [];

var persons = [
    {
        ID: "001",
        FirstName: "John",
        LastName: "Doe",
        DOB: "01/01/1987",
        Address: "999 Denver Rd, Portland, OR 98765",
        Ethnicity: "Asian",
        Phone: "111-111-1111"
    },
    {
        ID: "002",
        FirstName: "Mary",
        LastName: "Jane",
        DOB: "05/05/1997",
        Address: "111 Denver Rd, Portland, OR 98765",
        Ethnicity: "Caucasion",
        Phone: "123-123-1234"
    }
];

var rx = [
    {
        RXID: "RX001",
        ID: "001",
        FirstName: "John",
        LastName: "Doe",
        DOB: "01/01/1981",
        Prescription: "mitodel",
        Refills: 5,
        Doctor: "Dr. Sloan",
        License: "PA EX 0000",
        Status: "prescribed",
        TimeStamp: "dec1"
      },
      {
        RXID: "RX002",
        ID: "002",
        FirstName: "Mary",
        LastName: "Jane",
        DOB: "01/01/1981",
        Prescription: "advil",
        Refills: 2,
        Doctor: "Dr. Sloan",
        License: "PA EX 0000",
        Status: "prescribed",
        TimeStamp: "deb1"
      },
      {
        RXID: "RX003",
        ID: "001",
        FirstName: "John",
        LastName: "Doe",
        DOB: "01/01/1981",
        Prescription: "advil",
        Refills: 5,
        Doctor: "Dr. Sloan",
        License: "PA EX 0000",
        Status: "filled",
        TimeStamp: "dec1"
      }
];

// Patient Collection
app.get('/pd', function(req, res){
    res.send({ Persons: persons});
});

app.get('/pd/:FirstName/:LastName', function(req, res) {
    var first = req.params.FirstName;
    var last = req.params.LastName;

    //do query in DB for first and last name match

    //send response back

    var response;
    persons.forEach(function(person){
        if(person.FirstName.toLowerCase() == first.toLowerCase() && person.LastName.toLowerCase() == last.toLowerCase()){
            response = person;
        }
    });
    res.send(response);
});

// RX Collection
// get/post/patch rx information
app.get('/rx/:ID', function(req, res){
    var responseRX = [];
    rx.forEach(function(r){
        if(r.ID == req.params.ID){
            responseRX.push(r);
        }
    });
    console.log("Get Req.id", req.params.ID);
    console.log("Get Req:", JSON.stringify(responseRX));

    res.send({RX: responseRX});
});

app.post('/rx/:ID', function(req, res){
    
        const patientID = req.params.ID;
        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;
        const DOB = req.body.DOB;
        const Prescription = req.body.Prescription;
        const Refills = req.body.Refills.toString();
        const Doctor = req.body.Doctor;
        const License = req.body.License;
        const Status = req.body.Status;
        const Timestamp = req.body.Timestamp;
        const RXID = "RX" + pad(++RXint, 3).toString();
        rx.push({
            RXID: RXID,
            ID: patientID,
            FirstName: FirstName,
            LastName: LastName,
            DOB: DOB,
            Prescription: Prescription,
            Refills: Refills,
            Doctor: Doctor,
            License: License,
            Status: Status,
            TimeStamp: Timestamp
        });

        rxlog.push({
            RXID: RXID,
            ID: patientID,
            Status: Status,
            TimeStamp: Timestamp
        });

        axios.post(blockchainURL+":"+doctorPort+'/bcsgw/rest/v1/transaction/invocation',{
            "channel": CHANNEL,
            "chaincode": CHAINCODENAME,
            "chaincodeVer": CHAINCODEVER,
            "method": "insertObject",
            "args": [RXID, patientID, FirstName, LastName, Timestamp, Doctor, Prescription, Refills, Status]
        })
        .then(function(r){
            console.log("response ok");
            console.log("response", r.data);
            res.send({response: "ok"});
        })
        .catch(function (err){
            res.send({response: "not ok"});
            console.log(err);
        });

    
});

app.patch('/rx/:ID', function(req, res){
    const patientID = req.params.ID;
    const RXID = req.body.RXID; 
    const Status = req.body.Status;
    const TimeStamp = Date.now();
	console.log(TimeStamp);
    var args = [];
    rx = rx.map((r)=>{
        if(r.RXID == RXID){
            r.Status = Status;
            r.TimeStamp = TimeStamp;
            
            args.push(r.RXID);
            console.log("RXID", r.RXID);
            args.push(r.ID);
            args.push(r.FirstName);
            args.push(r.LastName);
            args.push(TimeStamp);
            args.push(r.Doctor);
            args.push(r.Prescription);
            args.push(r.Refills.toString());
            
            args.push(r.Status);
            console.log(args);

        }
        return r;
    });

    

    rxlog.push({
        RXID: "RX" + pad(++RXint, 3).toString(),
        ID: patientID,
        RXID: RXID,
        Status: Status,
        TimeStamp: TimeStamp
    });
    axios.post(blockchainURL+":"+pharmacistPort+'/bcsgw/rest/v1/transaction/invocation', {
        "channel": CHANNEL,
        "chaincode": CHAINCODENAME,
        "chaincodeVer": CHAINCODEVER,
        "method":"modifyObject",
        "args": args
    })
    .then( (response) => {
        console.log(response.data);
        res.send({response: "ok"});
    })
    .catch( (err) => {
        res.send({response: "not ok"});
        console.log(err.response.data);
    });
});


var bcsCounter = 0;
// Check Blockchain Validity
app.get('/bcs', function(req, res){
    
    if(blockchainstatus == false){
        res.send({RXID: "RX001", Status: "False", Blockchain: "Doctor"});
    }
    else{
        res.send({Status: "True"})
    };
});


app.get('/rx', function(req, res){
    res.send({
        RX: rxlog
    });
});
app.get('/hack', function(req,res){
    res.send({});
    if(blockchainstatus){
        blockchainstatus = false;
    }else{
        blockchainstatus = true
    }
});

app.get('/doctorRX', function(req, res){
    rx.forEach((r)=>{
        axios.post('http://129.146.106.151:4001/bcsgw/rest/v1/transaction/query', {
            "channel": "doctorpharmacist",
            "chaincode": "file-trace",
            "chaincodeVer": "v1",
            "method": "modifyDocument",
            "args": r.RXID
        }).then((response)=>{
            rxtemp.push(response);
        }).catch((err)=>{
            rxtemp.push(response);
            console.log("err", err);
        });
    });
    res.send(rxtemp);
})

app.listen(port, function(){
    console.log("Listening on port: ", port);
});

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
