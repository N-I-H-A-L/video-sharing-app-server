import express from "express";

const router = express.Router();

router.get('/', (req, res)=>{
    console.log("comm");
    res.send("comm");
});

export default router;