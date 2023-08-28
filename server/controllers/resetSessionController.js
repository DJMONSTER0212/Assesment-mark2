const resetSessionController = async(req,res)=>{
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = true;
        return res.status(201).send({msg:"access Granted!"})
    }
    return res.status(440).send({error:"Session Expired!"});
    
}

module.exports = {resetSessionController};