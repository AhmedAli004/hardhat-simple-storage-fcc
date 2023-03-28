const { assert } = require("chai")
const {ethers} = require("hardhat")

describe("SimpleStorage",function () {
  let simpleStorageFactory, simpleStorage
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    //assert
    //expect
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should update when we call store", async function() {
    const expectedValue = 7
    const transactResponse = await simpleStorage.store(expectedValue)
    await transactResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should add person and fav number", async function() {
    const name = "Ahmed"
    const favNum = 30
    const transactResponse = await simpleStorage.addPerson(name, favNum)
    await transactResponse.wait(1)
    const currentFavNum = await simpleStorage.nameToFavoriteNumber(name)
    assert.equal(currentFavNum, favNum) 
  })
})

