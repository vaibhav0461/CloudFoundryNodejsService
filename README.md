### Step 1: Create your application
1. Create a new dedicated directory for your Node.js application called **nodetutorial** and another directory inside it called **myapp**.
2. To start the application setup, change to the myapp directory and execute **npm init** in the command line. This will walk you through creating a **package.json** file.

```
user@host:~/nodetutorial/myapp
=> npm init
```
Use the values from the table below. If no specific value for a property is needed at this point (# at the value table below) so just hit enter.

Field Name | 	Value
------------ | -------------
package |	myapp
version	| #
description	| this is my first node app
entry point	| server.js
test command	| #
git repository |	#
keywords	| #
author	| #
license	| #

Open the **package.json** in your **myapp** directory and compare it to the shown result.
```
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "this is my first node app",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
  }
}
```
> All npm packages contain a file, usually in the project root, called package.json. This file holds various metadata relevant to the project. This file is used to > give information to npm that allows it to identify the project as well as handle the project’s dependencies. The package.json file is located at the root
directory of a Node.js project.

Create a file called **server.js** (which will act as your web server) in the **myapp** folder and copy the following code to this file and save it:
```
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
```

### Step 2: Download dependencies
Your application is almost ready. Before you actually can access the web server, there’s the need to download the required modules. If you have a look at the **server.js** file you created in the previous step, the **express-module** is used there but not yet available on your machine. Therefore, run the following command to let npm take care of the dependencies:

```
user@host:~/nodetutorial/myapp
=> npm install express
```
You should now have a newly (automatically) created directory **node_modules** in the **myapp directory**, where all the dependency modules are located. The **package.json** will be updated with the installed module(s).

You should now have the following directory structure:
```
nodetutorial
└── myapp
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    └── server.js
```

### Step 3: Start your application
Now the application and can be started locally. Simply start it with the following command:
```
user@host:~/nodetutorial/myapp
=> node server.js
```
You should see **myapp listening on port 3000** on your command line if everything went well. You should also get a **Hello World** response when accessing your web server at http://localhost:3000.

### Step 4: Create the manifest file
Now we will start the deployment process of our nodejs app to cloud foundry. 

Create a **manifest.yaml** file in the **nodetutorial** directory. This file is the deployment descriptor and contains all required information to deploy an application to a SAP Cloud Platform Cloud Foundry instance.

Copy the following content to the recently created file:
```
--
applications:
- name: myapp
  random-route: true
  path: myapp
  memory: 128M
```

The property **random-route** will generate a route, which does not conflict with any other application in the same Cloud Foundry instance.

You should now have the following directory structure:
```
nodetutorial
├── manifest.yaml
└── myapp
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    └── server.js
```

Explanation for the manifest properties:

Property Name	| Value
------------ | -------------
name	| The application name with which the application will be deployed on Cloud Foundry.
host	| Where the application (subdomain of the SAP Cloud Platform region) should be reachable.
path	| The path of the local file system from which the content/artifact has to be deployed.
memory	| The memory quota which should be allocated for this application.
random-route | if this property is set to true, Cloud Foundry will assign a random route (URL) to the application

### Step 5: Push the app to your SAP Cloud Platform Cloud Foundry space
For pushing app to Cloud Foundry from Command Prompt you need to install CLI into your system
You can find installation link below

**For MacOSx and Linux**
https://docs.cloudfoundry.org/cf-cli/install-go-cli.html

**For Windows**
https://packages.cloudfoundry.org/stable?release=windows64&version=v7&source=github

Login to your cloud foundry account in which you want to deploy the app. 
For detailed login step please refer the [guide](https://developers.sap.com/tutorials/cp-cf-download-cli.html).

After login to Cf account run the below command inside the **nodetutorial** directory to start the deployment process:-
```
user@host:~/nodetutorial
=> cf push
```

### Step 6: Figure out the application URL
After deployment is completed you should see the URL of the app in the console output.

![deployment url](/image/deployment_url.png)

### Step 7: Protecting app by OAuth2.0 mechanism

