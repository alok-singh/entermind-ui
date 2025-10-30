import { CATEGORIES, CATEGORIES_ICONS } from "../../config/vars";
import { deepClone } from "../../utils/helper.util";
import { convertNumberToString } from "../../utils/parse.util";

const colors = [
  // "#b66aae", // purple
  // "#35a2eb", // blue
  // "#3ecc1f", // parrot
  // "#4cc0c0", // green
  // "#ffce56", // yellow
  // "#ff9f40", // orange
  // "#b66aae", // pink
  // "#ff6385", // red
  '#FFAF6EF1',
  '#7D8BE0F1',
  '#9A81B0F1',
  '#EE7EA0F1',
  '#EA7D70F1',
  '#BCC07BF1',
  '#ABCDDEF1',
  '#8E715BF1',
  '#E1CFCAF1',
  '#F69F95F1',
];

const calculateTotalCost = (data) => {
  const sum = data?.reduce?.((sum, item) => sum + item.amount, 0);
  return sum;
}

const groupByOnKey = (array, key) => {
  return array.reduce((acc, item) => {
    acc[item[key]] = acc[item[key]] ? acc[item[key]] : [];
    acc[item[key]].push(item);
    return acc;
  }, {});
}


const checkArrayTrend = (arr, key) => {
  if (!Array.isArray(arr) || arr.length < 2) {
    return "stable"; // Single element or invalid input treated as stable
  }

  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][key] > arr[i - 1][key]) {
      isDecreasing = false;
    } else if (arr[i][key] < arr[i - 1][key]) {
      isIncreasing = false;
    }
  }

  if (isIncreasing && !isDecreasing) return "increasing";
  if (!isIncreasing && isDecreasing) return "decreasing";
  return "stable";
}


export const getMetricCardsData = (data, costData) => {
  const cards = deepClone(data.metricSection.cards);
  cards['total-annual-cost'].value = convertNumberToString(calculateTotalCost(costData));
  return Object.values(cards);
};

export const getCostOverview = (data, costData) => {
  const costOverview = deepClone(data);
  const costMap = costData.reduce((acc, item) => {
    acc[item.category] = acc[item.category] ? acc[item.category] : 0;
    acc[item.category] += item.amount;
    return acc;
  }, {});

  const labels = Object.keys(costMap);
  costOverview.chartSection.chartList.forEach((chart, index) => {
    chart.data.labels = labels.length ? labels : chart.data.labels;
    chart.data.datasets[0].data = labels.length ? Object.values(costMap) : chart.data.datasets[0].data;
    if (labels.length) {
      chart.data.datasets[0].backgroundColor = colors.slice(0, labels.length)
    }
  });

  return costOverview;
}

export const getCostBreakDown = (data, costData) => {
  const totalCost = calculateTotalCost(costData);
  const breakdown = deepClone(data);
  const categoryMap = groupByOnKey(costData, 'category');

  const additionalItem = Object.keys(categoryMap).map(item => {
    const sum = calculateTotalCost(categoryMap[item]);
    const randomPercent = Math.random();
    const iconIndex = CATEGORIES.findIndex(category => category === item);
    const subcategoryMap = groupByOnKey(categoryMap[item], 'subcategory');
    return {
      icon: CATEGORIES_ICONS[iconIndex === -1 ? 0 : iconIndex],
      iconProps: { className: 'text-[#06f] w-8 h-8 p-2 rounded-lg bg-[linear-gradient(to_right_bottom,#0066ff33_0%,#00d68f33_100%)]' },
      textLeftTop: item,
      textLeftBottom: `${convertNumberToString(sum)} annually • ${(100 * sum / totalCost).toFixed(2)}% of total`,
      textRightTop: `${convertNumberToString((sum * randomPercent).toFixed(2))} savings`,
      textRightBottom: `${(randomPercent * 100).toFixed(2)}% reduction possible`,
      details: Object.keys(subcategoryMap).map(subcategory => {
        return {
          name: subcategory,
          status: checkArrayTrend(subcategoryMap[subcategory], 'subcategory'),
          amount: convertNumberToString(calculateTotalCost(subcategoryMap[subcategory]))
        }
      })
    }
  })

  // breakdown.breakdownList = breakdown.breakdownList.slice(0, 6);
  // breakdown.breakdownList = breakdown.breakdownList.concat(additionalItem);
  breakdown.breakdownList = additionalItem
  return breakdown;
};