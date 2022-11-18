var arraay = [
    {

      OrderNo: '123123/2022/HTDT/ANHVP',
      number: 5
    },
    {

      OrderNo: '103123/2022/HTDT/ANHVP',
      number: 69
    }
  ]

 var test = arraay.map(t => t.OrderNo)



function laygiatri(a) {
    let chuso = 0;
    for(let i=0;i<2;i++){
        chuso = (a[i].split("/"))[0]
       console.log(chuso);
    }
    return chuso

}

console.log(Math.max(laygiatri(test)))

//  var giatrimax = Math.max(...)