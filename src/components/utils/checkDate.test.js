const checkDate = require("./checkDate")
// @ponicode
describe("checkDate.checkDate", () => {
    test("0", () => {
        let callFunction = () => {
            checkDate.checkDate("01-13-2020", [true, true, true, false])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            checkDate.checkDate("01-01-2020", [true, false, false, true])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            checkDate.checkDate("01-01-2030", [false, true, true, false])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            checkDate.checkDate("01-01-2030", [true, false, true, false])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            checkDate.checkDate("01-01-2030", [false, true, true, true])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            checkDate.checkDate(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
