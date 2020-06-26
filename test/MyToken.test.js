const Token = artifacts.require("MyToken");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({path: '../.env'});

contract("Token Test", async (accounts) => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    beforeEach(async () => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it("All tokens should be in my account", async () => {
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        //old style:
        //let balance = await instance.balanceOf.call(initialHolder);
        //assert.equal(balance.valueOf(), 0, "Accounts 1 has a balance");
        //condensed, easier readable styke:
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("I can send tokens from Account 1 to Account 2", async () => {
        const sendTokens = 1;
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("It's not possible to send more tokens than Account 1 has", async () => {
        let instance = await this.myToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);

        expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;
        //check if the balance is still the same
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(balanceOfAccount));
    });
});
