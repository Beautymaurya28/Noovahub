git clone <your repo link>
cd foldername //move into the folder
touch readme.txt //now create a text file optional

-and push it
git add .
git commit -m "init"
git push origin main


//create a new branch
git checkout -b feature/about-section //it will make a new branch and switch to the new branch imediatly

//add dummy file
touch about.html
echo "<h1>