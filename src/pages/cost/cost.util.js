import { CATEGORIES, CATEGORIES_ICONS } from "../../config/vars";
import { deepClone } from "../../utils/helper.util";
import { convertNumberToString } from "../../utils/parse.util";

const calculateTotalCost = (data, annualizedCost = 'annualizedCost') => {
  const sum = data?.reduce?.((sum, item) => sum + item[annualizedCost], 0);
  return sum;
}

const getIconFromCategory = (category) => {
  const matchString = category.toLowerCase();
  if (matchString.indexOf('license') !== -1) {
    return 'fileText';
  }
  if (matchString.indexOf('human') !== -1 || matchString.indexOf('professional') !== -1) {
    return 'users';
  }
  if (matchString.indexOf('network') !== -1) {
    return 'network';
  }
  if (matchString.indexOf('data') !== -1 || matchString.indexOf('storage') !== -1) {
    return 'database';
  }
  if (matchString.indexOf('compute') !== -1) {
    return 'cpu';
  }
  if (matchString.indexOf('observability') !== -1) {
    return 'cloud'
  }
  if (matchString.indexOf('api') !== -1) {
    return 'layers'
  }
  if (matchString.indexOf('ai') !== -1) {
    return 'brain';
  }

  return 'webhook';

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
  cards['total-annual-cost'].value = convertNumberToString(calculateTotalCost(costData, 'annualizedCost'));
  return Object.values(cards);
};

export const getCostOverview = (data, costData) => {
  const costOverview = deepClone(data);
  const costMap = costData.reduce((acc, item) => {
    acc[item.category] = acc[item.category] ? acc[item.category] : 0;
    acc[item.category] += item.annualizedCost;
    return acc;
  }, {});

  const labels = Object.keys(costMap);
  costOverview.chartSection.chartList.forEach((chart, index) => {
    chart.data.labels = labels.length ? labels : chart.data.labels;
    chart.data.datasets[0].data = labels.length ? Object.values(costMap) : chart.data.datasets[0].data;
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
    const subcategoryMap = groupByOnKey(categoryMap[item], 'subcategory');

    return {
      icon: getIconFromCategory(item),
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