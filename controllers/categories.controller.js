const Category = require('../models/categories.model');

const categoriesGet = async (req, res, next) => {

    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return next(error);
    }
};

/* const categoryPost = async (req, res, next) => {

    try {
        const name = req.body;
        const newCategory = new Category(name);
        await newCategory.save();
        return res.status(201).json(newCategory);
    } catch (error) {
        return next(error);
    }
};

const categoryDelete = async (req, res, next) => {
    try{
        const {id} = req.params;
        const deleted = await Tip.findByIdAndDelete(id);
        if(deleted){
            return res.status(200).json(deleted);
        }else{
            const error = new Error("Error loko");
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
} */

module.exports = {
    categoriesGet
}