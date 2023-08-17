class UserS {
  jwtToken: string;
  githubToken: string;
}

interface AuthStrategy {
  auth(user: UserS): boolean;
}

class Auth {
  constructor(private authStrategy: AuthStrategy) {}

  setStrategy(authStrategy: AuthStrategy) {
    this.authStrategy = authStrategy;
  }

  authUser(user: UserS): boolean {
    return this.authStrategy.auth(user);
  }
}

class JWTAuthStrategy implements AuthStrategy {
  auth(user: UserS): boolean {
    if (user.jwtToken) {
      // проверяем вылидность токена, дишефруем его, проверяем что user есть в базе
      return true;
    }
    return false;
  }
}

class GithubAuthStrategy implements AuthStrategy {
  auth(user: UserS): boolean {
    if (user.githubToken) {
        // идем в стороннее API проверяем авторизацию usera 
        return true;
    }
    return false;
  }
}

const authSt = new Auth(new JWTAuthStrategy());

const userS = new UserS();
userS.jwtToken = "jwtToken";

console.log(authSt.authUser(userS));
authSt.setStrategy(new GithubAuthStrategy());
console.log(authSt.authUser(userS));
