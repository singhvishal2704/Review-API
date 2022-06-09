const puppeteer = require('puppeteer')

exports.webScrapper = async (url) => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
          })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0)
        await page.goto(url, {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        })
        // await page.screenshot({ path: "amazing.png", fullPage: true})
        let responseData = []
        let next_button;
        const fetch = async (page) => {
            const names = await page.evaluate(() => {
                return Array.from(document.querySelectorAll(".reviewer dd")).map(x => x.textContent)
            })
    
            const rating = await page.evaluate(() => {
                return Array.from(document.querySelectorAll(".itemRating strong")).map(x => x.textContent) 
            })
    
            const comment = await page.evaluate(() => {
                return Array.from(document.querySelectorAll(".rightCol h6")).map(x => x.textContent) 
            })
    
            
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
            next_button = (await page.$('[title="Next"]') !== null) ? true : false;
            // console.log(next_button)
            // console.log(responseData)
        }
        await fetch(page)
        while(next_button){
            await Promise.all([
                page.evaluate(()=>document.querySelector('[title="Next"]').click()),
                page.waitForNavigation({ waitUntil: "networkidle2" }),
              ]);
            await fetch(page)
        }
        await browser.close()

        return responseData;
    }catch(err){
        console.log("Error in WebScrapper Function ", err)
        return;
    }
}
