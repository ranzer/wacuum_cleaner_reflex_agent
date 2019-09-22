import { spy, stub } from "sinon";
import { expect } from "chai";
import { Actuator } from "../src/actuator.js";
import { OrientationEnum, TurnEnum } from "../src/enums.js";

describe("Actuator unit tests", () => {
  let actr;

  beforeEach(() => { actr = new Actuator(); });

  describe("goForwardOrBackward", () => {
    let newPos, backwardActionSpy, forwardActionSpy;

    beforeEach(() => {
      newPos = { col: 1, row: 1 }
      backwardActionSpy = spy();
      forwardActionSpy = spy();
    });
    it("should perform backward action on left turn", () => {
      let turn = TurnEnum.LEFT;

      actr.goForwardOrBackward(turn, newPos, forwardActionSpy, backwardActionSpy);

      expect(backwardActionSpy.calledOnce).to.be.true;
      expect(backwardActionSpy.calledWith(newPos)).to.be.true;
      expect(forwardActionSpy.notCalled).to.be.true;
    });
    it("should perform forward action on right turn", () => {
      let turn = TurnEnum.RIGHT;

      actr.goForwardOrBackward(turn, newPos, forwardActionSpy, backwardActionSpy);

      expect(backwardActionSpy.notCalled).to.be.true;
      expect(forwardActionSpy.calledOnce).to.be.true;
      expect(forwardActionSpy.calledWith(newPos)).to.be.true;
    });
    it("should do nothing if turn is not either left or right", () => {
        let turn = 1000;

        actr.goForwardOrBackward(turn, newPos, forwardActionSpy, backwardActionSpy);

        expect(backwardActionSpy.notCalled).to.be.true;
        expect(forwardActionSpy.notCalled).to.be.true;
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
    let pos = { col: 2, row: 2 },
        clonePosSpy,
        clonePosStub,
        changePositionActionSpy,
        getChangePositionActionStub;

    beforeEach(() => {
      clonePosSpy = spy();
      changePositionActionSpy = spy();
      clonePosStub = stub(actr, "clonePos").callsFake(() => {
        clonePosSpy();
        return pos;
      });
      getChangePositionActionStub = stub(actr, "getChangePositionAction")
        .callsFake(() => {
          return changePositionActionSpy;
        });
    });

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
      it("should call the clonePos method with correct arguments", () => {
        let turn = TurnEnum.LEFT;

        let ret = actr.getNewPos(pos, OrientationEnum.LEFT, turn);

        expect(clonePosStub.calledWith(pos)).to.be.true;
        expect(clonePosSpy.calledOnce).to.be.true;
      });
      it("should call getChangePositionAction method", () => {
        let turn = TurnEnum.LEFT;
        let orientation = OrientationEnum.LEFT;

        let ret = actr.getNewPos(pos, orientation, turn);

        expect(getChangePositionActionStub.calledOnce).to.be.true;
        expect(getChangePositionActionStub.calledWith(orientation)).to.be.true;
      });
      it ("should execute an action returned by the getChangePositionAction method", () => {
        let turn = TurnEnum.LEFT;
        let orientation = OrientationEnum.LEFT;

        let ret = actr.getNewPos(pos, orientation, turn);

        expect(changePositionActionSpy.calledOnce).to.be.true;
        expect(changePositionActionSpy.calledWith(turn, pos)).to.be.true;
      })
      it.skip("should return agent's new position", () => {});
    });
  });
});
