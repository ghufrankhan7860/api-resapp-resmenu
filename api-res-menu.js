const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const port = 4000;

const getMenu = async (lat, lon, resId)=>{
    const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lon}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`,
        {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        }
    );
    const json = await data?.json();

    return json;
}

app.get('/', async (req, res)=>{
    const {resId, lat, lon} = req.query;
    console.log({resId, lat, lon});
    
    try {
        const data = await getMenu(lat, lon, resId);
        res.json(data);
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ error: "Failed to fetch restaurant menu" });
    }

    // res.json({'hello':'good morning', resId: resId});
});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})