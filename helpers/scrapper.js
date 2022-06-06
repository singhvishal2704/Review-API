const puppeteer = require('puppeteer')

exports.webScrapper = async (url) => {
    try{
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)
        // await page.screenshot({ path: "amazing.png", fullPage: true})

        const names = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".reviewer dd")).map(x => x.textContent)
        })

        const rating = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".itemRating strong")).map(x => x.textContent) 
        })

        const comment = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".rightCol h6")).map(x => x.textContent) 
        })

        let responseData = []
        let count = 0;
        comment.map((data, item) => {
            let responseObj = {
                'Name': names[count],
                'Date': names[count+1],
                'Rating': rating[item+1],
                'Comment': data,
            }   
            responseData.push(responseObj)
            count = count + 2; 
        })

        await browser.close()

        return responseData
    }catch(err){
        console.log("Error in WebScrapper Function ", err)
    }
}
