import { spy, stub } from "sinon";
import { expect } from "chai";
import { Actuator } from "../src/actuator.js";
import { OrientationEnum, TurnEnum } from "../src/enums.js";

describe("Actuator", () => {
  let actr;
  beforeEach(() => { actr = new Actuator(); });

  describe("goLeftOrRight", () => {
    let newPos;
    beforeEach(() => { newPos = { col: 1, row: 1 }});
    describe("when movement isn't reversed", () => {
      it("should decrease column property on left turn", () => {
        let turn = TurnEnum.LEFT;

        actr.goLeftOrRight(turn, newPos);

        expect(newPos.col).to.be.equal(0);
        expect(newPos.row).to.be.equal(1);
      });
      it("should increase column property on right turn", () => {
        let turn = TurnEnum.RIGHT;

        actr.goLeftOrRight(turn, newPos);

        expect(newPos.col).to.be.equal(2);
        expect(newPos.row).to.be.equal(1);
      });
      it("should do nothing if turn is not either left or right", () => {
        let turn = 1000;

        actr.goLeftOrRight(turn, newPos);

        expect(newPos.col).to.be.equal(1);
        expect(newPos.row).to.be.equal(1);
      });
    });
    describe("when movement is reversed", () => {
      it("should increase column property on left turn", () => {
        let turn = TurnEnum.LEFT;

        actr.goLeftOrRight(turn, newPos, true);

        expect(newPos.col).to.be.equal(2);
        expect(newPos.row).to.be.equal(1);
      });
      it("should decrease column property on right turn", () => {
        let turn = TurnEnum.RIGHT;

        actr.goLeftOrRight(turn, newPos, true);

        expect(newPos.col).to.be.equal(0);
        expect(newPos.row).to.be.equal(1);
      });
      it("should do nothing if turn is not either left or right", () => {
        let turn = 1000;

        actr.goLeftOrRight(turn, newPos, true);

        expect(newPos.col).to.be.equal(1);
        expect(newPos.row).to.be.equal(1);
      });
    });
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
