export const testUserController = (req, res) => {
    try {
        return res.status(200).send("lesgo")
    } catch (error) {
        return res.status(500).json(error.message)
        
    }
}

