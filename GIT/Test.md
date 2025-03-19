# Working on Conflicts

What triggers a conflict?

Merge conflicts typically arise when:

1. Two or more developers make changes to the same lines of code in different branches.
2. One branch edits a file while another branch deletes the same file.
3. Changes are made to the same file in different branches, and Git can't automatically determine which version to keep.

How Git handles conflicts:

 When a merge conflict occurs, Git marks the conflicting sections of the file with special markers (e.g., "<<<<<<<", "=======", ">>>>>>>") to indicate the conflicting regions.

Resolving conflicts:

1. You need to manually edit the file, identify the conflicting sections, and decide which changes to keep or how to combine them. 
2. Remove the conflict markers and make the necessary edits. 
3. Stage the resolved file using git add and commit the changes to finalize the merge. 

Preventing conflicts:

1. Regularly merge your branches to minimize divergence and potential conflicts. 
2. Communicate with your team to avoid working on the same files or lines of code simultaneously. 
3. Review changes before merging to identify potential conflicts early on

Create a Repo

Now create a simple js file(index.js) and some script

window.alert("hello, I'm Ram");
window.alert(" hi, I'm karan ");

Create a branch in the repo with yourname/feature1

Switch to this new branch,

Edit the second message

Where you'll face merge conflicts, in order to solve them we get to choose specific options which look like as mentioned below:

! [Merge Conflict example](csforbeginners.png)

where you can see the options like (Accept Current change|Accept incoming change|Accept both changes|compare changes) in the figure, choose one required option and compare the changes with branches.
