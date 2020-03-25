require('../src/db/mongoose')

const User = require('../src/models/user')

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount("5e7a644b2a92724574e951bf", 1).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);

})