import { Actuator } from "../src/actuator.js";
import { OrientationEnum, TurnEnum } from "../src/enums.js";
import { expect } from "chai";

describe("Actuator integration tests", () => {
  let actr, pos;

  beforeEach(() => {
    pos = { col: 1, row: 2 };
    actr = new Actuator();
  });

  describe("getNewPos", () => {
    describe("when orientation is left", () => {
      it ("should return correct new position on left turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.LEFT, TurnEnum.LEFT);

        expect(newPos.col).to.be.equal(1);
        expect(newPos.row).to.be.equal(1);
        expect(newPos).to.not.equal(pos);
      });
      it ("should return correct new position on right turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.LEFT, TurnEnum.RIGHT);

        expect(newPos.col).to.be.equal(1);
        expect(newPos.row).to.be.equal(3);
        expect(newPos).to.not.equal(pos);
      });
    });
    describe("when orientation is right", () => {
      it ("should return correct new position on left turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.RIGHT, TurnEnum.LEFT);

        expect(newPos.col).to.be.equal(1);
        expect(newPos.row).to.be.equal(3);
        expect(newPos).to.not.equal(pos);
      });
      it ("should return correct new position on right turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.RIGHT, TurnEnum.RIGHT);

        expect(newPos.col).to.be.equal(1);
        expect(newPos.row).to.be.equal(1);
        expect(newPos).to.not.equal(pos);
      });
    });
    describe("when orientation is up", () => {
      it ("should return correct new position on left turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.UP, TurnEnum.LEFT);

        expect(newPos.col).to.be.equal(0);
        expect(newPos.row).to.be.equal(2);
        expect(newPos).to.not.equal(pos);
      });
      it ("should return correct new position on right turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.UP, TurnEnum.RIGHT);

        expect(newPos.col).to.be.equal(2);
        expect(newPos.row).to.be.equal(2);
        expect(newPos).to.not.equal(pos);
      });
    });
    describe("when orientation is down", () => {
      it ("should return correct new position on left turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.DOWN, TurnEnum.LEFT);

        expect(newPos.col).to.be.equal(2);
        expect(newPos.row).to.be.equal(2);
        expect(newPos).to.not.equal(pos);
      });
      it ("should return correct new position on right turn", () => {
        let newPos = actr.getNewPos(pos, OrientationEnum.DOWN, TurnEnum.RIGHT);

        expect(newPos.col).to.be.equal(0);
        expect(newPos.row).to.be.equal(2);
        expect(newPos).to.not.equal(pos);
      });
    });
  });
})
