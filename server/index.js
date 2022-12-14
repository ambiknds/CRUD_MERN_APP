const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

const FoodModel = require('./models/Food')


app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://salah:Mawblei749@crudmern.wv9mf82.mongodb.net/food?retryWrites=true&w=majority", 
    {
    useNewUrlParser: true,
})

app.put('/update', async (req,res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    
    try {
        await FoodModel.findById(id, (err, updatedFood)=> {
            updatedFood.foodName = newFoodName
            updatedFood.save();
            res.send("update");
        })
    }catch (err){
        console.log(err);
    }
})

app.delete('/delete/:id', async (req, res)=> {
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted")

})

app.get('/read', async (req,res) => {
    FoodModel.find({}, (err,result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log("Server running on port 3001...");
})
