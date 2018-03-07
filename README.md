# Hackathon Examples

# High Level Business Case Motivation
## Healthcare blockchain
- In healthcare, HIPAA compliance is extraordinarily important. What we do to ensure that companies can comply is have a two tier system. In one user flow a doctor can add prescriptions to a list that is added to Oracle Blockchain. Because of the technical details of how the blockchain is configured, this ledger is indisputable and 'none-hackable' (or at the very least, very difficult). In another user flow a pharmacist can see the prescriptions that are available to be fulfilled, and fill or deny them. This also alters the blockchain ledger. A third party can then verify that these transactions were performed properly.
## Financial Blockchain
- We have a similar need for an indisputable ledger in finance. In this program I take real time stock data and add it to a blockchain ledger to simulate how a stock exchange might secure its transactions. However the security of transactions in finance generally is hugely important, so this use case can be generalized from everything from options trading to asset backed securities such as mortgages. I then allow a user to "buy" or "sell" stock and add these transactions to the blockchain, only allowing a sale if the user attempts to sell below the exchange price or allow a purchase if the user attempts to buy over the exchange price.
* **Major Caveat!**  The api service I use, *AlphaVantage*, is a real time streaming service that offers free stock market quotes for developers (free stock services are hard to find generally, which is why it is the service we use). It is sometimes under heavy load and, since it is a free service, they're site is not always available because servers are expensive. Because of this, the site may not be available to use at all times! For this reason we are not going to be demoing this application live, but feel free to try it on your own. Visit https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo to see if the API endpoint the program calls is active. If you get a JSON return, it's good to go!

# 🙃 Now the fun part 🎉 *Oracle BlockChain* ⛓🔥

![alt text](./DeploymentPics/Screenshot102.png)
![alt text](./DeploymentPics/Screenshot103.png)
![alt text](./DeploymentPics/Screenshot104.png)
![alt text](./DeploymentPics/Screenshot105.png)
![alt text](./DeploymentPics/Screenshot106.png)
![alt text](./DeploymentPics/Screenshot107.png)
![alt text](./DeploymentPics/Screenshot108.png)
![alt text](./DeploymentPics/Screenshot109.png)
![alt text](./DeploymentPics/Screenshot110.png)
![alt text](./DeploymentPics/Screenshot111.png)
![alt text](./DeploymentPics/Screenshot112.png)
![alt text](./DeploymentPics/Screenshot113.png)
![alt text](./DeploymentPics/Screenshot114.png)
![alt text](./DeploymentPics/Screenshot115.png)
![alt text](./DeploymentPics/Screenshot116.png)
![alt text](./DeploymentPics/Screenshot117.png)
![alt text](./DeploymentPics/Screenshot118.png)
![alt text](./DeploymentPics/Screenshot119.png)
![alt text](./DeploymentPics/Screenshot120.png)
![alt text](./DeploymentPics/Screenshot121.png)
![alt text](./DeploymentPics/Screenshot122.png)
![alt text](./DeploymentPics/Screenshot123.png)
![alt text](./DeploymentPics/Screenshot124.png)
![alt text](./DeploymentPics/Screenshot125.png)
![alt text](./DeploymentPics/Screenshot126.png)
![alt text](./DeploymentPics/Screenshot127.png)
![alt text](./DeploymentPics/Screenshot128.png)
![alt text](./DeploymentPics/Screenshot129.png)
![alt text](./DeploymentPics/Screenshot130.png)
![alt text](./DeploymentPics/Screenshot131.png)
![alt text](./DeploymentPics/Screenshot132.png)
![alt text](./DeploymentPics/Screenshot133.png)
![alt text](./DeploymentPics/Screenshot134.png)
![alt text](./DeploymentPics/Screenshot135.png)
![alt text](./DeploymentPics/Screenshot136.png)
![alt text](./DeploymentPics/Screenshot137.png)
![alt text](./DeploymentPics/Screenshot138.png)
![alt text](./DeploymentPics/Screenshot139.png)
![alt text](./DeploymentPics/Screenshot140.png)
![alt text](./DeploymentPics/Screenshot141.png)
![alt text](./DeploymentPics/Screenshot142.png)
![alt text](./DeploymentPics/Screenshot143.png)
![alt text](./DeploymentPics/Screenshot144.png)
![alt text](./DeploymentPics/Screenshot145.png)
![alt text](./DeploymentPics/Screenshot146.png)
![alt text](./DeploymentPics/Screenshot147.png)
![alt text](./DeploymentPics/Screenshot148.png)
![alt text](./DeploymentPics/Screenshot149.png)
![alt text](./DeploymentPics/Screenshot150.png)
![alt text](./DeploymentPics/Screenshot151.png)
![alt text](./DeploymentPics/Screenshot152.png)
![alt text](./DeploymentPics/Screenshot153.png)
![alt text](./DeploymentPics/Screenshot154.png)
![alt text](./DeploymentPics/Screenshot155.png)
![alt text](./DeploymentPics/Screenshot156.png)
![alt text](./DeploymentPics/Screenshot157.png)
![alt text](./DeploymentPics/Screenshot158.png)
![alt text](./DeploymentPics/Screenshot159.png)
![alt text](./DeploymentPics/Screenshot160.png)
![alt text](./DeploymentPics/Screenshot161.png)
![alt text](./DeploymentPics/Screenshot162.png)
![alt text](./DeploymentPics/Screenshot163.png)
![alt text](./DeploymentPics/Screenshot164.png)
![alt text](./DeploymentPics/Screenshot165.png)
![alt text](./DeploymentPics/Screenshot166.png)
![alt text](./DeploymentPics/Screenshot167.png)
![alt text](./DeploymentPics/Screenshot168.png)
![alt text](./DeploymentPics/Screenshot169.png)
![alt text](./DeploymentPics/Screenshot170.png)
![alt text](./DeploymentPics/Screenshot171.png)
![alt text](./DeploymentPics/Screenshot172.png)
![alt text](./DeploymentPics/Screenshot173.png)


# *Important Last Step*
- We need to link our blockchain network credentials with our backend service, so the two can pass information.
- We have an environment file `.env` located at `/Healthcare Example/BACKEND/.env`. There are currently empty credentials in there, as you should never put your server credentials on a public github repository.


# Running Program Locally and Pushing to Application Contain Cloud Service
- To walkthrough the requirements to start these programs and push the backend code to Oracle Application Container Cloud Services please continue reading. We will be following along with testing and uploading the healthcare application, but the finance application is available to experiment with on your own.

# What is here and what are we doing?
## What's here?
- There are two different folders here, both an example of using a blockchain on Oracle Blockchain service. There is a Finance Example and a Healthcare Example. The finance example folder contains a frontend in React, a javascript framework, and a backend in Golang. It shows an example of how to add information from a stock API service (http://www.alphavantage.com) to a blockchain, add real time price information to the blockchain, and how to add buy and sell data from you, the user, and add that to the block chain. The health care example has a frontend in React, and a backend in Node.js. The healthcare example has a doctor page and a pharmacist page. A doctor can add prescriptions to the blockchain and a pharmacist can retrieve and fill those prescriptions.
## What are we doing?
- This README file will show you how to load these files to Application Container Cloud Service, a software as a service (SaaS) platform that pipelines code to the cloud. The following steps are broadly similar to those outlined here (http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/go/getting-started-go-accs/getting-started-go-accs.html) for the finance application and here (http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/getting-started-node-accs/getting-started-node-accs.html) for the health care application, but slightly more tailored for our use case. Important thing to note: we are only going to push the backend portion to ACCS, our frontend we will continue to run on localhost.

# First Things First
## Let's run these apps.
- To run the healthcare application in from localhost (your localmachine), first make a terminal window and `cd` into the `FRONTEND` folder. Type `npm install` enter, and then `npm start`. This should start the frontend of the application, however we also need to start the backend. The next step is to `cd` into the `BACKEND` folder, and follow the same steps (as they are both javascript applications); `npm install` followed by `node app.js`.
- To run the finance application you can do the same for the frontend, `cd FRONTEND` and then `npm install` then `npm start`. For the backend, after `cd BACKEND`, `cd src` and `./start.sh`. The `start.sh` file is a bash script that executes terminal commands after being run (pretty sweet). If you'd like to know more about how Golang is compiling and being run you can take a look in the `start.sh` file and try the steps manually in your terminal.

# Pushing to Application Container Cloud Services

## Healthcare Application
### First zip your files
- First thing that we have to do is take our backend files and create a zip. In your file explorer navigate to the `BACKEND` folder, select `app.js`, `manifest.json`, `package-lock.json`, and `package.json` and zip them according to how your operating system is configured (in varies on macOS and Windows computers).
### The next steps are largely similar to what is available in the Oracle Documentation.
- Log in to Oracle Cloud at (http://cloud.oracle.com/) with the credentials provided for you by your hackathon mentors.
- In the Oracle Cloud Services dashboard, click the Action menu Menu, and select Oracle Application Container Cloud Service.
- To open the Oracle Application Container Cloud Service console, click Services.
- In the Applications list view, click Create Application and select Node.
- In the Application section, enter a name for your application and click Browse.
- On the File Upload dialog box, select the name of the zip file you created in your file explorer and click Open.
- Keep the default values in the Instances and Memory fields and click Create.
- Wait until the application is created. The URL is enabled when the creation is completed.
### Now one more thing!
- We have zipped and pushed our backend files to the cloud. We now need to make sure that our APIs can point to the backend. Luckily we have an `env.json` file that contains the API root that we are going to use.  Navigate to the root of `FRONTEND` to find the `env.json` file. Copy the path of the url that you created in the previous section into this this file where the current path name exists in quotes. Now you can `npm start` to restart your server and you are now accessing ACCS!

- More documentation here: (http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/getting-started-node-accs/getting-started-node-accs.html)


## Finance Application
### IMPORTANT NOTE
- If you have not yet downloaded and installed the Go language made by Google, you will need to do so if you would like the `BACKEND` to compile on your local machine. If you do not want to do so, that is OK, pushing to ACCS and compiling there should still work. Information about downloading and install the Go programming language can be found here (https://golang.org/dl/).
### First zip your files
- First thing that we have to do is take our backend files and create a zip. In your file explorer navigate to the `BACKEND/src` folder, select `backendBLOK`, `github.com`, `golang.org`, `manifest.json`, and `start.sh` and zip them according to how your operating system is configured (in varies on macOS and Windows computers).
### The next steps are largely similar to what is available in the Oracle Documentation.
- Log in to Oracle Cloud at (http://cloud.oracle.com/) with the credentials provided for you by your hackathon mentors.
- In the Oracle Cloud Services dashboard, click the Action menu Menu, and select Oracle Application Container Cloud Service.
- To open the Oracle Application Container Cloud Service console, click Services.
- In the Applications list view, click Create Application and select Node.
- In the Application section, enter a name for your application and click Browse.
- On the File Upload dialog box, select the name of the zip file you created in your file explorer and click Open.
- Keep the default values in the Instances and Memory fields and click Create.
- Wait until the application is created. The URL is enabled when the creation is completed.
### Now one more thing!
- We have zipped and pushed our backend files to the cloud. We now need to make sure that our APIs can point to the backend. Luckily we have an `env.json` file that contains the API root that we are going to use. Navigate to the root of `FRONTEND` to find the `env.json` file. Copy the path of the url that you created in the previous section into this this file where the current path name exists in quotes. Now you can `npm start` to restart your server and you are now accessing ACCS!


- More documentation here: (http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/go/getting-started-go-accs/getting-started-go-accs.html)
