const messageModel = require("../model/messageModel.js");

module.exports.addMessage= async (req, res, next) => {
    try {
        const {msg ,from , to} =  req.body;
        console.log(msg)
        const data = messageModel.create({
            message : {text : msg},
            users : [from,to],
            sender : from
        })
        if(data){
            return res.json({msg : "added succesfully"});
        }
        return res.json({msg : "failed"});
        
  
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.getAllMessage = async (req,res,next)=>{
    try {
        const { from, to } = req.body;
    
        const messages = await messageModel.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        res.json(projectedMessages);
      } catch (ex) {
        next(ex);
      }
  };

 