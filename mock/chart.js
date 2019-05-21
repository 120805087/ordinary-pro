import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i++) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY[i]
    })
};

const salesData = [];
for (let i = 0; i < 12; i += 1) {
    salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
    })
};

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i++) {
    visitData2.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY2[i]
    })
};

const searchData = [];
for (let i = 0; i < 50; i ++) {
    searchData.push({
        index: i + 1,
        keyword: `搜索关键词-${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2),
    })
};

const salesTypeData = [
    {
        x: '家用电器',
        y: 4544,
    },
    {
        x: '食用酒水',
        y: 3321,
    },
    {
        x: '个护健康',
        y: 3113,
    },
    {
        x: '服饰箱包',
        y: 2341,
    },
    {
        x: '母婴产品',
        y: 1231,
    },
    {
        x: '其他',
        y: 1231,
    },
  ];

  const salesTypeDataOnline = [
    {
        x: '家用电器',
        y: 244,
    },
    {
        x: '食用酒水',
        y: 321,
    },
    {
        x: '个护健康',
        y: 311,
    },
    {
        x: '服饰箱包',
        y: 41,
    },
    {
        x: '母婴产品',
        y: 121,
    },
    {
        x: '其他',
        y: 111,
    },
  ];

  const salesTypeDataOffline = [
    {
        x: '家用电器',
        y: 99,
    },
    {
        x: '食用酒水',
        y: 188,
    },
    {
        x: '个护健康',
        y: 344,
    },
    {
        x: '服饰箱包',
        y: 255,
    },
    {
        x: '其他',
        y: 65,
    },
  ];

const getFakeChartData = {
    visitData,
    visitData2,
    salesData,
    searchData,
    // offlineData,
    // offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    // radarData,
};
export default {
    'GET /api/fake_chart_data': getFakeChartData,
    'GET /api/fake_sales_data': (req, res) => {
        res.send({ salesData, range: req.query.date })
    }
}
