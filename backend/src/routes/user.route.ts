import { NextFunction, Request, Response, Router } from "express";
import upload from "../middlewares/multer.middleware";
import { jwtVerify } from "../middlewares/jwt-verifiy.middleware";
import userModel from "../model/user.model";
import cloudinary from "../config/cloudinary";
import { StatusCodes } from "../utils/status-code";

const router = Router();

/**
 * @swagger
 * /api/user/avatar:
 *   post:
 *     summary: Set avatar picture
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar successfully updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post(
  "/avatar",
  jwtVerify,
  upload.single("file"),
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatar",
      });
      const updateUser = await userModel.findByIdAndUpdate(
        req.userId,
        {
          avatar: result.secure_url,
        },
        { new: true, projection: { avatar: 1 } }
      );

      res.status(StatusCodes.OK).json({
        success: true,
        data: updateUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
