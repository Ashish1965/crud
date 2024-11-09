import initDB from "@/helpers/initDB";
import Signup from "@/model/Signup";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

initDB();

export default async (req, res) => {
  const { Email, Password } = req.body;

  try {
    if (!Email || !Password) {
      return res.status(422).json({ error: "Please Add all Fields" });
    }
    const result = await Signup.findOne({ email: Email });
    if (!result) {
      return res.status(404).json({ error: "No User found" });
    }
    const doMatch = await bcrypt.compare(Password, result.password);
    if (doMatch) {
      const token = Jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { name, email } = result;
      // console.log(resu)
      res
        .status(201)
        .json({
          token: token,
          user: { name: name, email: email },
          message: "Login Successfully",
        });
    } else {
      res.status(401).json({ error: "Email or password don't match!" });
    }
  } catch (err) {
    console.log(err);
  }
};
