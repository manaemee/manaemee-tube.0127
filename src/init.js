import "dotenv/config";
import "./db"; //서버가 mongoDB에 연결됨.
import app from "./server";



const PORT = 4000;    
app.listen(4000, () => console.log(`Server listening on port http://localhost:${PORT}`));