# Smart-Audit (Full Stack frontend, backend & API integrated)
A smart auditing platform where .sol are scanned for vulnerabilities and these  vulnerabilities are detected using slither and flattened on a md file which is then displayed.It is is a responsive static website designed to help users find and resolve vulnerabilities in their smart contract code. It provides a simple interface for uploading contracts, which are then thoroughly analyzed using advanced techniques to detect potential issues. The audit results are displayed on the platform, allowing users to identify and address bugs early on. Users can submit their smart contracts via the homepage or navigation bar and receive detailed reports highlighting vulnerabilities and recommendations. The platform also allows users to view and search their previous audit history for easy access to past reports, ensuring continuous improvement of their contracts.


To start download the project,

 **Navigate to the folder:**
 
activate the environment 

source project/bin/activate (activate environment)

npm build

uvicorn main:app --reload (to start the API)

npm start

If you can't run the dependencies install the following

•	Activate conda or follow my steps above

•	pip3 install solc-select

•	pip3 install slither-analyzer

•	git clone https://github.com/crytic/slither.git 

•	Cd slither 

•	python3 setup.py install

•	Check the version slither –version

•	solc-select install 0.8.4

•	solc-select use 0.8.4

•	Install fastapi

•	Install uvicorn

•	And activate the uvicorn

•	uvicorn main:app --reload
