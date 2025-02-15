"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const porduct_validation_1 = require("./porduct.validation");
const createAnProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const productValidationZodData = porduct_validation_1.productValidationSchema.parse(product);
        const newProduct = yield product_service_1.ProductService.createProduct_DB(productValidationZodData);
        if (!newProduct) {
            return res.status(400).json({
                message: "Product not created",
                success: false
            });
        }
        return res.status(200).json({
            message: "Product created successfully!",
            success: true,
            data: newProduct
        });
    }
    catch (error) {
        //  console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error
        });
    }
});
exports.ProductController = {
    createAnProduct
};
