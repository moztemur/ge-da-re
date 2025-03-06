## Dev Env and Tools Used

- MacOS Sequoia 15.2
- Docker
  - Docker Desktop for Mac: 4.37.1 (178610)
  - Docker Engine: 27.4.0
  - Docker Compose: v2.31.0-desktop.2
- Node.js: v20.11.1

## How to Run the App

Clone the repo to the machine.

In the main directory, run the following command:

```bash
docker compose up -d  --build

# uses .env file to set environment variables by default
```

This command starts
- the backend on `localhost:3000`
- the frontend on `localhost:3001`
  - This command starts frontend with backend url as `x.xyz.com`, which is set in `.env` file
- MongoDB on `localhost:27017`
  - It starts with pre-populated data
- (Optional) MongoDB Express on `localhost:8087`
  - to browse and modify MongoDB data

### NOTE ABOUT `x.xyz.com` AND `y.xyz.com`:
I might get it wrong what it is meant by `x.xyz.com` and `y.xyz.com`. I assumed that you want to run the frontend on `x.xyz.com` and the backend on `y.xyz.com`. I assume that either you are going to run the app on remote machine with required DNS configs done, or you are going to run it on your local machine by editing your hosts file in your local machine.

Since frontend should make the backend api calls to `x.xyz.com`, I set `BACKEND_URL` (it is used by Frontend) in `.env` file to `x.xyz.com`.

As for setting `y.xyz.com`, I couldn't understand why and where to set it. If it is to allow backend to get requests from `y.xyz.com`, then I already allow all domains in CORS config of backend.

If you run the app on your local machine with this method and open the frontend app on `http://localhost:3001`, and you didn't run the backend behind `x.xyz.com` yet, you will get an error since frontend tries to find the backend on `x.xyz.com`, which is not available yet.

**If I misunderstood the requirement, please let me know. I can reconfigure and fix it if I get clarified**

## (Alternative) How to Run the App Locally

Clone the repo to your local machine.

In the main directory, run the following command:

```bash
docker compose --env-file ./.env.local up -d  --build

# it will use .env.local file to set environment variables. it 
```

This command starts
- the backend on `localhost:3000`
- the frontend on `localhost:3001`
- MongoDB on `localhost:27017`
- (Optional) MongoDB Express on `localhost:8087`

## Data

I use MongoDB as the database for this project. Data to be used in this project is in the path: `/data/sample.json`. You can modify it or add more data if you want. But you will have to rerun MongoDB to see the changes.

```bash
docker compose down mongo -v
docker compose up -d mongo
```

Alternatively you can use Mongo Express to see and modify the data. You can navigate to `localhost:8087` on your browser to see the interface.

The data is uploaded to MongoDB automatically when the container starts using a bash script in the path: `/data/mongo/init-mongo.sh`.

There is also a Python script in the same directory to generate the sample data, but you shouldn't need it.

## How to Use App

App starts with an empty multiline text area. You need to put the gene IDs you would like to retrieve **one per line**. You can pick gene IDs from the sample data in the path: `/data/sample.json`.

The output will be a table with `Analyze` button for each gene.
**[BONUS]** You'll also see `Advanced Visualization` button to see the data of all retrieved genes on a **Heat Map**.

When you click `Analyze` button, you'll see the data of the gene in a **Scatter Plot**.
**[BONUS]** You can also see `Detect Anomalies` button to mark the **outliers with red color**. It calls the anomaly detection api, which uses **ZScore to detect outliers**. **An example gene ID** to see the anomaly detection is **`iW78C`**.

## Implementation Details

### Backend

- The backend is a Node.js app using NestJS framework.
- There are 3 endpoints
  - POST /genedata/retrieve - to retrieve the data from MongoDB 
  - GET /genedata/analyze/:geneID - to insert the data to MongoDB
  - [BONUS] GET /genedata/detectanomaly/:geneID - to detect anomalies
- It uses MongoDB as the database.
- It uses `mongoose` as the ODM.
- ZScore is used to detect outliers

### Frontend

- The frontend is a React app created and built with vite.
- It uses d3.js for the charts.
  - Scatter Plot for gene data
  - [BONUS] Heat Map for advanced visualization
- It uses React Context API for state management.
- It uses NGINX as web server to serve the frontend in Docker. Backend URL is configured and defined in runtime using environment variables.

### Database

- MongoDB is used as the database.
- MongoDB Express is used as the database management tool.
- MongoDB starts with pre-populated data. It is achieved by mounting the data file to the container and running a bash script to import the data.
