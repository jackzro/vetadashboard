"use client";

import { Button } from "@/components/ui/button";
import { convertDataToChart } from "@/constants/convertDataToChart";
import { Chart } from "@/_components/Chart";
import DatePicker from "@/_components/DatePicker";
import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

function ChartPage() {
  const { data: session } = useSession();
  const [chartdataActiveSchneider, setChartdataActiveSchneider] = useState({});
  const [chartdataReActiveSchneider, setChartdataReActiveSchneider] = useState(
    {}
  );
  const [chartdataReActiveAcrel, setChartdataReActiveAcrel] = useState({});
  const [chartDataActiveAcrel, setChartDataActiveAcrel] = useState({});
  const [voltageAcrel, setVoltageAcrel] = useState({});
  const [voltageSchneider, setVoltageSchneider] = useState({});
  const [currentAcrel, setCurrentAcrel] = useState({});
  const [currentSchneider, setCurrentSchneider] = useState({});

  const [labels, setLabels] = useState([]);
  const datasets = (datas: any) => {
    return [
      {
        label: "Export Energy",
        data: datas.EnergyExport,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Import Energy",
        data: datas.EnergyImport,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];
  };

  const datasetsVoltage = (datas: any) => {
    return [
      {
        label: "Voltage Phase 1",
        data: datas.voltagePhase1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Voltage Phase 2",
        data: datas.voltagePhase2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Voltage Phase 3",
        data: datas.voltagePhase3,
        borderColor: "rgb(50,205,50)",
        backgroundColor: "rgba(50,205,50,0.5)",
      },
    ];
  };

  const datasetsCurrent = (datas: any) => {
    return [
      {
        label: "Current Phase 1",
        data: datas.currentPhase1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Current Phase 2",
        data: datas.currentPhase2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Current Phase 3",
        data: datas.currentPhase3,
        borderColor: "rgb(50,205,50)",
        backgroundColor: "rgba(50,205,50,0.5)",
      },
    ];
  };

  const generateEpochTime = async (num: number) => {
    const now = new Date();
    const epochtime = Math.floor(new Date().getTime() / 1000.0);
    const onehourbefore = Math.floor(
      new Date(now.getTime() - num * 60 * 60 * 1000).getTime() / 1000.0
    );

    const res = await axios.get(
      `https://api-solar.veta.co.id/v1/sensor-hub/sensor-data/?timestamp_start=${onehourbefore}&timestamp_end=${epochtime}&serial_number=75c710fd-56e5-4f33-bd43-b3da8b18`
    );

    const {
      activeAcrelEnergyExport,
      activeAcrelEnergyImport,
      activeSchneiderEnergyExport,
      activeSchneiderEnergyImport,
      labels,
      // reactiveAcrelEnergyExport,
      // reactiveAcrelEnergyImport,
      // reactiveSchneiderEnergyExport,
      // reactiveSchneiderEnergyImport,
      // acrelvoltagephase1,
      // acrelvoltagephase2,
      // acrelvoltagephase3,
      // schneidervoltagephase1,
      // schneidervoltagephase2,
      // schneidervoltagephase3,
      // acrelcurrentphase1,
      // acrelcurrentphase2,
      // acrelcurrentphase3,
      // schneidercurrentphase1,
      // schneidercurrentphase2,
      // schneidercurrentphase3,
    } = convertDataToChart(res.data.results);
    setChartDataActiveAcrel({
      EnergyExport: activeAcrelEnergyExport.reverse(),
      EnergyImport: activeAcrelEnergyImport.reverse(),
    });
    setChartdataActiveSchneider({
      EnergyExport: activeSchneiderEnergyExport.reverse(),
      EnergyImport: activeSchneiderEnergyImport.reverse(),
    });
    // setChartdataReActiveAcrel({
    //   EnergyExport: reactiveAcrelEnergyExport.reverse(),
    //   EnergyImport: reactiveAcrelEnergyImport.reverse(),
    // });
    // setChartdataReActiveSchneider({
    //   EnergyExport: reactiveSchneiderEnergyExport.reverse(),
    //   EnergyImport: reactiveSchneiderEnergyImport.reverse(),
    // });
    // setVoltageAcrel({
    //   voltagePhase1: acrelvoltagephase1.reverse(),
    //   voltagePhase2: acrelvoltagephase2.reverse(),
    //   voltagePhase3: acrelvoltagephase3.reverse(),
    // });
    // setVoltageSchneider({
    //   voltagePhase1: schneidervoltagephase1.reverse(),
    //   voltagePhase2: schneidervoltagephase2.reverse(),
    //   voltagePhase3: schneidervoltagephase3.reverse(),
    // });
    // setCurrentAcrel({
    //   currentPhase1: acrelcurrentphase1.reverse(),
    //   currentPhase2: acrelcurrentphase2.reverse(),
    //   currentPhase3: acrelcurrentphase3.reverse(),
    // });
    // setCurrentSchneider({
    //   currentPhase1: schneidercurrentphase1.reverse(),
    //   currentPhase2: schneidercurrentphase2.reverse(),
    //   currentPhase3: schneidercurrentphase3.reverse(),
    // });
    setLabels(labels.reverse());
  };

  const company = async (e: any) => {
    e.preventDefault();
    //@ts-ignore
    const accessToken = session.token.accessToken;
    try {
      const res = await axios.get(
        `https://api-solar.veta.co.id/v1/sensor-hub/company/`,
        {
          headers: {
            Authorization:
              "Bearer eyJraWQiOiJLQU44bmFGalJkZ2NrVEdReXN0eUJRZHY4Q3Ewd0hRaG1iUlJNOHBHQjRRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OWJhMjU5Yy04MGQxLTcwNWEtZDBkNi1kZjBmNzU0MGMzY2EiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfRm5GdjJqZVdHIiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiNWxtNWF2NmRxNnAyZ244b3I0MWY0bG5mZmUiLCJvcmlnaW5fanRpIjoiMGJkZTJmOTctZWNlZS00NWY0LTk4ZTktMzJhODBiMjIwZDg1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY5NTI5NDM3MSwiZXhwIjoxNjk1MzgwNzcxLCJpYXQiOjE2OTUyOTQzNzEsImp0aSI6Ijc1MGY4OTZiLWZiNzUtNGUyZi1hODhmLTA1OGJmYjI5OTU3ZiIsInVzZXJuYW1lIjoidmV0YS5hZG1pbiJ9.ABA_ThDguRrQwEfmYI5675jUoJzv_XzZSzwm4KagJckbQxjq-UT9Ahnx8ojdLnOVt4s9MGSM28XvqUdTqyGqYMBUtYTFqk_z7zvLVGhTvreZzPMLBJI4FbNmsHXeI8P9v2oWpmZt8nuD5ffVgkA0CYi-wvxcUokPB-yqn94oHfK_iqQL1GPzzU6L9_NfRYfNBRGT_9kWAz2eZcKGUU82WtDIELbgq1Udj9mkuQX0KSz5DQkRUsECEx9mlf5tI7bd4vN-Mrhmy5b5gS75rbIMWH7INFQA1GE-7NORojOTHFvfskEjQqz53_7BiuO-Fa3whfc4QolfkCzas0l14Ej96Q",
          },
        }
      );
      console.log("ini res", res);
    } catch (error) {
      console.log("ini error", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-4 p-4">
        <Button onClick={() => generateEpochTime(168)}>1 Weeks</Button>
        <Button onClick={() => generateEpochTime(336)}>2 Weeks</Button>
        <Button onClick={company}>2 Weeks</Button>
      </div>

      {labels.length !== 0 ? (
        <div className="lg:grid grid-cols-2">
          <div>
            <div className="w-full flex items-center justify-center  mb-4 text-5xl">
              Schneider
            </div>
            <Chart
              datas={chartdataActiveSchneider}
              labels={labels}
              title="Schneider Active Energy"
              datasets={datasets}
              unit="kWh"
            />
            {/* <Chart
              datas={chartdataReActiveSchneider}
              labels={labels}
              title="Schneider Reactive Energy"
              datasets={datasets}
              unit="kVARh"
            />
            <Chart
              datas={voltageSchneider}
              labels={labels}
              title="Schneider Voltage"
              datasets={datasetsVoltage}
              unit="V"
            />
            <Chart
              datas={currentSchneider}
              labels={labels}
              title="Schneider Current"
              datasets={datasetsCurrent}
              unit="A"
            /> */}
          </div>
          <div>
            <div className="w-full flex items-center justify-center  mb-4 text-5xl">
              Arcel
            </div>
            <Chart
              datas={chartDataActiveAcrel}
              labels={labels}
              title="Acrel Reactive Energy"
              datasets={datasets}
              unit="kWh"
            />
            {/* <Chart
              datas={chartdataReActiveAcrel}
              labels={labels}
              title="Acrel Reactive Energy"
              datasets={datasets}
              unit="kVARh"
            />
            <Chart
              datas={voltageAcrel}
              labels={labels}
              title="Acrel Voltage"
              datasets={datasetsVoltage}
              unit="V"
            />
            <Chart
              datas={currentAcrel}
              labels={labels}
              title="Acrel Current"
              datasets={datasetsCurrent}
              unit="A"
            /> */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ChartPage;
