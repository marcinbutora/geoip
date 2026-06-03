export const environment = {
  production: true,
  api: {
    ipApi: {
      url: 'https://ipapi.co/',
      key: 'UwGCO4DZPD66kaS7nsXoC8mZEeeGP9AKjDgJGNOkREjmj3cMOO',
    },
    ipClient: 'https://api.ipify.org/?format=json',
    weather: {
      url: 'https://api.openweathermap.org/data/2.5/weather?',
      key: '8d1da24a8faf953ff79f47841b4e5fef',
    },
    timeZone: {
      url: 'https://api.timezonedb.com/v2.1/get-time-zone',
      key: 'XHNH1YD4XKP2',
    },
    mapbox: {
      token: 'pk.eyJ1IjoibWI4M3BsIiwiYSI6ImNrenU2dmZqYzFhbmgybm9odWR3MW1zbGEifQ.FkK9NeB26U89mDa1q_DQkQ',
      style: 'mapbox://styles/mapbox/streets-v11',
    },
  },
  gaId: 'G-9Y0BBKLVQY',
};
