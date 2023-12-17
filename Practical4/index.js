var counter=2
var para =document.querySelectorAll(".table");
var numberOfPara = para.length;
var rowCount=0;
var fs=20;
function printRow(){
var randomColor=Math.floor(Math.random()*16777215).toString(16)
para[rowCount].style.fontSize=fs+'px'
para[rowCount].style.color="#"+randomColor
for(var i=1;i<=10;i++){
para[rowCount].textContent=para[rowCount].textContent+" "+(counter*i);
}
counter++;
fs=fs+10;
rowCount++;
if(rowCount>=numberOfPara){
clearInterval(intervalIdWithLimit)
}
}
printRow()
const intervalIdWithLimit = setInterval(printRow,5000)