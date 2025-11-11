  #!bin/bash
echo "what is your name?"
read name
echo "Your name is $name"
#another way to write or run read command
read -p"What is your name?" name
echo "Hello, $name! Welcome to the scripting world"
 


#let's do one fun task:

echo "Choose the option:"
echo "1. show Date"
echo "2. List files:"
echo "3. Who Am I?"
read -p "Enter your choice(1-3): " choice

if [ "$choice" -eq 1 ]; then 
   date
elif [ "$choice" -eq 2 ]; then 
   ls 
elif [ "$choice" -eq 3 ]; then 
   whoami
else
  echo "Invalid option selected."
fi
