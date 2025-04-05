/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  File,
  User,
  UserCheck,
  Clock,
} from "feather-icons-react/build/IconComponents";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { ArrowRight } from "react-feather";
import { all_routes } from "../../Router/all_routes";
import useFetch from "../../Hooks/useFetch";
import moment from "moment";
import PieChart3D from "./PieChart3D";
import AreaChart from "./AreaChart";
import DataTable from "../../common/DataTable";
import DashboardTable from "./DashboardTable";
import DateRangePickerComponent from "../../ReusableComponents/DateRangePickerComponent";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const Dashboard = () => {
  const route = all_routes;
  const callFetch = useFetch();
  const defaultStartDate = dayjs().startOf("month");
  const defaultEndDate = dayjs();
  const [dates, setDates] = useState([defaultStartDate, defaultEndDate]);
  const [loading, setLoading] = useState(false);
  const [dashboardCardData, setDashboardCardData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    series: [],
    colors: ["#28C76F", "#EA5455"],
    chart: {
      type: "bar",
      height: 320,
      stacked: true,
      zoom: { enabled: true },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => formatValue(val), // Format Tooltip Values
      },
    },
    responsive: [
      {
        breakpoint: 280,
        options: {
          legend: { position: "bottom", offsetY: 0 },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
        columnWidth: "20%",
      },
    },
    dataLabels: { enabled: false },
    yaxis: {
      min: 0,
      max: 300,
      tickAmount: 5,
      labels: {
        formatter: (val) => formatValue(val), // Format Y-axis Values
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: { show: false },
    fill: { opacity: 1 },
  });

  const formatValue = (val) => {
    if (val >= 10000000) return (val / 10000000).toFixed(1) + "Cr";
    if (val >= 100000) return (val / 100000).toFixed(1) + "L";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val;
  };
  const parseDate = (dateString) => {
    return moment(dateString, "DD MMM YYYY").toDate();
  };

  const dashboardCardDetails = async (Year, FromDate, ToDate) => {
    const urls = [
      `/api/DashBoardGraph?Year=${Year}&FromDate=${FromDate}&ToDate=${ToDate}`,
      `/api/DashBoardNew?Year=${Year}&FromDate=${FromDate}&ToDate=${ToDate}`,
    ];

    try {
      setLoading(true);

      // Fetch both APIs in parallel
      const responses = await Promise.all(
        urls.map((url) => callFetch(url, "GET"))
      );

      // Extract response data
      const [{ res: res1, got: got1 }, { res: res2, got: got2 }] = responses;

      if (res1.status === 200 && res2.status === 200) {
        const loadData1 = got1.data || {};
        const loadData2 = got2.data || {};

        // Merge quotVsSale data from both responses
        const quotVsSale = [
          ...(loadData1.quotVsSale || []),
          ...(loadData2.quotVsSale || []),
        ];

        console.log("Merged quotVsSale Data:", quotVsSale);

        // Flatten data for chart calculations
        const allValues = quotVsSale.flatMap((item) => item.data);
        const maxValue = Math.max(...allValues, 300);
        const minValue = Math.min(...allValues.filter((v) => v > 0), 0);

        // Update Chart Options
        setChartOptions((prev) => ({
          ...prev,
          series: quotVsSale,
          yaxis: {
            min: Math.floor(minValue * 0.8),
            max: Math.ceil(maxValue * 1.2),
            tickAmount: 6,
            labels: {
              formatter: (val) => formatValue(val),
            },
          },
        }));

        // Merge & update dashboard data
        const dashboardData = { ...loadData1, ...loadData2 };
        setDashboardCardData(dashboardData);

        console.log("Final Dashboard Data:", dashboardData);

        // Populate Ant Design Table
        // populateTable(dashboardData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTableData = (dashboardData, keyData) => {
    return (dashboardData?.[keyData] || []).map((item, index) => ({
      key: index + 1,
      ...item,
    }));
  };

  const getTableColumns = (data) => {
    if (!data || data.length === 0) return [];

    return Object.keys(data[0]).map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
      dataIndex: key,
      sorter: (a, b) => {
        if (typeof a[key] === "number" && typeof b[key] === "number") {
          return a[key] - b[key];
        }
        return String(a[key]).localeCompare(String(b[key]));
      },
    }));
  };

  const tableData = [
    { id: 1, keyName: "top10Customer", header: "Top 10 Customers" },
    { id: 1, keyName: "top10State", header: "Top 10 State" },
    { id: 1, keyName: "top10City", header: "Top 10 City" },
    { id: 1, keyName: "top10Product", header: "Top 10 Product" },
    { id: 1, keyName: "top10Category", header: "Top 10 Category" },
  ];
  const onDateChange = (value) => {
    if (value && value.length === 2) {
      const [newStartDate, newEndDate] = value;
      if (!newStartDate?.isSame(dates[0]) || !newEndDate?.isSame(dates[1])) {
        setDates(value);
      }
    } else {
      setDates([defaultStartDate, defaultEndDate]);
    }
  };

  useEffect(() => {
    const [startDate, endDate] = dates;
    const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
    const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";
    dashboardCardDetails(2025, startDateStr, endDateStr);
  }, [dates]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <DateRangePickerComponent value={dates} onChange={onDateChange} />
          <div className="row mt-2">
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash1.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    <CountUp start={0} end={0} duration={3} prefix="₹" />
                  </h5>
                  <h6>Total Purchase Due</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash2.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    ₹
                    <CountUp start={0} end={0} duration={3} />
                  </h5>
                  <h6>Total Orders Amount</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash3.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    ₹
                    <CountUp start={0} end={0} duration={3} decimals={1} />
                  </h5>
                  <h6>Total Sale Amount</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash4.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    ₹
                    <CountUp start={0} end={0} duration={3} />
                  </h5>
                  <h6>Total Expense Amount</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count">
                <div className="dash-counts">
                  <h4>0</h4>
                  <h5>Customers</h5>
                </div>
                <div className="dash-imgs">
                  <User />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das1">
                <div className="dash-counts">
                  <h4>0</h4>
                  <h5>Orders</h5>
                </div>
                <div className="dash-imgs">
                  <UserCheck />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das2">
                <div className="dash-counts">
                  <h4>0</h4>
                  <h5>Purchase Invoice</h5>
                </div>
                <div className="dash-imgs">
                  <ImageWithBasePath
                    src="assets/img/icons/file-text-icon-01.svg"
                    className="img-fluid"
                    alt="icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das3">
                <div className="dash-counts">
                  <h4>0</h4>
                  <h5>Sales Invoice</h5>
                </div>
                <div className="dash-imgs">
                  <File />
                </div>
              </div>
            </div>
          </div>
          {/* Button trigger modal */}

          <div className="row">
            <div className="col-xl-6 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Orders &amp; Sales</h5>
                  <div className="graph-sets">
                    <ul className="mb-0">
                      <li>
                        <span>Sales</span>
                      </li>
                      <li>
                        <span>Orders</span>
                      </li>
                    </ul>
                    <div className="dropdown dropdown-wraper">
                      <button
                        className="btn btn-light btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        2023
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <Link to="#" className="dropdown-item">
                            2023
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2022
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2021
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="sales_charts" />
                  <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="bar"
                    height={320}
                  />
                </div>
              </div>
            </div>

            <PieChart3D
              rawData={dashboardCardData.stateWiseSale}
              header="State Wise Sale"
            />
            <PieChart3D
              rawData={dashboardCardData.productWiseSale}
              header="Product Wise Sale"
            />
            <PieChart3D
              rawData={dashboardCardData.categoryWiseSale}
              header="Category Wise Sale"
            />

            <AreaChart
              data={dashboardCardData?.dayWiseSale?.[0]?.data || []}
              categories={dashboardCardData?.dayWiseSale?.[0]?.categegory || []}
              header="Days Wise Sales"
            />
          </div>

          <div className="row">
            {tableData.map((item) => (
              <DashboardTable
                key={item.id}
                columns={getTableColumns(
                  dashboardCardData[0]?.[item.keyName] || []
                )}
                data={getTableData(dashboardCardData[0], item.keyName)}
                header={item.header}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
