const { webScrapper } = require('../helpers/scrapper')

// @desc    Fetch all review
// @route   POST /api/reviews
// @access  Public
exports.getProductReview = async (req, res) => {
    try{
        let URL = req.body.URL;

        let result = await webScrapper(URL)

        return res.send({
            status: 'NP000',
            message: "Data fetched successfully",
            data: result
        });

    }catch{
        console.log("Error in getProductReview Controller -> ",err)
        return res.send({
            status : "NP001",
            description : "Error",
            message : "Unable to fetch Review",
        })
    }
}
