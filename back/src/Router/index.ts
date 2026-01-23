import { Router } from "express";
import userRoutes from "./userRouter";
import appointmentsRoutes from "./appointmentsRouter";


const router: Router = Router();

router.use("/users",userRoutes);
router.use("/appointments",appointmentsRoutes);



export default router;
