const NewsModel = require('../models/news.model');


var NewsController = {
   
    /**
     * saveNews: Save a news in the database
     */
    saveNews: function(req, res){
        var news = new NewsModel({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            author: req.body.author,
            date: new Date(),
            archiveDate: null
        });
        news.save((err,newsStored) => {
            if(err) return res.status(500).send({
                message: 'Error posting the news'
            });

            if(!newsStored) return res.status(404).send({
                message: 'The news could not be saved'
            });

            return res.status(200).send({news: newsStored})
        })
    },
    
    /**
     * getNews: Retrieve a news from the database by it's id
     */
    getNews: function(req, res){
        var newsId = req.params.id;

        if(newsId == null) return res.status(404).send({
            message: "No id specified"
        });

        NewsModel.findById(newsId, (err, news) => {
            if(err) return res.status(500).send({
                message: 'Error fetching data'
            });

            if(!news) return res.status(404).send({
                message: 'The News does not exists'
            });

            return res.status(200).send({news});
        });

    },

    /**
     * getNewsList: Retrieve a list of all non-archived news from the database
     */
    getNewsList: function(req, res){
        NewsModel.find({archiveDate: {$in: null}}).sort({date:-1}).exec((err,newsList)=>{
            if(err) return res.status(500).send({
                message: 'Error fetching data'
            });
            
            if(!newsList) return res.status(404).send({
                message: "There's no news to show"
            });

            return res.status(200).send({newsList});
        })
    },

    /**
     * updateNews: Update a news from the database by it's id
     */
    updateNews: function(req, res){
        var newsId = req.params.id;
        var updateParams = req.body;

        if(newsId == null) return res.status(404).send({
            message: "No id specified"
        });

        NewsModel.findByIdAndUpdate(newsId,updateParams,{new:true},(err,updatedNews) => {
            if(err) return res.status(500).send({
                message: 'Error updating the news'
            });

            if(!updatedNews) return res.status(404).send({
                message: 'The news to update does not exist'
            });

            return res.status(200).send({news: updatedNews})
        });

    },



    /**
     * getArchivedNewsList: Retrieve a list of all archived news from the database
     */
    getArchivedNewsList: function(req,res){
        NewsModel.find({archiveDate: {$ne: null}}).sort({archiveDate:-1}).exec((err,archivedNewsList)=>{
            if(err) return res.status(500).send({
                message: 'Error fetching data'
            });
            
            if(!archivedNewsList) return res.status(404).send({
                message: "There's no archived news to show"
            });

            return res.status(200).send({archivedNewsList});
        })
    },
    
    /**
     * archiveNews: Archive a news from the database by it's id
     */
    archiveNews: function(req,res){
        var newsId = req.params.id;
        if(newsId == null) return res.status(404).send({
            message: "No id specified"
        });
        NewsModel.findByIdAndUpdate(newsId,{archiveDate: new Date()},{new:true},(err,archivedNews) => {
            if(err) return res.status(500).send({
                message: 'Error filing the news'
            });

            if(!archivedNews) return res.status(404).send({
                message: 'The news to archive does not exists'
            });

            return res.status(200).send({news: archivedNews})
        });

    },

    /**
     * deleteArchivedNews: Delete an archived news from the database by it's id
     */
    deleteArchivedNews: function(req,res){
        var newsId = req.params.id;
        if(newsId == null) return res.status(404).send({
            message: "No id specified"
        });

        NewsModel.deleteOne({_id: newsId, archiveDate: { $ne: null }},(err,deletedNews) => {
            if(err) return res.status(500).send({
                message: 'Error deleting the news'
            });
            
            if(!deletedNews || deletedNews.deletedCount == 0) return res.status(404).send({
                message: 'The archived news to delete does not exists'
            });

            return res.status(200).send({newsRemoved: deletedNews})
        });
    },





};

module.exports = NewsController;