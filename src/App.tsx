import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { DataTable } from './components/data-table';
import { AppData, getMappedPointsById } from './helpers';
import { Filter } from './components/filter';

function App() {
  const [data, setData] = useState<AppData>({});
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://31.53.16.222:5000/routes')
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        connection.on('ReceiveMessage', (payload) => {
          setData((prev) => {
            const mappedPoints = getMappedPointsById(payload.points);
            const prevPoints = prev[payload.routeId]?.points || {};
            return {
              ...prev,
              [payload.routeId]: {
                ...payload,
                points: {
                  ...prevPoints,
                  ...mappedPoints,
                },
              },
            };
          });
        });
      })
      .catch((err) => {
        console.error('could connect singalR');
        setError('issue with connecting the singalR');
      });
  }, []);

  const routeNames = useMemo(() => {
    return Object.keys(data).map((routeId) => data[routeId].routeName);
  }, [data]);

  if (error) {
    return <div className="App">{error}</div>;
  }

  return (
    <div className="App">
      {Object.keys(data).length ? (
        <>
          <Filter
            routeNames={routeNames}
            setFilters={(routes) => {
              setSelectedRoutes(routes);
            }}
          />
          {Object.keys(data).map((routeId) => {
            if (
              selectedRoutes.includes(data[routeId].routeName) ||
              selectedRoutes.length === 0
            ) {
              return <DataTable key={routeId} data={data[routeId]} />;
            }
            return null;
          })}
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default App;
