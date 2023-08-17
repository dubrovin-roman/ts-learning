"use strict";
class UserS {
}
class Auth {
    constructor(authStrategy) {
        this.authStrategy = authStrategy;
    }
    setStrategy(authStrategy) {
        this.authStrategy = authStrategy;
    }
    authUser(user) {
        return this.authStrategy.auth(user);
    }
}
class JWTAuthStrategy {
    auth(user) {
        if (user.jwtToken) {
            // проверяем вылидность токена, дишефруем его, проверяем что user есть в базе
            return true;
        }
        return false;
    }
}
class GithubAuthStrategy {
    auth(user) {
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
