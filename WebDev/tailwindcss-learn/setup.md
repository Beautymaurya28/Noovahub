### How to setup tailwind Css

## Step 1: Create a new project folder

mkdir tailwindcss-learn
cd tailwindcss-learn

##  Step 2: Initialize npm

npm init -y

This creates `package.json`.

##  Step 3: Install Tailwind + CLI + PostCSS

npm install -D tailwindcss tailwindcss-cli postcss autoprefixer

##  Step 4: Generate config files
-for window:
.\node_modules\.bin\tailwindcss-cli.cmd init -p

This creates:
tailwind.config.js
postcss.config.js

## Step 5: Create input CSS

Make a src folder and inside it add input.css:

css
@tailwind base;
@tailwind components;
@tailwind utilities;


## Step 6: Update `package.json` scripts

Open package.json and add this under "scripts":

"scripts": {
  "build:css": "tailwindcss-cli -i ./src/input.css -o ./dist/output.css --watch"
}

##  Step 7: Create HTML file

make index.html :
---your html code


## Step 8: Build Tailwind

Run:
npm run build:css

It will create `dist/output.css` and keep watching.