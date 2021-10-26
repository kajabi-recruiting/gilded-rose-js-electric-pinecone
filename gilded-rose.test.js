import { tick } from './gilded-rose';

expect.extend({
  toMatchSellInAndQuality(received, sellIn, quality) {
    const recievedValues = `[sellIn: ${received.sellIn}, quality: ${received.quality}]`;
    const expectedValues = `[sellIn: ${sellIn}, quality: ${quality}]`;
    const valuesComparison = `\n  Received ${recievedValues}\n  Expected ${expectedValues}`;
    if (received.sellIn == sellIn && received.quality == quality) {
      return {
        pass: true,
        message: () => `expected values not to match:${valuesComparison}`
      };
    }
    return {
      pass: false,
      message: () => `expected values to match:${valuesComparison}`
    };
  }
});

describe('Gilded Rose', () => {
  describe('Normal Item', () => {
    test('before sell date', () => {
      const input = [{ name: 'Normal Item', sellIn: 5, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 9);
    });

    test('on sell date', () => {
      const input = [{ name: 'Normal Item', sellIn: 0, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 8);
    });

    test('after sell date', () => {
      const input = [{ name: 'Normal Item', sellIn: -10, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 8);
    });

    test('of zero quality', () => {
      const input = [{ name: 'Normal Item', sellIn: 5, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 0);
    });
  });

  describe('Aged Brie', () => {
    test('before sell date', () => {
      const input = [{ name: 'Aged Brie', sellIn: 5, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 11);
    });

    test('with max quality', () => {
      const input = [{ name: 'Aged Brie', sellIn: 5, quality: 50 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 50);
    });

    test('on sell date', () => {
      const input = [{ name: 'Aged Brie', sellIn: 0, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 12);
    });

    test('on sell date near max quality', () => {
      const input = [{ name: 'Aged Brie', sellIn: 0, quality: 49 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 50);
    });

    test('on sell date with max quality', () => {
      const input = [{ name: 'Aged Brie', sellIn: 0, quality: 50 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 50);
    });

    test('after sell date', () => {
      const input = [{ name: 'Aged Brie', sellIn: -10, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 12);
    });

    test('after sell date with max quality', () => {
      const input = [{ name: 'Aged Brie', sellIn: -10, quality: 50 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 50);
    });
  });

  describe('Legendary Item (Sulfuras, Hand of Ragnaros)', () => {
    test('before sell date', () => {
      const input = [{ name: 'Sulfuras, Hand of Ragnaros', sellIn: 5, quality: 80 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(5, 80);
    });

    test('on sell date', () => {
      const input = [{ name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(0, 80);
    });

    test('after sell date', () => {
      const input = [{ name: 'Sulfuras, Hand of Ragnaros', sellIn: -10, quality: 80 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-10, 80);
    });
  });

  describe('Backstage Pass', () => {
    test('long before sell date', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 11,
          quality: 10
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(10, 11);
    });

    test('long before sell date at max quality', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 11,
          quality: 50
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(10, 50);
    });

    test('medium close to sell date upper bound', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 10,
          quality: 10
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(9, 12);
    });

    test('medium close to sell date upper bound at max quality', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 10,
          quality: 50
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(9, 50);
    });

    test('medium close to sell date lower bound', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 6,
          quality: 10
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(5, 12);
    });

    test('medium close to sell date lower bound at max quality', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 6,
          quality: 50
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(5, 50);
    });

    test('very close to sell date upper bound', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 5,
          quality: 10
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 13);
    });

    test('very close to sell date upper bound at max quality', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 5,
          quality: 50
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 50);
    });

    test('very close to sell date lower bound', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 1,
          quality: 10
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(0, 13);
    });

    test('very close to sell date lower bound at max quality', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 1,
          quality: 50
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(0, 50);
    });

    test('on sell date', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 0,
          quality: 10
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 0);
    });

    test('after sell date', () => {
      const input = [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: -10,
          quality: 10
        }
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 0);
    });
  });

  describe('Conjured Item', () => {
    test('before sell date', () => {
      const input = [{ name: 'Conjured Mana Cake', sellIn: 5, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 8);
    });

    test('before sell date at zero quality', () => {
      const input = [{ name: 'Conjured Mana Cake', sellIn: 5, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 0);
    });

    test('on sell date', () => {
      const input = [{ name: 'Conjured Mana Cake', sellIn: 0, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 6);
    });

    test('on sell date at zero quality', () => {
      const input = [{ name: 'Conjured Mana Cake', sellIn: 0, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 0);
    });

    test('after sell date', () => {
      const input = [{ name: 'Conjured Mana Cake', sellIn: -10, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 6);
    });

    test('after sell date at zero quality', () => {
      const input = [{ name: 'Conjured Mana Cake', sellIn: -10, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 0);
    });
  });
});
