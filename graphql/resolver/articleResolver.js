const ArticleModel = require("../../models/articleModel")


module.exports = {
    articles: async () => {
        try {
            const articles = await ArticleModel.find({});

            return articles
        } catch (error) {
            throw new Error('something wrong with finding article')
        }
    },

    userArticle: async args => {
        try {
            const articles = await ArticleModel.find({ authorEmail: args.email });
            return articles
        } catch (error) {
            throw new Error('something wrong with finding article');
        }
    },

    findArticle: async (args) => {
        try {
            const article = await ArticleModel.findById({ _id: args.id });
            return [article]

        } catch (error) {
            throw new Error('something wrong with finding article');
        }
    },

    createArticle: async (args) => {
        const { title, description, tags, authorName, authorEmail } = args.input;

        const article = new ArticleModel({
            title,
            description,
            tags,
            comments: [],
            authorName,
            authorEmail
        });

        try {
            const articles = await article.save();
            return [articles]

        } catch (error) {
            throw new Error('Something wrong with creating article!')
        }
    },

    deleteArticle: async args => {
        try {
            const article = await ArticleModel.findByIdAndDelete({_id: args.id})
            if(article){
                return {
                    successMessage: 'Article deleted successfully',
                    errorMessage: ''
                }
            }
            
        } catch (error) {
            throw new Error('Something wrong with deleting article!')
        }
    },

    insertComment: async (args) => {
        const { articleId, userName, comment } = args.input;
        console.log(args.input)

        const createdAt = new Date();

        try {
            const updated = await ArticleModel.updateOne({
                _id: articleId
            },
                {
                    $push: {
                        comments: {
                            $each: [{ userName, comment, createdAt }],
                            $position: 0
                        }
                    }
                });

            if (updated.modifiedCount > 0) {
                return {
                    successMessage: 'Comment Inserted Successfully',
                    errorMessage: ''
                }
            }

        } catch (error) {
            throw new Error('something wrong with inserting comment');
        };

    }
};