/**
 * The handle function accepts a single item, determines its type, and passes it to the appropriate handler based on the type
 */
const handle = item => {
  let type;

  if (item.name.toLowerCase().includes('aged')) {
    type = 'aged';
  }

  if (item.name.toLowerCase().includes('backstage')) {
    type = 'backstage';
  }

  if (item.name.toLowerCase().includes('conjured')) {
    type = 'conjured';
  }

  if (item.quality > 50) {
    type = 'legendary';
  }

  switch (type) {
    case 'aged':
      return handleAged(item);
      break;
    case 'backstage':
      return handleBackstage(item);
      break;
    case 'conjured':
      return handleConjured(item);
      break;
    case 'legendary':
      return item;
      break;
    default:
      return handleItem(item);
      break;
  }
};

/**
 * A utility function to ensure quality is never over 50
 */
const maxQuality = quality => {
  return quality > 50 ? 50 : quality;
};

/**
 * A utility function to ensure quality is never under 0
 */
const minQuality = quality => {
  return quality < 0 ? 0 : quality;
};

/**
 * Handle aged items as specified in the directions
 */
const handleAged = item => {
  return {
    name: item.name,
    sellIn: item.sellIn - 1,
    quality: item.sellIn <= 0 ? maxQuality(item.quality + 2) : maxQuality(item.quality + 1)
  };
};

/**
 * Handle conjured items as specified in the directions
 */
const handleConjured = item => {
  return {
    name: item.name,
    sellIn: item.sellIn - 1,
    quality: item.sellIn <= 0 ? minQuality(item.quality - 4) : minQuality(item.quality - 2)
  };
};

/**
 * Handle regular items as specified in the directions
 */
const handleItem = item => {
  return {
    name: item.name,
    sellIn: item.sellIn - 1,
    quality: item.sellIn <= 0 ? minQuality(item.quality - 2) : minQuality(item.quality - 1)
  };
};

/**
 * Handle backstage passes as specified in the directions
 */
const handleBackstage = item => {
  return {
    name: item.name,
    sellIn: item.sellIn - 1,
    quality: handleBackstageQuality(item)
  };
};

/**
 * Handle quality for backstage passes as specified in the directions
 */
const handleBackstageQuality = item => {
  if (item.sellIn <= 0) {
    return 0;
  }

  if (item.sellIn > 10) {
    return maxQuality(item.quality + 1);
  }

  if (item.sellIn <= 10 && item.sellIn > 5) {
    return maxQuality(item.quality + 2);
  }

  if (item.sellIn <= 5 && item.sellIn > 0) {
    return maxQuality(item.quality + 3);
  }
};

/**
 * The simplified tick function
 */
const tick = items => {
  return items.map(item => {
    return handle(item);
  });
};

export { tick };
