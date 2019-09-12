import { spy } from "sinon";
import { expect } from "chai";
import { Actuator } from "../src/actuator.js";
import { OrientationEnum, TurnEnum } from "../src/enums.js";

describe("Actuator", () => {
  let actr;
  beforeEach(() => {
    console.log("beforeEach");
    actr = new Actuator();
  });
  describe("moveTo", () => {
    it("should return value that is equal to the function's argument", () => {
      let pos = { col: 1, row: 2 };
      let ret = actr.moveTo(pos);

      expect(ret).to.be.equal(pos);
    });
  });
  describe("getNewPos", () => {
    let pos = { col: 2, row: 2 };

    it("should return the current position argument when turn is not either left or right", () => {
      let turn = 100;
      let spyMethod = spy(actr.clonePos);
      let ret = actr.getNewPos(pos, null, turn);

      expect(ret).to.be.equal(pos);
      expect(spyMethod.notCalled).to.be.true;
    });
  });
});
