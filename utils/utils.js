
const findMinValueGreatEqual0InArray = (array) => {
    let minIndex = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] >= 0 && (minIndex === -1 || array[i] < array[minIndex])) {
            minIndex = i;   // Cập nhật lại vị trí của số dương nhỏ nhất hiện tại
        }
    }
    return minIndex<0?"Không có giá trị thỏa mãn":minIndex
}
const findApplicablePolicyRate = async (ListPolicyRate,OrderDate)=>{
    const orderDateMinusEffDate = await ListPolicyRate.map(({ effectiveDate }) => (OrderDate.getTime() - +effectiveDate.getTime()))
    const indexPolicyRate =  findMinValueGreatEqual0InArray(orderDateMinusEffDate)
    const applicablePolicyRate =  ListPolicyRate[indexPolicyRate]
    return applicablePolicyRate
}

const findWorkDayAfter = (date,listHoliday)=>{
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < listHoliday.length; j++) {
            if (date.getDay() == 0 | date.getDay() == 6 | date.getTime() == listHoliday[j].dateHoliday.getTime()) {

                date = new Date(date.setDate(date.getDate() + 1))
            }
        }
    }
    return date
}

module.exports={
    findMinValueGreatEqual0InArray,
    findApplicablePolicyRate,
    findWorkDayAfter
}