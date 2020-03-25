require('../src/db/mongoose')

const Task = require('../src/models/task')
const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount("5e7a6c5ecafa7d49d47bf256").then((count) => {
    console.log(count);
}).catch((err) => {
    console.log(err);
});