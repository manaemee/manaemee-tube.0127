import "regenerator-runtime/runtime"; 
import "dotenv/config";
import "./db"; //서버가 mongoDB에 연결됨.
import app from "./server";



const PORT = process.env.PORT || 4000;    
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));