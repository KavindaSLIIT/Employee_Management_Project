const  assert = require('chai').assert;
import User from  "../User_management"


describe('User', () => {


    it('should be a function', () => {
        assert.isFunction(User);
    });
    
    it('should have a name', () => {
        const user = new User('John');
        assert.equal(user.name, 'John');
    });
    
    it('should have a surname', () => {
        const user = new User('John', 'Smith');
        assert.equal(user.surname, 'Smith');
    });
    
    it('should have a password', () => {
        const user = new User('John', 'Smith', '12345678');
        assert.equal(user.password, '12345678');
    });
    
    it('should have a email', () => {
        const user = new User('John', 'Smith', '12345678');

        assert.equal(user.email, "achini@gmail.com");

    });


});



