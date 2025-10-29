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
  return convertNumberToString(sum);
}

export const getMetricCardsData = (data, costData) => {
  const cards = deepClone(data.metricSection.cards);
  cards['total-annual-cost'].value = calculateTotalCost(costData);
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
  const shortLabels = labels.map(item => item.split(' ').shift());
  costOverview.chartSection.chartList.forEach((chart, index) => {
    chart.data.labels = labels.length ? (index === 0 ? labels : shortLabels) : chart.data.labels;
    chart.data.datasets[0].data = labels.length ? Object.values(costMap) : chart.data.datasets[0].data;
    if (index === 0) {
      chart.data.datasets[0].backgroundColor = colors.slice(0, labels.length)
    }
  });

  return costOverview;
}

export const getCostBreakDown = (data, costData) => {
  const breakdown = deepClone(data);
  const categoryMap = costData.reduce((acc, item) => {
    acc[item.category] = acc[item.category] ? acc[item.category] : []
    acc[item.category].push(item);
    return acc;
  }, {});

  const additionalItem = Object.keys(categoryMap).map(item => {
    const sum = calculateTotalCost(categoryMap[item]);
    return {
      icon: "brain",
      iconProps: { "className": "text-blue-500" },
      textLeftTop: item,
      textLeftBottom: `${sum} annually • 44% of total`,
      textRightTop: "$746K savings",
      textRightBottom: "60% reduction possible",
      details: categoryMap[item].map(detail => {
        return {
          name: detail.subcategory,
          status: "increasing",
          amount: convertNumberToString(detail.amount)
        }
      })
    }
  })

  // breakdown.breakdownList = breakdown.breakdownList.slice(0, 6);
  // breakdown.breakdownList = breakdown.breakdownList.concat(additionalItem);
  breakdown.breakdownList = additionalItem
  return breakdown;
};