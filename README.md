#Udacity's React Fundamentals course Project 2

#Instruction for setup:

1) Install the required dependencies:
* `./api-server/npm install` 
* `./frontned/npm install`

2) Start the server:
* `./api=server/npm start`

3) Start the frontend:
* `./frontend/npm start`


## Source code layout
```bash
├── api-server   # api server
└── frontend
      ├── node_modules # libraries
      ├── package.json # npm package manager file.
      ├── public
      │     └── index.html
      │
      └── src
           ├── index.js
           ├── index.css
           ├── App.js
           ├── App.css
           ├── views
           │     ├── addNew.js
           │     ├── categoryView.js
           │     ├── postView.js
           │     ├── rootView.js
           │     └── topMenuBar.js 
           │  
           ├── utils
           │    └── ConstantTypes.js
           │
           ├── subComponents
           │     ├── CategoryOptionBlock.js
           │     ├── component_list.js
           │     └── table.js
           │
           ├── utils
           │    └── index.js
           │
           ├── APIs
           │    └── BlogpostAPI.js
           │
           └── utils
                └── index.js