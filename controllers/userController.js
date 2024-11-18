import { userModel } from "../models/userModel.js"


const  userController = async (req, res) => {
    // console.log(req)
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400).json({ message: 'all feilds are required' }).send('all feilds are required')
    }
    try {
        const newUser = await userModel.create({
            username: username,
            email: email,
            password: password,
        })
        console.log(newUser.id)
       
        return res.status(200).json({ message: 'account successfuly created' })
    } catch (error) {
        console.log('error in signUpHandler', error)
        return res.status(400).json({ message: 'error in signUpHandler and try again' })
    }
}


export {userController}