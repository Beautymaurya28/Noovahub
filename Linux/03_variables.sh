#!/bin/bash
user=$(whoami)
echo "you are logged in as $user"
user=$(pwd)
echo "my location is  $user"
#variables to store the output of the command
HOSTNAME=$(hostname)
echo "name of this machine is $HOSTNAME"
#constant variable
readonly  name="beauty"
echo "constant name $name"
