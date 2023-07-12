const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class HouseErrors {
 
static async updateHouse(req,res,next){
  const {id}=req.params;
const house=await prisma.house.findUnique({
  where:{id}
})
if(!house){
  return res.status(400).json({Message:"The Id that you provid dos not match any house in the database"})
}
return next();
}
}
module.exports = { HouseErrors };
