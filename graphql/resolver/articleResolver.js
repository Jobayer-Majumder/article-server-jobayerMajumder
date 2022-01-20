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

    findArticle: async (args) => {
        const id = args.id;

        try {
            const article = await ArticleModel.findById({ _id: id })
            return [article]

        } catch (error) {
            throw new Error('something wrong with finding article');
        }
    },

    createArticle: async (args) => {
        const { title, description, tags } = args.input;

        const article = new ArticleModel({
            title: title,
            description: description,
            tags: tags,
            comments: [],
            authorEmail: 'String!'
        });

        try {
            const articles = await article.save();
            return [articles]

        } catch (error) {
            throw new Error('Something wrong with creating article!')
        }
    },

    insertComment: async (args) => {
        const { articleId, userId, comment } = args.input;
        
        const date = new Date();
        
        try {
            const updated = await ArticleModel.updateOne({
                _id: articleId }, 
                {$push: {
                    comments: {
                        $each: [{userId, comment, date}],
                        $position: 0
                    }
                }
            });

            if(updated.modifiedCount > 0){
                // const comment = await ArticleModel.find({_id: articleId})
                // const expected = comment[0]?.comments.filter(comment => userName === comment.userName)
                // console.log(expected)

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