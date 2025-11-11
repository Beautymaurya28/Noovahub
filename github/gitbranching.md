whenever you make a folder so git doesnot know any thing about your folder so we do initialize the folder (git init)
so after initialization git known about your folder  can track your folder
so now we can create untrackedtracked ,modifies ,stages and saves checkpoints
by default the file or folder is untracked
git can do some interesting thing like you can check your which file on which stages (git status -s),check how much saved points (git log --oneline --graph)

git status tells only those file status which is not committed  or have change after committed
git status tells the changes of file and this is happen before commit or after commit

git log -tells about commit history
git status-tells about before and after commit

process:-
1.intialize



//branching:
--create a  a seperate file of development of work on a feature ,fix or epxperiment without affecting the main(stable) code
---duplicate copy of main part and don some task on this and then later merge it to the main part

