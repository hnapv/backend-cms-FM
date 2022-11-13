var infoCustomers = require('../models/infoCusModel');

var listInfoCustomer = async res => {
    try {
        res.json(await infoCustomers.find())
    }
    catch (err) { res.send(err) }
}

module.exports = app => {
    app.get("/api/getListCustomers", function (req, res) {
        listInfoCustomer(res);
    });

    app.get("/api/getInfoCustomer/:id", async (req, res) => {
        try {
            res.json(await infoCustomers.findById({ _id: req.params.id }))
        }
        catch (err) { console.log(err + '') }
    });

    app.post("/api/postInfoCustomer", async (req, res) => {
        try {
            var infoCus = {
                fullName: req.body.fullName,
                id: req.body.id,
                dateOfIssue: new Date(req.body.dateOfIssue),
                placeOfIssue: req.body.placeOfIssue,
                gender: req.body.gender,
                birthDay: new Date(req.body.birthDay),
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            }
            console.log(infoCus);
            await infoCustomers.create(infoCus)     
            listInfoCustomer(res);
            // res.send("Thanh cong!")
        }
        catch (err) { console.log(err + '') }
    });

    app.put("/api/putInfoCustomer", async (req, res) => {
        if (!req.body._id) {
            return res.status(500).send("ID khong ton tai");
        } else try {
            await infoCustomers.updateOne({
                _id: req.body._id
            }, {
                fullName: req.body.fullName,
                id: req.body.id,
                dateOfIssue: new Date(req.body.dateOfIssue),
                placeOfIssue: req.body.placeOfIssue,
                gender: req.body.gender,
                birthDay: new Date(req.body.birthDay),
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            })
            listInfoCustomer(res)
        }
        catch (err) { res.status(500).json(err) }
    });

    app.delete("/api/deleteInfoCustomer", async(req,res)=>{
        try{
            await infoCustomers.deleteOne({_id:req.body._id})
            listInfoCustomer(res);
            
        }
        catch(err){res.status(500).json(err)}
    });
}