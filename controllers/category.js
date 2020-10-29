const { errorHandler } = require("../helpers/dbErrorHandlers");
const Category = require("../models/category");

exports.categoryById =(req, res,next, id)=> {
    Category.findById(id).exec((err,category) => {

        if(err || !category){
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;// whatever is requested here is being stored to the category
        next();    

        
    });
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }

        res.json({ data });

    })
}


exports.read = (req, res) => {
    return res.json(req.category);
}

exports.update = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, data)=> {

        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);

    });
}

exports.remove = (req, res) => {
    const category = req.category
    category.remove((err, data)=> {

        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "Category Deleted"
        });
            
    });
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    })
}

