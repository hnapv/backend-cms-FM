var infoCustomers = require('../models/infoCusModel')

module.exports= function(app){
    app.get("/api/setupInfoCustomer",function(req,res){
        var seedInfoCus=[
            {fullName: "Nguyecn Van A",
            id: "345346356",
            dateOfIssue: new Date('2012-06-11'),
            placeOfIssue: "Ha Noi",
            gender: 'male',
            birthDay: new Date('1997-10-11'),
            email: "Sasdjnds@gmail.com",
            phoneNumber: 098908034,
            address: "ha Noi ay nhir"   } 
        ];
        infoCustomers.create(seedInfoCus,function(err,results){
            res.send(results);
        });
    });
}