import {objProp, prop} from "../";

describe('object', () => {

  describe('prop', () => {
    it('returns value indexed by argument from object', () => {
      const pope = { hobby: "poops in woods" };
      expect(prop('hobby', pope)).toBe("poops in woods");
    });
  });
  describe('objProp', () => {
    it('returns value indexed by argument from object', () => {
      const pope = { hobby: "poops in woods" };
      expect(objProp(pope, 'hobby')).toBe("poops in woods");
    });
  });
});
