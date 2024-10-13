const fs = require('fs').promises;


const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.log('User Image Deleted');   
    } catch (error) {
        console.error('User Image Not Found');
    }   
};

module.exports = { deleteImage }