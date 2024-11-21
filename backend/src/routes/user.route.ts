import { NextFunction, Request, Response, Router } from "express";
import upload from "../middlewares/multer.middleware";
import { jwtVerify } from "../middlewares/jwt-verifiy.middleware";
import userModel from "../model/user.model";
import cloudinary from "../config/cloudinary";
import { StatusCodes } from "../utils/status-code";

const router = Router();

/**
 * @swagger
 * /api/users/avatar:
 *   post:
 *     summary: Set avatar picture
 *     tags:
 *        - Users
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
  }
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves all users from the database.
 *     tags:
 *        - Users
 *     security:
 *       - BearerAuth: []  # Assuming JWT authentication is used
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  jwtVerify,
  async (req: any, res: Response, next: NextFunction) => {
    const result = await userModel.find({}, "username email");
    res.status(StatusCodes.OK).json({ success: true, data: result });
  }
);

/**
 * @swagger
 * /api/users/logout:
 *   delete:
 *     summary: Logs out the user by clearing the authentication token.
 *     tags:
 *        - Users
 *     description: Clears the token cookie to log the user out of the system.
 *     responses:
 *       200:
 *         description: Successfully logged out, token cookie cleared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items: {}
 *                   example: []
 *       400:
 *         description: Bad request, usually indicates a problem with the request.
 *       401:
 *         description: Unauthorized, if the user is not authenticated.
 *       500:
 *         description: Internal server error, something went wrong on the server side.
 */
router.delete("/logout", jwtVerify, async (_req: any, res: Response) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({
    success: true,
    data: [],
  });
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user
 *     description: This endpoint retrieves all users from the database.
 *     tags:
 *        - Users
 *     security:
 *       - BearerAuth: []  # Assuming JWT authentication is used
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal server error
 */
router.get("/profile", jwtVerify, async (req: any, res: Response) => {
  const user = await userModel
    .findById(req.userId)
    .select("username email avatar");
  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
});

export default router;
