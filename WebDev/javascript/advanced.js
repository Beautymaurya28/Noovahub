///js--1.es5 and 2.es6 (two version have javascript)
//es5 are basic it has only var
//es6 are adv it has letand const


//es5+es6====var let const
//older javascript = var only
//new javascript = let+const+var

//var vs let vs const
//--var is function scoope; //varcan use wverywhere in there parents function
//var add itself tothe window object
//--let is braces scoped
//let const doesnot adds


//for ex:
function abcd(){
    for(var i=0;i<10;i++){
        console.log(i);
    }
    console.log(i);
}

abcd();


function abcd1(){
    for(let i=0;i<10;i++){
        console.log(i);
    }
    // console.log(i);//error
}
abcd1();


//there is not all thing in js but we use it because those thing which is not avaialable in js are given by our browser

//window objects: are those types object which is part of window browser in which javascript related features is avilable on window browser ,and javascript take those features from browser if needed


// alert


//window context: each tab/window has its own window object(global context)
//browser context api: In JavaScript, the term "browser context API" generally refers to the various Application Programming Interfaces (APIs) that the web browser exposes to JavaScript code, allowing it to interact with and control different aspects of the browser environment and the web page. It encompasses a broad range of functionalities rather than a single, specific API called "Browser Context API."


//stack: LIFO-Last in first out

//heapmemory: whatever we make stories ond data we haveto store it somewhere so for that we use heapmemory
//we can say the computer which use to store the data for while or temp 


//execution context: whenever we will run function function will make a imaginary container in that container thereis threethings 
//---1.variables
//---2.function inside that parents function
//---3.lexical environment of that function
//---this container imaginary is called execution context

//--function chalate ke sath 
//1.sbse pehla bnta hai imginarnary dabbad (execution context)
//---lexical enivornment: it tells inwhich thingsyou can acces or which you cannot
function abd(){
    var a=12;
    function def(){
        var b=12;
    }
}


//lexical envornment: A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code
//execution context: it is a container where the function's code is executed and it's creataed whenever a function is called ,it contains things ,variables,function and lexical enironmentof that function


//or we can say lexical environment is like a chart in which it is written(lexical) that which things your function can access and which not;
//means it holds it's scope and scope chain

var a=[1,2,3,4,5];
var b=[...a];//...=>spread operater its means copy the value of a arrayand put it where where the spread operator is 
b.pop();
console.log(a);
console.log(b);


var obj={name:"beauty"};
var copyobj={...obj};
console.log(copyobj)

//truthy and falsy:
// falsy:0 false undefined null NaN document.all (these all value is called truthy);
// truthy value: which value is not falsy is called truthy 1,true,defined
if(7){//truthy 
    console.log("hey");
}else{
    console.log("hello")
}

//switch case:
// switch(1){
//     case 1:
//         break;
//     case 2:
//         break;
//     default:
// }

//do while
//at least one times it will run before condition

//foreach look:it only run on array when you have one array then in that case foreach loopcome.
var a=[1,2,3,4,5,6,7,8,5,89,0];
a.forEach(function(a){
    console.log(a+2);
})

//foreach do never changes by default in your array,it gives after make changes but in temporay copy that's ehy it is walys same
var obj={
    name:"harsh",
    age:24,
    city:hopal
}
for(var key in obj){
    console.log(key,obj[key]);
}



//do while
var k=19;
do{console.log("hey");
    a++;
}while(a<15)


//cal back fncs
//--callback functiom is a function thet is passes as an arguments another function and is executed after some operations has been completed
//--a function passed to another function to be called later

setTimeout(function(){
        console.log("2 second baad chlaa")
},2000)//aschrojenus js
