// Connect to MongoDB
use commandCenterDatabase

// Create collections
db.createCollection("games")
db.createCollection("users")
db.createCollection("participations")
db.createCollection("events")

// Index for faster lookup of games by admin and status
db.games.createIndex({ adminId: 1, status: 1 })

// Index for users to quickly fetch by role and name/callsign
db.users.createIndex({ role: 1, callsign: 1 })

// Index for participations to relate to games and users efficiently
db.participations.createIndex({ gameId: 1, userId: 1 })

// Index for events to efficiently filter by game and participation
db.events.createIndex({ gameId: 1, participationId: 1 })

// Add validation to the games collection
db.runCommand({
   collMod: "games",
   validator: {
     $jsonSchema: {
       bsonType: "object",
       required: [ "adminId", "gameMode", "startTime", "status" ],
       properties: {
         adminId: {
           bsonType: "objectId",
           description: "must be a valid objectId and is required"
         },
         gameMode: {
           bsonType: "string",
           description: "must be a string and is required"
         },
         startTime: {
           bsonType: "date",
           description: "must be a date and is required"
         },
         status: {
           bsonType: "string",
           enum: ["pending", "active", "completed"],
           description: "can only be one of the enum values and is required"
         }
       }
     }
   }
});

// Similar validation can be added to other collections
