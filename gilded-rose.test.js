const tick = require("./");

describe ("Gilded Rose", () => {
  function tickAndCheck(input, expected) {
    expect(tick(input)).toEqual(expected);
  };

  describe("Normal Item", () => {
    test("before sell date", () => {
      input = [{name: "Normal Item", sellIn: 5, quality: 10}];
      expected = [{name: "Normal Item", sellIn: 4, quality: 9}];
      tickAndCheck(input, expected);
    });

    test("on sell date", () => {
      input = [{name: "Normal Item", sellIn: 0, quality: 10}];
      expected = [{name: "Normal Item", sellIn: -1, quality: 8}];
      tickAndCheck(input, expected);
    });

    test("after sell date", () => {
      input = [{name: "Normal Item", sellIn: -10, quality: 10}];
      expected = [{name: "Normal Item", sellIn: -11, quality: 8}];
      tickAndCheck(input, expected);
    });

    test("of zero quality", () => {
      input = [{name: "Normal Item", sellIn: 5, quality: 0}];
      expected = [{name: "Normal Item", sellIn: 4, quality: 0}];
      tickAndCheck(input, expected);
    });
  });

  describe("Aged Brie", () => {
    test("before sell date", () => {
      input = [{name: "Aged Brie", sellIn: 5, quality: 10}];
      expected = [{name: "Aged Brie", sellIn: 4, quality: 11}];
      tickAndCheck(input, expected);
    });

    test("with max quality", () => {
      input = [{name: "Aged Brie", sellIn: 5, quality: 50}];
      expected = [{name: "Aged Brie", sellIn: 4, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("on sell date", () => {
      input = [{name: "Aged Brie", sellIn: 0, quality: 10}];
      expected = [{name: "Aged Brie", sellIn: -1, quality: 12}];
      tickAndCheck(input, expected);
    });

    test("on sell date near max quality", () => {
      input = [{name: "Aged Brie", sellIn: 0, quality: 49}];
      expected = [{name: "Aged Brie", sellIn: -1, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("on sell date with max quality", () => {
      input = [{name: "Aged Brie", sellIn: 0, quality: 50}];
      expected = [{name: "Aged Brie", sellIn: -1, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("after sell date", () => {
      input = [{name: "Aged Brie", sellIn: -10, quality: 10}];
      expected = [{name: "Aged Brie", sellIn: -11, quality: 12}];
      tickAndCheck(input, expected);
    });

    test("after sell date with max quality", () => {
      input = [{name: "Aged Brie", sellIn: -10, quality: 50}];
      expected = [{name: "Aged Brie", sellIn: -11, quality: 50}];
      tickAndCheck(input, expected);
    });
  });

  describe("Legendary Item (Sulfuras, Hand of Ragnaros)", () => {
    test("before sell date", () => {
      input = [{name: "Sulfuras, Hand of Ragnaros", sellIn: 5, quality: 80}];
      expected = [{name: "Sulfuras, Hand of Ragnaros", sellIn: 5, quality: 80}];
      tickAndCheck(input, expected);
    });

    test("on sell date", () => {
      input = [{name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80}];
      expected = [{name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80}];
      tickAndCheck(input, expected);
    });

    test("after sell date", () => {
      input = [{name: "Sulfuras, Hand of Ragnaros", sellIn: -10, quality: 80}];
      expected = [{name: "Sulfuras, Hand of Ragnaros", sellIn: -10, quality: 80}];
      tickAndCheck(input, expected);
    });
  });

  describe("Backstage Pass", () => {
    test("long before sell date", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 10}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 11}];
      tickAndCheck(input, expected);
    });

    test("long before sell date at max quality", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 50}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("medium close to sell date upper bound", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 10}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 9, quality: 12}];
      tickAndCheck(input, expected);
    });

    test("medium close to sell date upper bound at max quality", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 50}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 9, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("medium close to sell date lower bound", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 6, quality: 10}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 12}];
      tickAndCheck(input, expected);
    });

    test("medium close to sell date lower bound at max quality", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 6, quality: 50}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("very close to sell date upper bound", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 10}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 4, quality: 13}];
      tickAndCheck(input, expected);
    });

    test("very close to sell date upper bound at max quality", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 50}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 4, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("very close to sell date lower bound", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 1, quality: 10}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 13}];
      tickAndCheck(input, expected);
    });

    test("very close to sell date lower bound at max quality", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 1, quality: 50}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 50}];
      tickAndCheck(input, expected);
    });

    test("on sell date", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 10}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -1, quality: 0}];
      tickAndCheck(input, expected);
    });

    test("after sell date", () => {
      input = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -10, quality: 10}];
      expected = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -11, quality: 0}];
      tickAndCheck(input, expected);
    });
  });

  describe.skip("Conjured Item", () => {
    test("before sell date", () => {
      input = [{name: "Conjured Mana Cake", sellIn: 5, quality: 10}];
      expected = [{name: "Conjured Mana Cake", sellIn: 4, quality: 8}];
      tickAndCheck(input, expected);
    });

    test("before sell date at zero quality", () => {
      input = [{name: "Conjured Mana Cake", sellIn: 5, quality: 0}];
      expected = [{name: "Conjured Mana Cake", sellIn: 4, quality: 0}];
      tickAndCheck(input, expected);
    });

    test("on sell date", () => {
      input = [{name: "Conjured Mana Cake", sellIn: 0, quality: 10}];
      expected = [{name: "Conjured Mana Cake", sellIn: -1, quality: 6}];
      tickAndCheck(input, expected);
    });

    test("on sell date at zero quality", () => {
      input = [{name: "Conjured Mana Cake", sellIn: 0, quality: 0}];
      expected = [{name: "Conjured Mana Cake", sellIn: -1, quality: 0}];
      tickAndCheck(input, expected);
    });

    test("after sell date", () => {
      input = [{name: "Conjured Mana Cake", sellIn: -10, quality: 10}];
      expected = [{name: "Conjured Mana Cake", sellIn: -11, quality: 6}];
      tickAndCheck(input, expected);
    });

    test("after sell date at zero quality", () => {
      input = [{name: "Conjured Mana Cake", sellIn: -10, quality: 0}];
      expected = [{name: "Conjured Mana Cake", sellIn: -11, quality: 0}];
      tickAndCheck(input, expected);
    });
  });
});