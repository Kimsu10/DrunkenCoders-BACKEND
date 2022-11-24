const productsService = require("../services/productsService");

const getAllProducts = async (req, res) => {
    const { cate_id , sweetness , sourness , carbon , fruit , flower , grain , priceRange , alchol , sort , limit , offset} = req.query
    
    const products = await productsService.getAllProducts(
      cate_id , sweetness , sourness , carbon , fruit , flower , grain , priceRange , alchol , sort , limit , offset);
    
    return res.status(200).json({ data: products });
};

const getProductDetails = async (req, res) => {
  const productId = req.params.productId

  const details = await productsService.getProductDetails(productId)
  // if (){
  //   const err = new Error("NO PRODCUTS FOUND")
  //   err.status = 404
  //   throw err
  // }
  return res.status(200).json({data : details})
}
module.exports = { getAllProducts , getProductDetails };
