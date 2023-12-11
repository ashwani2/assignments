const fs=require("fs")

fs.readFile('abc.txt','utf-8',(err,data)=>{
   let a=data.replace(/\s+/g, ' ');
   fs.writeFile('abc.txt',a,()=>{})
})