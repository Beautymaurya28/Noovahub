y#!/bin/bash
myvar="hey buddy! how ar you?"

echo "$myvar"
#concatenation
first="beauty"
last="maurya"
full="$first $last"
echo  $full

#length
greet="hello Buddy"
echo ${#greet}
#substring 
text="DevOpsjOURNEY"
echo ${text:0:4}
echo ${text:7}
#replace part of string
greet="heelo Buddy"
echo ${greet/Buudy/World}

#convert to upper case
name="nova"
echo ${name^^}
word="nebula"
echo ${word,,}
#check if string contains something
msg="Linux is amazing"
if[[$msg == *"Linux"*]];
echo "yes, Linux Found!"
fi

#string comparison
a="DEVOPS"
b="devops"
if["$a" = "$b"];
echo "Same"
else
echo "Different"
fi



