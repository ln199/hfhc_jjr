var city_data = [{
    name: "城区",
    item: [{
        id: 1,
        name: "高新园区"
      },
      {
        id: 2,
        name: "沙河口区"
      },
      {
        id: 3,
        name: "西岗区"
      }]
  },
  {
    name: "地铁",
    item: [{
        id: 1,
        name: "4号线"
      },
      {
        id: 2,
        name: "1号线"
      }]
  }
]

function getCity() {
  return city_data;
}

module.exports = {
  getCity: getCity
}