const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDB = require("./services/mongodbService.js")
const  dbSchema = require("./Models/dbModel");
const  orgSchema = require("./Models/organizationModel");
const  userModel = require("./Models/userModel");
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//connect mongodb
connectDB();
// console.log("dbSchema = ",dbSchema);
// const testing =async()=>{
//   // const data= await userModel.create({
    
//   //   first_name:"tansih",
//   //   last_name:"jain",
//   //   email: "tanish1@gmail.com",
//   //   db:[
//   //    { db_id:"1234567"}
//   //   ]
//   // })
//   //  const data= await orgSchema.create({
    
//   //   org_name :"walkover",
//   //   users :[
//   //   {
//   //     user_id:"63e4e4bf133b16041f8eb79b",
//   //     user_type:"user"
//   //   },
//   //   {
//   //     user_id:"63e4e4bf133b16041f8eb79b",
//   //     user_type:"user"
//   //   }

//   //   ]
         
//   // })
//   const data=  await dbSchema.create({
//     db_name : "testing" , 
//     db_con_url : "testing1234" , 
//     org_id : "63e4ea37ffc4cefdf72070a7",
//     users : {
//         "63e4ebc9d2c8bfd3c2a31527":{    
//             access : "1"
//         }
//     },
//     tables : {
//         "1234" : {
//             table_name:"testingtable",
//             fields:{
//               "1234" :{
//                 field_name: "name",
//                 field_type: "string",
//               }
//             },
//             view:{
//                 view_id:"1234678",
//                 view_name:"testingView", 
//             },
//             filter_view : {
//                 123456:{
//                     filter_name:"testing filer",
//                     filter_query:"testing query"
//                 }
//             }
//         },
//     },
//     auth_keys : {
//         "213456" :  {
//             access :"1"
//         }
//     }
//   });
// }
// testing();

app.use('/api/user',require("./Routers/userRoute"))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get("/", (req, res) => {
    res.send("Api working");
  })
}
    
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
