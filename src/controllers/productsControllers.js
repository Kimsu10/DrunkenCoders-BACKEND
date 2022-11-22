const productsService = require("../services/productsService");

const getAllProducts = async (req, res) => {
    const { cate_id , sweetness , sourness , carbon , fruit , flower , grain , priceRange , alchol , sort } = req.query

    const products = await productsService.getAllProducts(
      cate_id , sweetness , sourness , carbon , fruit , flower , grain , priceRange , alchol , sort);
    
    return res.status(200).json({ data: products });
};

const getProductDetails = async (req, res) => {
  const productId = req.params.productId

  if (!productId) {
  const err = new Error("KEY ERROR");
  err.statusCode = 400;
  throw err;
  }

  const details = await productsService.getProductDetails(productId)

  return res.status(200).json({data : details})
}
module.exports = { getAllProducts , getProductDetails };
