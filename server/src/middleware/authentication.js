import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(token) {
            const decodedData = jwt.verify(token, process.env.SECRET_KEY);
            req.email = decodedData?.email;
            req.userId = decodedData?.id;
            next();
        }

    } catch (error) {
        res.status(400).json({ message: "Authentication failed" });
    }
};

export default auth;