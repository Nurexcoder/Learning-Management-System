import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../../models/User";
const router = express.Router();

router.post(
  "/api/auth/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const isUserExist = await UserModel.findOne({ email: email });

    if (isUserExist) {
      return next(new Error("User already exists"));
    }
    // const user = await UserModel.build({ email: email, password: password });
    // await user.save();
    // res.status(201).json({ status: "success", ...user.toJSON() });
  }
);
export { router as SignupRouter };
