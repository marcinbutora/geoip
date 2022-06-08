export interface IpTimeZone {
  status: string;
  message: string;
  countryCode: string;
  countryName: string;
  regionName: string;
  cityName: string;
  zoneName: string;
  abbreviation: string;
  gmtOffset: number;
  dst: string;
  zoneStart: number;
  zoneEnd?: any;
  nextAbbreviation?: any;
  timestamp: number;
  formatted: string;
}
