export type Point = {
  pointType: string;
  calculationType: string;
  spread: number;
  feeCost: number;
  tariffCostFixed: number;
  tariffCostVariable: number;
  finalCost: number;
  value: number;
  otmItm: string;
};

export type RouteData = {
  routeId: string;
  routeName: string;
  source: string;
  points: Record<string, Point>;
};

export type AppData = Record<string, RouteData>;

export const getPointId = (point: Point) => {
  return `${point.calculationType}-${point.pointType}`;
};

export const getMappedPointsById = (points: Point[]) => {
  const mappedPoints: Record<string, Point> = {};
  points.forEach((point: Point) => {
    const id = getPointId(point);
    mappedPoints[id] = point;
  });
  return mappedPoints;
};
