const result = require("../model/studentModel")
const correspond= require("lodash")


exports.createStudent= async (req,res) => {
    try{
        let {Name , Subject, Marks} = req.body
        if(!(Name)) {
            throw new Error("Name is required");
        }
        if(!(Subject)) throw new Error("Subject is missing");
        if(!(Marks)) throw new Error("Marks is missing");

        
        let check = await result.findOne({
            where : { Name : Name , Subject : Subject},
        });
        if(check == null){
            let additionData = await result.create(req.body)  
            return res.status(201).send({status : true, message : "data inserted successfully", data : additionData})
        }else{
            let marks = check.Marks + Marks
            await result.update(                         
                { Marks : marks },
                {where: {Name : Name , Subject : Subject} 
            })
            let resultData = await result.findOne({ where : { Name : Name , Subject : Subject}})  //Get

            return res.status(200).send({status : true , message : `Marks of ${Marks} added to existing student` ,data : resultData})
        }

    }catch(err){

        switch(err.message){
            case "Name is not found":
                res.json({
                    status : false,
                    error : "Name is required"
                })
                break;
            

            case "Subject is missing": 
                res.json({
                    status : false,
                    error : "Subject is a mandatory feild"
                })
                break;

            case "Marks is missing":
                res.json({
                    status :false, 
                    error : "Marks is a mandatory feild"
                })
                break;

            default :
            res.json({
                status :false,
                error : err.message
            })

            
        }
    }
}


// Get all students details
exports.getStudent = async function(req, res){
    try{
          let getStudentsDetails = await result.findAll();
        res.status(200).send({status : true,message : "Give the detail of all Student", data : getStudentsDetails})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}



// delete students with name and subject
exports.deleteStudent = async function(req, res) {
    try{
        await result.destroy({where : {Name : req.body.Name , Subject : req.body.Subject}})
        res.status(200).send({status : true , message : `Student of name ${req.body.Name} and subject ${req.body.Subject} deleted Successfully`})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false , err : err.message})
    }
}