import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateToken = (id: any) => {
    return jwt.sign({ id }, 'secret', { expiresIn: '1d' })
}


export const verify = (token: string): { id: string } => {
    const decoded = jwt.verify(token, 'secret') as JwtPayload;
    if (decoded && decoded.id) {
        return { id: decoded.id };
    }
    throw new Error('Invalid token');
}