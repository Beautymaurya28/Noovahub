merging is the process of taking changes from one branch(like feature/about-section) and applying them into another branch(like main)



in simple:
-Tu ne feature/about-section me kaam kiya
-Ab tu chahti ho ki wo main branch me jud jaye
-Git Merge bolta: “Thik hai boss, mila dete hain!”



git checkout main # Main branch pe jaao
git merge feature/about-section # Feature ka content le aa main me


two way to merge:
-local merge:via terminal(git merge command in vs code)
-Github merge:via pull request(click "merge pr" button on github)