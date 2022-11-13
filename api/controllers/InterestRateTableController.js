var InterestRateTable = require ('../models/InterestRateModel');

var listInterestRate= async res =>{
    try{
        res.json(await InterestRateTable.find())
    }
    catch (err) { res.send(err) }
}

module.exports= app=>{
    app.get("/api/getlistInterestRate",function(req,res){
        listInterestRate(res);
    });

    app.get("api/getInterestRate/:id",async(req,res)=>{
        try{
            res.json(await InterestRateTable.findById({_id:req.params.id}))
        }
        catch(err){console.log(err+'')}
    });


// Model.find({ term: body.term, effectiveDate: body.effectiveDate})

    app.post("/api/postInterestRate",async(req,res)=>{
        
        var interest = {
            InterestRateTableCode: req.body.InterestRateTableCode,
            InterestRateTableName: req.body.InterestRateTableName,
            term: req.body.term,
            InterestRate: req.body.InterestRate,
            effectiveDate: new Date(req.body.effectiveDate),
        } 
        if(res.json(await InterestRateTable.find({
            term:req.body.term,
            effectiveDate: req.body.effectiveDate}))){
            return res.status(500).send("Ky han da ton tai");
        }
        else 
        try{
            await InterestRateTable.create(interest)
            console.log(interest);
            listInterestRate(res)
        }
        catch(err){console.log(err+"")}
    });
}