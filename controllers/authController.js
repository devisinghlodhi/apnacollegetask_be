// Mock user data (replace with DB lookup in real app)
const mockUser = {
    email: 'user@example.com',
    password: 'password123', // In real apps, use hashed passwords
  };
  
  const login = (req, res) => {
    const { email, password } = req.body;
  
    if (email === mockUser.email && password === mockUser.password) {
      // In real apps, generate a JWT or session here
      return res.status(200).json({ message: 'Login successful!' });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  };
  
  const logout = (req, res) => {
    // In real apps, clear the token or session here
    return res.status(200).json({ message: 'Logout successful!' });
  };
  
  export {login, logout}