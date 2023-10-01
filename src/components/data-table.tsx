import React from 'react';
import { RouteData } from '../helpers';

export const DataTable: React.FC<{ data: RouteData }> = ({ data }) => {
  return (
    <div className="data-table">
      <div className='text-left mb-20'>
        <div><b>RouteId</b> {data.routeId}</div>
        <div><b>routeName</b> {data.routeName}</div>
        <div><b>source</b>: {data.source}</div>
      </div>
      <table>
        <tr>
          <th>pointType</th>
          <th>calculationType</th>
          <th>spread</th>
          <th>feeCost</th>
          <th>tariffCostFixed</th>
          <th>tariffCostVariable</th>
          <th>finalCost</th>
          <th>value</th>
          <th>otmItm</th>
        </tr>
        {Object.keys(data.points).map((pointId: any) => {
          const point = data.points[pointId];
          return (
            <tr key={pointId}>
              <th>{point.pointType}</th>
              <th>{point.calculationType}</th>
              <th>{point.spread}</th>
              <th>{point.feeCost}</th>
              <th>{point.tariffCostFixed}</th>
              <th>{point.tariffCostVariable}</th>
              <th>{point.finalCost}</th>
              <th>{point.value}</th>
              <th>{point.otmItm}</th>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
