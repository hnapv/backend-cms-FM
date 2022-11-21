const InterestRateService = require('../services/InterestRateService')
const _ = require('lodash')

const apiGetListInterestRate = async (req, res) => {
    const listInterestRate = await InterestRateService.GetListInterestRate();
    res.send(listInterestRate);
}

const apiGetInterestRateTableCode = async (req, res) => {
    const InterestRateTableCode = req.params.InterestRateTableCode;
    const listInterestRate = await InterestRateService.getListInterestRateByInterestRateTableCode(InterestRateTableCode);
    console.log('listInterestRate===>', listInterestRate);
    res.send(listInterestRate);
}

const apiCreateInterestRate = async (req, res) => {
    try {
        const interest = {
            InterestRateTableCode: req.body.InterestRateTableCode,
            InterestRateTableName: req.body.InterestRateTableName,
            Term: req.body.Term,
            InterestRate: req.body.InterestRate,
            EffectiveDate: new Date(req.body.EffectiveDate),
        }
        console.log(interest);
        if (_.isNumber(req.body.InterestRate) === false) {

            return res.status(400).send('InterestRate is not a number')
        }
        if (isNaN(Number(new Date(req.body.EffectiveDate)))) {
            console.log(Number(new Date(req.body.EffectiveDate)));
            return res.status(400).send('EffectiveDate is not date type')
        }
        if (isNaN(Number(req.body.Term.slice(0, req.body.Term.length - 1))) | !isNaN(Number(req.body.Term.slice(req.body.Term.length - 1)))) {
            console.log(req.body.Term.slice(req.body.Term.length - 1));
            return res.status(400).send('nhap chua dung dinh dang');
        }

        const Term = req.body.Term
        const EffectiveDate = req.body.EffectiveDate
        const listInterestRate = await InterestRateService.getListInterestRateByTermAndEffective(Term, EffectiveDate)
        console.log('listInterestRate', listInterestRate)
        if (listInterestRate.length > 0) {
            return res.status(400).send('bản ghi đã tồn tại')
        }
        const dataInsert = await InterestRateService.insertInterestRate(interest)
        res.send(dataInsert)

    }
    catch (err) { res.status(500).send("Ban ghi loi, chua tao thanh cong") }
};


module.exports = {
    apiCreateInterestRate,
    apiGetListInterestRate,
    apiGetInterestRateTableCode
}