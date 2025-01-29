import User from "../DB/model.js";
export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:'All fields Required'});
    }
    try{
        const exists= await User.findOne({email});
        if(exists)return res.status(400).json({error:'This user already exists'});
        const newUser=new User(
            {name,email,password}
        )
        await newUser.save();
        return res.status(200).json({message:'Registered Successfully'});
    }catch(error ){
        res.status(500).json({'issue':error})
    }
}
export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const exist=await User.findOne({email});
        if(!exist)return res.status(400).json({error:'User does not exist'});
        if(password!=exist.password)return res.status(400).json({error:'Password does not match'});
        return res.status(200).json({exist});
    }catch(error){
        console.log(error);
    }
}