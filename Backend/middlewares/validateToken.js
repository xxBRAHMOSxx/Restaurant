import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {
    try {
        //get token
        const token = req.header("authorization")?.split(" ")[1];
        if (!token) { 
            return res.status(403).json({ message: 'Access denied' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' ,err});
            }
            req.body.id = user.id;
            req.body.usertype = user.usertype;
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error in auth token' });
    }
}