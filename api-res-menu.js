const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:1234', 'https://res-list-app.netlify.app/'],
    credentials: true
}));

const port = 4000;

const getMenu = async (resId)=>{
    const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.624462&lng=77.057731&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`,
        {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        }
    );
    const json = await data?.json();

    return json;
}

app.get('/:resId', async (req, res)=>{
    const resId = req.params.resId;
    
    try {
        const data = await getMenu(resId);
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