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
            term: req.body.term,
            InterestRate: req.body.InterestRate,
            effectiveDate: new Date(req.body.effectiveDate),
        }
        console.log(interest);
        if (_.isNumber(req.body.InterestRate) === false) {

            return res.status(400).send('InterestRate is not a number')
        }
        if (isNaN(Number(new Date(req.body.effectiveDate)))) {
            console.log(Number(new Date(req.body.effectiveDate)));
            return res.status(400).send('EffectiveDate is not date type')
        }
        if (isNaN(Number(req.body.term.slice(0, req.body.term.length - 1))) | !isNaN(Number(req.body.term.slice(req.body.term.length - 1)))) {
            console.log(req.body.term.slice(req.body.term.length - 1));
            return res.status(400).send('nhap chua dung dinh dang');
        }

        const term = req.body.term
        const effectiveDate = req.body.effectiveDate
        const listInterestRate = await InterestRateService.getListInterestRateByTermAndEffective(term, effectiveDate)
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