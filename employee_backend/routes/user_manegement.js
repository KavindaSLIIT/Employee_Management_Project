const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const  crypto = require("crypto")
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user=await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
			userId:user._id,
			token:crypto.randomBytes(32).toString("hex")

		}).save();
		const url = `${process.env.BASE_URL}/${user.id}/verify/${token.token}`;
		await sendEmail(user.email,"Verify Email",url);


		res.status(201).send({ message: "An email sent user account, please verify your account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
// route for verification token
router.get("/:id/verfiy/:token",async(req,res)=>{
try{
	const user= await User.findOne({_id:req.params.id});
	if(!user)return res.status(400).send({message:"invalid link"});
	const token = await Token.findOne({
		userId:user._id,
		token:req.params.token
	});
	if(!token)return res.status(400).send({message:"invalid link"});

await User.updateOne({_id:req.params.id});

}catch(error){
	res.status(500).send({ message: "Internal Server Error" });	
}

})
module.exports = router;