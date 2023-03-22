
const findMinValueGreatEqual0InArray = (array) => {
    let minIndex = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] >= 0 && (minIndex === -1 || array[i] < array[minIndex])) {
            minIndex = i;   // Cập nhật lại vị trí của số dương nhỏ nhất hiện tại
        }
    }
    return minIndex<0?"Không có giá trị thỏa mãn":minIndex
}

module.exports={
    findMinValueGreatEqual0InArray
}