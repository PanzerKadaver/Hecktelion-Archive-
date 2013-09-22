HecktelionLegacy
================

A tactical/rpg space adventure in node.js / jQuery / HTML5 / CSS3

http://hecktelion-skullgearstudio.rhcloud.com/

================

OpenShift ProTip #1:

If you want to use a different db name than 'your-app-name', you have to add manually credential.

Step1:
On a terminal, launch the port forwading protocol ('rhc port-forward your-app-name')

Step2:
On another terminal, launch the mongo shell ('mongo')

Step3:
On mongo shell, switch to admin db ('use admin'), then authenticate yourself with your credential ('db.auth('login', 'password')').

The mongo server answer '1' if everything is ok.

If you don't remember your mongo credential, see Step A.

Step4:
Switch to your new db. ('use my-new-db')

Step5:
Add credential (exactly the same that in Step3) : db.addUser('login', 'password')

Step6:
Alright, now you can use another db than the default db supplied by openshift.

Step A:
To get your mongodb credential:
- ssh yourself to your gear (rhc app ssh -a your-app-name)
- grep mongodb info ('env | grep MONGO')
- your admin login is at OPENSHIFT_MONGODB_DB_USERNAME field
- your admin password is at OPENSHIFT_MONGODB_DB_PASSWORD field

================