#!/bin/bash
#array:
student=(rohan druv ravi priya kavita)
echo ${student[0]}
for item in "${student[@]}"
do
echo $item
done
#second example
fruits=(banana apple grapes guava orange)
for item in "${fruits[@]}"
do 
echo $item
done
echo "${fruits[3]}"
echo "${#fruits[@]}"
#updating an array element
fruits+=(pineappli carrot)
echo "upadteing array ${fruits[@]}"

#array key value
declare -A profile
profile[name]="Nova"
profile[bestie]="Nebula"
profile[project]="Learnex"
profile[Mood]="Ultra swag"

echo ""
echo "Looping through all key-value pairs:"
for key in "${!profile[@]}"
do 
echo "$key=>${profile[$key]}"
done

