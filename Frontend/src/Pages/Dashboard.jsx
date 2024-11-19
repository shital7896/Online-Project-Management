
import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import TopBar from "../Components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCounts, getChartsData } from "../Redux/project/Action";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../styles/dashboard.css";
import BottomSidebar from "../Components/BottomSidebar";
import { DashboardSlider } from "../Components/DashboardSlider";

const Dashboard = () => {
  const { total, closed, cancelled, running, closure } = useSelector(
    (store) => store.project
  );
  const { chartsTotal, chartsClosed } = useSelector((store) => store.project);
  const dispatch = useDispatch();

  // -------------------window-size------------------------//

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  // -------------api calls------------------------//

  useEffect(() => {
    dispatch(getAllCounts());
  }, []);

  useEffect(() => {
    dispatch(getChartsData());
  }, []);

  const Percentage = ["91%", "97%", "92%", "100%", "100%", "91%"]; // Percentage values

  const options = {
    chart: {
      type: "column",
      spacingTop: 40,
      scrollablePlotArea: screenSize.width <= 640 ? {
        minWidth: 700, // Minimum width for scrollbar activation
        scrollPositionX: 1, // Start scrollbar from the left
      } : undefined, // No scrollablePlotArea for larger screens
    },
      title: {
          text: "",
      },
      subtitle: {
          text: "",
      },
      xAxis: {
          categories: ["STR", "FIN", "OLT", "MAN", "STO", "HR"], // Categories
          crosshair: true,
          labels: {
              useHTML: true, // Enable HTML for custom formatting
              formatter: function () {
                  const index = this.value === "STR" ? 0 :
                                this.value === "FIN" ? 1 :
                                this.value === "OLT" ? 2 :
                                this.value === "MAN" ? 3 :
                                this.value === "STO" ? 4 :
                                this.value === "HR" ? 5 : null;
                  return `<div style="text-align:center; color:black; font-weight:bold;">${Percentage[index]}<br> <br>${this.value}</div>`;
              },
          },
      },
      yAxis: {
          min: 0,
          title: {
              text: "",
          },
          labels: {
              formatter: function () {
                  return this.value + ""; // Format y-axis labels
              },
          },
      },
      tooltip: {
          headerFormat: '<span style="font-size:16px">{point.key}</span><table>',
          pointFormat:
              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} ({point.percentage:.1f}%)</b></td></tr>', // Show percentage in tooltip
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderRadius:8,
              borderWidth: 8,
              pointWidth: 22,
              dataLabels: {
                  enabled: true,
                  formatter: function () {
                      return this.point.y; // Display only the value for the current series
                  },
              },
          },
      },
      legend: {
          floating: false,
          align: "center",
          verticalAlign: "bottom",
          layout: "horizontal",
          borderWidth: 0,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: false,
      },
      series: [
          {
              name: "Total", // Series name for totals
              data: [
                  { y: 18, category: "STR" }, // Total for STR
                  { y: 7, category: "FIN" }, // Total for FIN
                  { y: 9, category: "OLT" }, // Total for OLT
                  { y: 15, category: "MAN" }, // Total for MAN
                  { y: 5, category: "STO" }, // Total for STO
                  { y: 10, category: "HR" },   // Total for HR
              ],
              color: "#025AAB",
          },
          {
              name: "Closed", // Series name for closed
              data: [
                  { y: 14, category: "STR" }, // Closed for STR
                  { y: 6, category: "FIN" }, // Closed for FIN
                  { y: 8, category: "OLT" }, // Closed for OLT
                  { y: 15, category: "MAN" }, // Closed for MAN
                  { y: 5, category: "STO" }, // Closed for STO
                  { y: 9, category: "HR" },   // Closed for HR
              ],
              color: "#5AA647",
          },
      ],
  };


  

  return (
    <Box
      display={"flex"}
      flexDirection={{
        sm: "column",
        md: "row",
        base: "column",
        lg: "row",
        xl: "row",
      }}
      backgroundColor={"#dbdbdb"}
    >
      {screenSize.width > 640 && (
        <SideBar
          prop1={"5px solid #1b5cbf"}
          prop2={"20px"}
          prop3={""}
          prop4={""}
          prop5={""}
          prop6={""}
          src1={"/images/Dashboard-active.jpg"}
          src2={"/images/Project-list.jpg"}
          src3={"/images/create-project.jpg"}
        />
      )}
      <Box ml={{ md: "15%", lg: "6%", xl: "6%" }} mb={"80px"}>
        {" "}
        {/* Adjust margin-left to accommodate fixed sidebar */}
        <TopBar title={"Dashboard"} screenWidth={screenSize.width} />
        <Box
          width={{ sm: "98%", base: "98%", md: "95%", lg: "95%", xl: "95%" }}
          m={"auto"}
          p={{
            sm: "5px 10px",
            md: "20px 20px 50px 20px",
            base: "5px 10px",
            lg: "20px 20px 50px 20px",
            xl: "20px 20px 50px 20px",
          }}
          borderRadius={"10px"}
          color={"gray"}
          position={{
            sm: "",
            base: "",
            md: "absolute",
            lg: "absolute",
            xl: "absolute",
          }}
          zIndex={{ sm: "", base: "", md: "100", lg: "100", xl: "100" }}
          top={{ sm: "0px", md: "10%", base: "0px", lg: "17%", xl: "17%" }}
          left={{ sm: "0px", md: "8%", base: "0px", lg: "7%", xl: "7%" }}
        >
          {screenSize.width > 640 ? (
            <SimpleGrid columns={[2, 3, 5]} spacing="20px">
              <Box
                textAlign={"left"}
                height={"100px"}
                backgroundColor={"white"}
                borderRadius={"5px"}
                borderLeft={"6px solid #32d6e9"}
                p={{
                  sm: "0px",
                  md: "10px 9px",
                  base: "0px",
                  lg: "10px 15px",
                  xl: "10px 15px",
                }}
                boxShadow={
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                }
              >
                <Text fontWeight={"500"}>Total Projects</Text>
                <Heading color={"blackAlpha.700"}>{total}</Heading>
              </Box>
              <Box
                textAlign={"left"}
                height={"100px"}
                backgroundColor={"white"}
                borderRadius={"5px"}
                borderLeft={"6px solid #32d6e9"}
                p={{
                  sm: "0px",
                  md: "10px 9px",
                  base: "0px",
                  lg: "10px 15px",
                  xl: "10px 15px",
                }}
                boxShadow={
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                }
              >
                <Text fontWeight={"500"}>Closed</Text>
                <Heading color={"blackAlpha.700"}>{closed}</Heading>
              </Box>
              <Box
                textAlign={"left"}
                height={"100px"}
                backgroundColor={"white"}
                borderRadius={"5px"}
                borderLeft={"6px solid #32d6e9"}
                p={{
                  sm: "0px",
                  md: "10px 9px",
                  base: "0px",
                  lg: "10px 15px",
                  xl: "10px 15px",
                }}
                boxShadow={
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                }
              >
                <Text fontWeight={"500"}>Running</Text>
                <Heading color={"blackAlpha.700"}>{running}</Heading>
              </Box>
              <Box
                textAlign={"left"}
                height={"100px"}
                backgroundColor={"white"}
                borderRadius={"5px"}
                borderLeft={"6px solid #32d6e9"}
                p={{
                  sm: "0px",
                  md: "10px 9px",
                  base: "0px",
                  lg: "10px 15px",
                  xl: "10px 15px",
                }}
                boxShadow={
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                }
              >
                <Text fontWeight={"500"}>Closure Delay</Text>
                <Heading color={"blackAlpha.700"}>{closure}</Heading>
              </Box>
              <Box
                textAlign={"left"}
                height={"100px"}
                backgroundColor={"white"}
                borderRadius={"5px"}
                borderLeft={"6px solid #32d6e9"}
                p={{
                  sm: "0px",
                  md: "10px 9px",
                  base: "0px",
                  lg: "10px 15px",
                  xl: "10px 15px",
                }}
                boxShadow={
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                }
              >
                <Text fontWeight={"500"}>Cancelled</Text>
                <Heading color={"blackAlpha.700"}>{cancelled}</Heading>
              </Box>
            </SimpleGrid>
          ) : (
            <DashboardSlider
              total={total}
              closed={closed}
              running={running}
              cancelled={cancelled}
              closure={closure}
            />
          )}
        </Box>
        <Text
          fontSize={"22px"}
          fontWeight={"500"}
          mt={{ sm: "20px", base: "20px", md: "70px", lg: "50px", xl: "50px" }}
          textAlign={"start"}
          p={"20px"}
        >
          Department wise - Total Vs Closed
        </Text>
        <Box
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
          }
          width={{ sm: "96%", md: "96%", base: "96%", lg: "45%", xl: "45%" }}
          ml={{ sm: "0px", base: "0px", md: "30px", lg: "30px", xl: "30px" }} // Increased left margin
          p={{
            sm: "0px 5px",
            md: "0px 5px",
            base: "0px 5px",
            lg: "0px",
            xl: "0px",
          }}
          className="chart-container"
        >
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </Box>
      {screenSize.width <= 640 && (
        <BottomSidebar
          prop1={"5px solid #1b5cbf"}
          prop2={"20px"}
          prop3={""}
          prop4={""}
          prop5={""}
          prop6={""}
          src1={"/images/Dashboard-active.jpg"}
          src2={"/images/Project-list.jpg"}
          src3={"/images/create-project.jpg"}
        />
      )}
    </Box>
  );
};

export default Dashboard;
