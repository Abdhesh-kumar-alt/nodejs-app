import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI, 
    {
        maxPoolSize: 50,  // Use maxPoolSize instead of poolSize
        wtimeoutMS: 2500, // Use wtimeoutMS instead of wtimeout
        useUnifiedTopology: true // Required to remove deprecated warning
    }
)
.catch(err => {
    console.error("❌ MongoDB connection failed:", err)
    process.exit(1)
})
.then(async client => {
    console.log("✅ Successfully connected to MongoDB")
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`)
    })
})

