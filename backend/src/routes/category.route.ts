import { Router, Request, Response } from "express";
import productModel from "../model/product.model";
import { StatusCodes } from "../utils/status-code";

const router = Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves all users from the database.
 *     tags:
 *        - Categories
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/", async (req: Request, res: Response) => {
  const categories = await productModel.distinct("category");

  const productByCategory = await Promise.all(
    categories.map(async (category) => {
      const product = await productModel
        .findOne({ category })
        .select("category productImage");

      return product;
    })
  );
  res.status(StatusCodes.OK).json({
    success: true,
    data: productByCategory,
  });
});

export default router;
