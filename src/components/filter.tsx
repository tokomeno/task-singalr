import React, { useState } from 'react';

export const Filter: React.FC<{
  routeNames: string[];
  setFilters: (routes: string[]) => void;
}> = ({ routeNames, setFilters }) => {
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  return (
    <div>
      Filter
      <br />
      <select
        multiple={true}
        defaultValue={selectedRoutes}
        onChange={(e) => {
          let selectedRoutes = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          );
          setSelectedRoutes(selectedRoutes);
          setFilters(selectedRoutes)
        }}
      >
        {routeNames.map((name: string, i: number) => {
          return (
            <option
              value={name}
              key={i}
              selected={selectedRoutes?.includes(name) ? true : false}
            >
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
