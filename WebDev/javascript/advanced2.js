//heigh order function:
//--are the function who accecept the function in parameters
//--basically heigh order function is a function that does at least one of the follwing 
//---1.takes one ormore function as arguments
//--return a function as its result
//--in simple a fucniton thet work with other fucntion (as data)

var arr=[1,2,3,4];
arr.forEach(function(arr){
    console.log(arr);
})


//heigh order function take a fucntion as argument
function ex(fn){
    return fn();
}

//and return a function
function ex1(){
    return function(){
        console.log("i am returned from another function");
    };
}

//--constructor
//it is special fucniton in javascript use to create and intialize the individual object.
//think of its like blueprint for building new objects
//we use new keywords to create an object from constructor
//new:-
//---new does three things
//---1.create an empty object:{}
//---2.sets this to that object
//---3.return the object


//diff btw normal fucntion and constructor function
// fucntion normalfunction(){
      //..
//}

//normal function in which we use this and and we use new keyords when calling and those function in which we use this.


//THIS: window (by default it point window);
//in whcih we wirte those thing which we need 
function exam(){
    this.width=12;
    this.height-22;
    this.color="red";
    this.taste="sugar";
}

//for calling this constructor we use nw like this
var bis1=new exam();
var bis2=new exam();


//when we have to make more than one element of same type then we use constructor.
// function circularbutton(){
//     this.radius=2;
//     this.color=color; //when we want diff color of every btn then we take as argument
//     this.icon=false;
//     this.pressabel=true;
// }

// var redbtn=new circularbutton("red");
// var greenbtn=new circularbutton("green");
//if "this" inside the cinstructor function then when invoke this fucntion using new keyword then it return an object with all of the properties and method inside that function with this keyword

//ex: function abcd(){
        //  this.name="beauty"; //consrtructoe function
//}


//what is first class fucntion:
//first class function we call to those function in which the funciton in that lang aretreated as variable .i can save them ,pass themas arguments.
//in simple way-first class fucniton means we can save the functionin as normal variable or pass as a normal variable

// function abcd(){
   
// }

// abcd(fucntion)



//New keyword--
//---imagine  a empty object in your mind
//----
// function abcd(){
//     this.age=12;
// }
// new abcd()
// {
//     age=12;
// }

//new keyword always create a blank object for the cnstructor funciton which is getting called just after the new keyword

//iife=>Immediately incoked function expressions
//a function that runs immediately after it's defined
//the are of run of function immedeatly in way so that we can make private variabel
// (fucntion(){

// })();
//we usethis to make private variables


// (function abcd(){
//     var a=12;
// })();

// console.log(a);

var ans=(function(){
    var privateval=12;
    return{
        getter:function(){
            console.log(privateval);
        },
        setter:function(val){
            privateval=val;
        }
    }
})();

//setter means we can change the private val


//only we can acces till like no 117 to 120.
//but out of function we can access means only your parents are having the access of your account any one else cannot access.

//we use getter to acces the privatevariable ...when we make the iief fucniton in which we intitalize the variavle as private it automatically make vraiables private so for acces those iief variable we use getter keyword so that wecan access the private variable think it as pass of your insta id you have make you insta id ohk this is iief and you parents is asking about your insta they want to login it in own phone so you have to givethem pass for login so the process of giving pass to parents of your insta id it called getter.



//prototype:
//in js everyfunction has property called .prototype which is used to attach shared properties and methods to all objects created from that fucnion using new.
//prototypes is like something that all objectcan acces
function person(name){
    this.name=name;
}

person.prototype.sayhello=function(){
    console.log("hello,i am" + this.name);
};
const p1=new person("nova");
p1.sayhello();
var obj={
    name:"beauty",
}


function greet(name){
    this.name=name;
}
greet.prototype.greeting=function(){
    console.log(`hii! welcome to ${this.name}`);
};
const p2=new greet("Novahub")
p2.greeting();



function student(names){
    this.names=names;
    this.class=10;
    this.roll=22;
}

student.prototype.details=function(){
    console.log(`the stuent name is ${this.names}`);
};
const p3=new student("beuaty")
p3.details();

//js by default add property called prototype;



//prototype inheritance:
//it is afeature in js where objects can inherit properties and method from other objects  via their prototype chain
//borrow behavior from other objects without copyting them
//inherit some features from parents

var human={
    name:"nbeaiy",
    canfly:false,
    cantalk:true,
    willdie:true
}

//inheritance means for ex one student can eat go walk run and read but another student he can also do all these thing which previous student can do but one thing he can extra do is skecting means he has same features then previous but one thing he can extra do is skecting
var students1={
    eat:true,
    laugh:true,
    walk:true,
}

var students2={
    sketch:true,
}

students2.__proto__=students1;

//"this" keyword:
//whenever anyhting doesnot inside the {} this brackets then we called it global scope otherwise local scope.
console.log(this);
//in global scope the value of this is window
//and in function scope tha value of this is window
 function abcd(){
console.log(this);
}

//a function which is inside the object is called method
var obj={
    name:"beau",
    baatkaro:function(){
        console.log(this);
    }
}
obj.baatkaro();

//global =>value of this window
//function=>the valueof this is window
//method=>the value of this is method

//in any method this keywordis always refer to parents objects


//event listeners: 
//in event listiners this keyword always refers to whatever writeen before addeventlisteners

//for ex:
// var button=document.querySelector("button");
// button.addeventlistiners("click",function(){
//      console.log(this);//this will refer to button bcoz before add eventlistiners button is written
// })



//call apply bind=>if you have any function and any object and you have to run the function on that object 

function abcd(){
    console.log(this);//in this "this" refer to window
}
var obj={age:24}
abcd.call(obj)//but when we are doing this in this this is refering to obj

