const Book = require('../models/bookModel.js')
const cloudinary = require('../utills/cloudinary.js')



const createBooks = async(req, res)=>{

      try {
            const { title, author, publishedYear } = req.body;

            if (
                  !req.body.title ||
                  !req.body.author ||
                  !req.body.publishedYear
            ){

                  return res.status(400).send({
                        message: "Send all required feilds: title, author,publishedYear"
                  })
            }
            
            const userId = req.user?.id;

            if(!req.file){
                  return res.status(400).send({message: "Image file is required"})
            }

           const result = await cloudinary.uploader.upload(req.file.path)
            const bookData = { ...req.body, createdBy: userId, imageUrl: result.url};
            const book = await Book.create(bookData);
            res.status(200).json(book)
            
      } catch (error) {
            console.log(error)
            res.status(500).json({message: error.message})
      }
      

}


const getBooks = async(req, res)=>{
      try {
            const userId = req.user?.id;
            
            let query = {};
            if (userId) {
              query = { createdBy: userId };
            }
            if (!userId) {
                  return res.status(401).json({ message: 'Unauthorized. Please login.' });
                }
            const books = await Book.find(query)
            res.status(200).json({
                  count: books.length,
                  data: books
            });
 
      } catch (error) {
            
            res.status(500).json({message: error.message})
      }
      
}


const getBook = async(req, res)=>{

      try {

            const {id} = req.params;
            const book = await Book.findById(id);
            res.status(200).json(book)
      
            } catch (error) {
                  
                  res.status(500).json({message: error.message})
            }
      
}


const updateBook = async(req, res)=>{

      try {
            const {id} = req.params;
            const book = await Book.findByIdAndUpdate(id, req.body)
            if (!book){
            
                  return res.status(404).json({message: 'Book not found!'})
            }

            const updatedBook = await Book.findById(id)
            res.status(200).json(updatedBook)

      } catch (error) {
            res.status(500).json({message: error.message})
      }
      
}


const deleteBook = async(req, res)=>{

      try {
            const {id} = req.params;
            const book = await Book.findByIdAndDelete(id)
            if (!book){
             return res.status(404).json({message: 'Unable to delete: Book not found!'})
            }

            res.status(200).json({message: "Book deleted successfully!"})
            
      } catch (error) {
            
            res.status(500).json({message: error.message})
      }
}


module.exports = {
      createBooks,
      getBooks,
      getBook,
      updateBook,
      deleteBook,
 
}