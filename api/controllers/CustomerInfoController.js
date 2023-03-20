const CustomerInfoService = require("../services/CustomerInfoService");

const apiGetListCustomerInfo = async(req,res)=>{
    const ListCustomerInfo = await CustomerInfoService.GetListCustomerInfo();
    res.send(ListCustomerInfo)
};

const apiGetDetailCustomerByCustomerID =async(req,res)=> {
    try {
        const CustomerID = req.body.CustomerID
        const data = await CustomerInfoService.GetDetailCusInfoByCustomerID(CustomerID);
        console.log("dataa=>>",data,CustomerID)
        if(data===null){
            return res.status(404).send({
                EC: -1,
                EM: "Not found"
            })
        }
        res.status(200).send({
            EC:0,
            EM:data
        })
    } catch (err) {
        console.log(err + "")
        return res.status(500).send(err)
    }

    
}

const apiCreateCustomerInfo = async(req,res)=>{
    
    try{
        const CustomerInfo = {
            CustomerName: req.body.CustomerName,
            CustomerID: req.body.CustomerID,
            DateOfIssue: new Date(req.body.DateOfIssue),
            PlaceOfIssue: req.body.PlaceOfIssue,
            Gender: req.body.Gender,
            BirthDay: new Date(req.body.BirthDay),
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            Address: req.body.Address
        }
        console.log("the",CustomerInfo)
  // check truyen gia tri thieu
        if(req.body.CustomerID==undefined|req.body.CustomerID==""){
            console.log(req.body.CustomerID)
            return res.status(400).send('Chua nhap CustomerID')
        }
        
        const CustomerID = req.body.CustomerID
        const listCustomerByCustomerID = await CustomerInfoService.GetDetailCusInfoByCustomerID(CustomerID);
        console.log("ida ton tai ==>",listCustomerByCustomerID)
        if(listCustomerByCustomerID){
            return res.status(400).send("CustomerID da ton tai")
        }
        const createCustomerInfo = await CustomerInfoService.CreateCustomerInfo(CustomerInfo);
        res.send(createCustomerInfo);
    }
    catch(err){
        console.log(err+"")
        res.status(500).send("Ban ghi loi, chua tao thanh cong")}
};

const apiPutCustomerInfo = async(req,res)=>{

    const cusInfo= {

        CustomerName: req.body.CustomerName,
        id: req.body.id,
        DateOfIssue: new Date(req.body.DateOfIssue),
        PlaceOfIssue: req.body.PlaceOfIssue,
        Gender: req.body.Gender,
        BirthDay: new Date(req.body.BirthDay),
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        Address: req.body.Address 
    }

    console.log("cus la",cusInfo)
    const updateCusInfo = await CustomerInfoService.PutCustomerInfo(cusInfo)
    console.log(updateCusInfo)
    res.send(updateCusInfo)

}

module.exports = {
    apiGetListCustomerInfo,
    apiCreateCustomerInfo,
    apiPutCustomerInfo,
    apiGetDetailCustomerByCustomerID
}

// var listInfoCustomer = async res => {
//     try {
//         res.json(await infoCustomers.find())
//     }
//     catch (err) { res.send(err) }
// }

// module.exports = app => {
//     app.get("/api/getListCustomers", function (req, res) {
//         listInfoCustomer(res);
//     });

//     app.get("/api/getInfoCustomer/:id", async (req, res) => {
//         try {
//             res.json(await infoCustomers.findById({ _id: req.params.id }))
//         }
//         catch (err) { console.log(err + '') }
//     });

//     app.post("/api/postInfoCustomer", async (req, res) => {
//         try {
//             var infoCus = {
//                 CustomerName: req.body.CustomerName,
//                 id: req.body.id,
//                 DateOfIssue: new Date(req.body.dateOfIssue),
//                 placeOfIssue: req.body.placeOfIssue,
//                 gender: req.body.gender,
//                 BirthDay: new Date(req.body.birthDay),
//                 email: req.body.email,
//                 phoneNumber: req.body.phoneNumber,
//                 address: req.body.address
//             }
//             console.log(infoCus);
//             await infoCustomers.create(infoCus)     
//             listInfoCustomer(res);
//             // res.send("Thanh cong!")
//         }
//         catch (err) { console.log(err + '') }
//     });

//     app.put("/api/putInfoCustomer", async (req, res) => {
//         if (!req.body._id) {
//             return res.status(500).send("ID khong ton tai");
//         } else try {
//             await infoCustomers.updateOne({
//                 _id: req.body._id
//             }, {
//                 CustomerName: req.body.CustomerName,
//                 id: req.body.id,
//                 dateOfIssue: new Date(req.body.dateOfIssue),
//                 placeOfIssue: req.body.placeOfIssue,
//                 gender: req.body.gender,
//                 birthDay: new Date(req.body.birthDay),
//                 email: req.body.email,
//                 phoneNumber: req.body.phoneNumber,
//                 address: req.body.address
//             })
//             listInfoCustomer(res)
//         }
//         catch (err) { res.status(500).json(err) }
//     });

//     app.delete("/api/deleteInfoCustomer", async(req,res)=>{
//         try{
//             await infoCustomers.deleteOne({_id:req.body._id})
//             listInfoCustomer(res);
            
//         }
//         catch(err){res.status(500).json(err)}
//     });
// }