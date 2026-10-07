import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token requerido como Bearer" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Falta la clave en el .env" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = payload;
    next();
  });
}

export function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "No tienes acceso, eres un usuario pobre" });
    }

    next();
  };
}
