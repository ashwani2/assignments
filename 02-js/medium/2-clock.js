
setInterval(() => {
    let date=new Date().toLocaleString().split(',')[1]
    console.log(date)  
}, 1000);

clearInterval()