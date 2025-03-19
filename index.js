const express = require('express');
const app = express();
const axios = require('axios');
const puppeteer = require('puppeteer');

app.get('/product-goat', async (req, res) => {
    try {
        const { productTemplateId, countryCode } = req.query;
        if (!productTemplateId || !countryCode) {
            return res.status(400).json({ error: "Missing productTemplateId or countryCode" });
        }
        const apiUrl = `https://www.goat.com/web-api/v1/product_variants/buy_bar_data?productTemplateId=${productTemplateId}&countryCode=${countryCode}`;
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        await page.goto(apiUrl, {
            waitUntil: 'networkidle2'
        });
        const jsonData = await page.evaluate(() => {
            const preTag = document.querySelector('pre');
            return preTag ? preTag.innerText : null;
        });
        if (jsonData) {
            try {
                const parsedData = JSON.parse(jsonData);
                return res.status(200).json({ data: parsedData });
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.log("No <pre> tag found!");
        }
        await browser.close();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return res.status(500).json({err: error});
    }
});


app.listen(3000,()=>{
    console.log(`Server Running on PORT: 3000`);
})