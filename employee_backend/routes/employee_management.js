const router = require("express").Router();
const sendEmail = require("../utils/sendEmail");
const  crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const Emoployee = require("../models/Employee");

const Employee = require("../models/Employee");
/*Router for get all Employees*/
router.get("/get",(req, res) => {

     Employee.find({ deleted: false })
        .then(employee => res.send(employee))
        
        .catch(err => res.status(400).send('Error: ' + err))
  

});

router.get("/", async (req, res) => {

    await Employee.find(req.params.id )
        .then(employee => res.send(employee))
        .catch(err => res.status(400).send('Error: ' + err))

});

/*Router for get Emoployee by Id*/
router.get("/:id", async (req, res) => {

    await Employee.findById(req.params.id)
        .then((employee) => res.send(employee))
        .catch(err => res.status(400).send("Error : " + err))

});

/*Router for create employee*/
router.post('/Add',async (req, res) => {

    const empNumber = req.body.empNumber;

    let Exit = await Employee.findOne({
        empNumber: empNumber,
    });

    if (Exit)
        return res.status(404).send("employee already created!");

    let image = req.files.photo;
    let urlPrefix = "http://localhost:8092/static/images";
    let imageName = Date.now() + "-" + image.name;

    image.mv("./public/images/Employees/" + imageName, (err, result) => {
        if (err) return res.status(400).send("Error : " + err);
    });

  
    let imageURL = urlPrefix + "/Employees/" + imageName;



/// file handle

let fileme = req.files.photo;
let Prefix = "http://localhost:8092/static/files";

let fileName = Date.now() + "-" + fileme.name;
fileme.mv("./public/images/Employees/" + fileName, (err, result) => {
    if (err) return res.status(400).send("Error : " + err);
});
let filecv = Prefix + "/Employees/" + fileName;


    let employee = new Employee({
        name: req.body.name,
        empNumber: empNumber,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password,
        empType: req.body.empType,
        phoneNo: req.body.phoneNo,
        Address: req.body.Address,
        joindate: req.body.joindate,
        ivalutionDate: req.body.ivalutionDate,
        filecv,
        imageURL
    });

    try {
       
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		employee=await new Employee({ ...req.body, password: hashPassword }).save();
        console.log(employee);
        const token = await new Token({
			userId:employee.id,
			token:crypto.randomBytes(32).toString("hex")

		})
        await employee.save();
        res.send(employee);
        const url = `${process.env.BASE_URLL}/admin/employees/${employee.id}/verify/${token.token}`;
		await sendEmail(employee.email,"Verify Email",url);
     
    } catch (err) {
        console.log(err);
        res.status(400).send('Error: ' + err);
    }

});

/*Router for delete employee*/
router.delete("/DeleteEmployee/:id", async (req, res) => {

    await Employee.findByIdAndDelete(req.params.id ,{ deleted: true })
        .then(() => res.send("Emoployee Deleted Successfully!"))
       .catch(err => res.status(400).send("Error : " + err));

});

/*Router for  employee*/
router.delete('/DeleteEmployees/:id', async (req, res) => {
    try {
      await Employee.findByIdAndUpdate(req.params.id, { deleted: true });
      res.status(200).json('user Deleted');
      
    } catch (error) {
      res.status(500).json(error)
    }
  })


/*Router for get all Employees*/
router.put("/restore/:id", async (req, res) => {
    await Employee.findByIdAndUpdate(req.params.id,{deleted : false})
        .then(() => res.send("Emoployee update Successfully!"))
       .catch(err => res.status(400).send("Error : " + err));
});


/*Router for update employee*/

router.put("/UpdateEmployee/:id", async (req, res) => {

    console.log(req.body);

    let imageURL;
    if (req.body.isImageUpdated === "true") {

        let image = req.files.photo;

        let urlPrefix = "http://localhost:8092/static/images";
        let imageName = Date.now() + "-" + image.name;

        image.mv("./public/images/Employees/" + imageName, (err, result) => {
            if (err) return res.status(400).send("Error : " + err);
        });

        imageURL = urlPrefix + "/Employees/" + imageName;
    }
    else if (req.body.isFileUpdated === "true") {

        let fileme = req.files.photo;

        let Prefix = "http://localhost:8092/static/images";
        let fileName = Date.now() + "-" + fileme.name;

        fileme.mv("./public/images/Employees/" + fileName, (err, result) => {
            if (err) return res.status(400).send("Error : " + err);
        });

        filecv= Prefix + "/Employees/" + fileName;
    }
    
    await Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.empNumber = req.body.empNumber;
            employee.dateOfBirth = req.body.dateOfBirth;
             employee.email = req.body.email;
            employee.empType = req.body.empType;
            employee.phoneNo = req.body.phoneNo;
            employee.Address = req.body.Address;
            employee.joindate = req.body.joindate;
            employee.ivalutionDate = req.body.ivalutionDate;
            if (req.body.isImageUpdated === "true") {
                employee.imageURL = imageURL;
            }
            else if (req.body.isFileUpdated === "true") {
                employee.filecv = filecv;
            }
            employee.save()
                .then(() => res.send("Updated Successfully!"))
                .catch(err => res.status(400).send('Error: ' + err));
        })
        .catch(err => res.status(400).send("Error : " + err));



       
});
 //route for update employee name and password
 router.put("/UpdateEmployeeName/:id", async (req, res) => {
                
    console.log(req.body);

    await Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.password = req.body.password;
            employee.save()
                .then(() => res.send("Updated Successfully!"))
                .catch(err => res.status(400).send('Error: ' + err));
        })
        .catch(err => res.status(400).send("Error : " + err));

});
// route for verification token
router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const employee = await Emoployee.findOne({ _id: req.params.id });
		if (!employee) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: employee.id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });


//indByIdAndUpdate(req.params.id, { deleted: true });
		await Employee.findByIdAndUpdate(req.params.id ,{verfied: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}


    router.get("/:id/verify/:token/", async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            if (!user) return res.status(400).send({ message: "Invalid link" });
    
            const token = await Token.findOne({
                userId: user.id,
                token: req.params.token,
            });
            if (!token) return res.status(400).send({ message: "Invalid link" });
    
    
    //indByIdAndUpdate(req.params.id, { deleted: true });
            await User.findByIdAndUpdate(req.params.id ,{verfied: true });
            await token.remove();
    
            res.status(200).send({ message: "Email verified successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Internal Server Error" });
        }
});

});
module.exports = router;