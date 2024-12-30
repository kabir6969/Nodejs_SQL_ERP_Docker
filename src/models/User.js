// const sql = require('mssql')

// const UserSchema = new sql({
//    googleId:{
//     type: String,
//     required : true
//    },
//    googleId:{
//     type: String,
//     required : true
//    },
//    displayName:{
//     type: String,
//     required : true
//    },
//    firstName:{
//     type: String,
//     required : true
//    },
//    lastName:{
//     type: String,
//     required : true
//    },
//    image:{
//     type: String
//     //required : true
//    },
//    createdAt:{
//     type: Date,
//     default : sql.Date.now
//    }
// })

// //module.exports=mssql.model("User",UserSchema );
// module.exports = sql.model('User',UserSchema)
// //module.exports=mssql.model("User", Schema); 
// // module.exports=mssql.model("User",UserSchema); 



const sql= require('mssql'); 
const UserSchema= { 

   googleId:{
      type: String,
      required : true
     },

     displayName:{
      type: String,
      required : true
     },
     firstName:{
      type: String,
      required : true
     },
     lastName:{
      type: String,
      required : true
     },
     image:{
      type: String
      //required : true
     },
     createdAt:{
      type: Date,
      default : sql.Date.now
     }
   } 
     module.exports= UserSchema; 



// const mssql = require("mssql");

// const UserSchema = new mssql.Schema({
//     username:{
//         type:String,
//         require:true,
//         min:3,
//         max:50,
//         unique:true,
//     },
//     email: {
//         type: String,
//         required: true,
//         max: 50,
//         unique: true,
//       },
//       password: {
//         type: String,
//         required: true,
//         min: 6,
//       },   
//     },
//       {timestamps:true}
//     );
// module.exports=mssql.model("User",UserSchema );

//Thanks Vijay. I just tried, still getting same issue.. Replaced module.exports=mssql.model("User", Schema); by module.exports=mssql.model("User",UserSchema); 