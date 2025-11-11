

###  DevOps 31st june 2025 - Day 2  – Friday  – Shell Scripting Basics 

Heyy! Today I entered the world of **Shell Scripting** – the brain of Linux automation 
Small commands + logic = full power control over system 

---

###  What I Did Today:

### 1. Created my **first shell script**
- I wrote a `.sh` file with commands inside it
- It runs line-by-line and gives output

### 2.  Learned about **Shebang (#!)**
- That line: `#!/bin/bash`
- It tells the system **which interpreter** to use to run the script (like bash, sh, etc.)
- Without this, system might get confused

### 3.  Ran My Script Using:
```bash
bash script.sh       # normal way
chmod +x script.sh   # give execution permission
./script.sh          # direct run
````

### 4.  Learned about **Comments**

* Anything after `#` is just a comment
* Comments help you or others understand code later

### 5. Variables in Shell

```bash
name="Nova"
echo "Hey $name!"     # Output: Hey Nova!
```

### 6.  Constants (Fixed Variables)

```bash
readonly planet="Earth"
planet="Mars"         #  error, readonly variable
```

### 7. Arrays

```bash
fruits=("apple" "banana" "mango")
echo ${fruits[1]}     # Output: banana
```

### 8. Key-Value Arrays (Associative Arrays)

```bash
declare -A details
details[name]="Nova"
details[power]="Coding Queen"
echo ${details[name]}      # Output: Nova
```

### 9. String Operations

```bash
str="ShellScripting"
echo ${#str}           # Length
echo ${str:0:5}        # Slice → Shell
echo $str" Rocks"      # Concatenate
```

---

## My Folder Structure:

```
day2/
├── 01_basic.sh         # welcome message + date
├── 02_variables.sh     # variables
├── 03_constants.sh     # readonly use
├── 04_arrays.sh        # arrays + associative arrays
├── 07_strings.sh       # string operations
├── 08_user_interaction.sh   #interact with user 
└── README.md           # this file 
```

---



##  What's Next (Day 3 Plan):

* arthimatic operation
* `if`, `else`, `elif` – decision making
* `for`, `while` loops – repeating tasks
* Functions – reuse code like a pro


