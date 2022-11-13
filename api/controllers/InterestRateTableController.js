const InterestRateService = require('../services/InterestRateService')
const _ = require('lodash')

const apiGetListInteresRate = async (req, res) => {
    console.log('apiGetListInteresRate==========>')
    res.sendStatus(200)
}

const apiCreateInterestRate = async (req, res) => {
        const interest = {
            InterestRateTableCode: req.body.InterestRateTableCode,
            InterestRateTableName: req.body.InterestRateTableName,
            term: req.body.term,
            InterestRate: req.body.InterestRate,
            effectiveDate: new Date(req.body.effectiveDate),
        }
        if (_.isNumber(req.body.InterestRate) === false) {
            res.sendStatus(400).send('InterestRate is not a number')
        }
        const term = req.body.term
        const effectiveDate = req.body.effectiveDate
        const listInterestRate = await InterestRateService.getListInterestRateByTermAndEffective(term, effectiveDate)
        console.log('listInterestRate', listInterestRate)
        if (listInterestRate.length > 0) {
            return res.sendStatus(400).send('bản ghi đã tồn tại')
        }
        const dataInsert = await InterestRateService.insertInterestRate(interest)
        res.send(dataInsert)
    };


module.exports = {
    apiCreateInterestRate,
    apiGetListInteresRate
}