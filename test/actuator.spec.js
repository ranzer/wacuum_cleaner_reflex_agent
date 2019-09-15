import { spy, stub } from "sinon";
import { expect } from "chai";
import { Actuator } from "../src/actuator.js";
import { OrientationEnum, TurnEnum } from "../src/enums.js";

describe("Actuator", () => {
  let actr;

  describe("moveTo", () => {
    beforeEach(() => { actr = new Actuator(); });

    it("should return value that is equal to the function's argument", () => {
      let pos = { col: 1, row: 2 };
      let ret = actr.moveTo(pos);

      expect(ret).to.be.equal(pos);
    });
  });
  describe("getNewPos", () => {
    let pos = { col: 2, row: 2 };
    beforeEach(() => { actr = new Actuator(); });

    describe("when turn is not either left or right", () => {
      it("should return the current position argumentt", () => {
        let turn = 100;
        let spyMethod = spy(actr.clonePos);
        let ret = actr.getNewPos(pos, null, turn);

        expect(ret).to.be.equal(pos);
        expect(spyMethod.notCalled).to.be.true;
      });
    });
    describe("when turn is either left or right", () => {
      before(() => { actr = new Actuator(); });

      it("should call the clonePos method", () => {
        let turn = TurnEnum.LEFT;
        let fn = spy();
        let clonePosStub = stub(actr, "clonePos").callsFake(() => {
          fn();
          return pos;
        });
        let ret = actr.getNewPos(pos, OrientationEnum.LEFT, turn);

        expect(fn.calledOnce).to.be.true;
      });
    });
  });
});
