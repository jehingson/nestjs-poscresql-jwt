import moment from 'moment';

const handleFromNow = (value: moment.Moment, upperCase = true) => {
  const isInTheFuture = moment(value).isAfter(moment());
  if (isInTheFuture) {
    return formatToSpanish(moment().fromNow(), upperCase);
  }
  return formatToSpanish(value.fromNow(), upperCase);
};

function formatToSpanish(value: any, upperCase = true) {
  const firstWord = upperCase ? 'Hace' : 'hace';

  return (
    `${firstWord} ` +
    value
      .replace('a few seconds ago', ' segundos')
      .replace('a minute ago', ' un minuto')
      .replace('minute ago', ' un minuto')
      .replace('minutes ago', ' minutos')
      .replace('an hour ago', ' una hora')
      .replace('hours ago', ' horas')
      .replace('a day ago', ' un día')
      .replace('days ago', ' días')
      .replace('a month ago', ' un mes')
      .replace('months ago', ' meses')
      .replace('a year ago', ' un año')
      .replace('years ago', ' años')
  );
}

function parseFromNow(lastUpdate: any, upperCase = true) {
  if (!lastUpdate) return '';

  if (
    lastUpdate instanceof Date ||
    lastUpdate instanceof moment ||
    (typeof lastUpdate === 'string' && lastUpdate.includes('T'))
  ) {
    return handleFromNow(moment(lastUpdate), upperCase);
  }

  if (typeof lastUpdate === 'string' && !lastUpdate.includes('T')) {
    return handleFromNow(moment(new Date(parseInt(lastUpdate, 10))), upperCase);
  }

  if (typeof lastUpdate === 'number') {
    return handleFromNow(moment(new Date(lastUpdate)), upperCase);
  }
  return '';
}

const handleFromNowShorcut = (value: moment.Moment) => {
  const isInTheFuture = moment(value).isAfter(moment());
  if (isInTheFuture) {
    return formatToSpanishShorcut(moment());
  }
  const days = moment().diff(value, 'days');
  if (days === 0) {
    return '1d'; //formatToSpanishShorcut(value.fromNow())
  }
  return days + 'd';
};

const formatToSpanishShorcut = (value: any) => {
  return value
    .replace('a few seconds ago', 's')
    .replace('a minute ago', '1m')
    .replace('minute ago', 'm')
    .replace('minutes ago', 'm')
    .replace('an hour ago', '1h')
    .replace('hours ago', 'h')
    .replace('a day ago', 'd')
    .replace('days ago', 'd')
    .replace('a month ago', ' un mes')
    .replace('months ago', ' meses')
    .replace('a year ago', ' un año')
    .replace('years ago', ' años')
    .replace(' ', '');
};

export const parseFromNowShorcut = (lastUpdate: any) => {
  if (!lastUpdate) return '';

  if (lastUpdate instanceof Date || lastUpdate instanceof moment) {
    return handleFromNowShorcut(moment(lastUpdate));
  }

  if (typeof lastUpdate === 'string' && !lastUpdate.includes('T')) {
    return handleFromNowShorcut(moment(new Date(parseInt(lastUpdate, 10))));
  }

  if (typeof lastUpdate === 'string' && lastUpdate.includes('T')) {
    return handleFromNowShorcut(moment(lastUpdate));
  }
  if (typeof lastUpdate === 'number') {
    return handleFromNowShorcut(moment(new Date(lastUpdate)));
  }
  return '';
};

const objectToMoment = (date: any) => {
  if (!date) return moment();

  if (date instanceof Date || date instanceof moment) {
    return moment(date);
  }

  if (typeof date === 'string' && !date.includes('T')) {
    return moment(new Date(parseInt(date, 10)));
  }

  if (typeof date === 'string' && date.includes('T')) {
    return moment(date);
  }
  if (typeof date === 'number') {
    return moment(new Date(date));
  }
  return moment();
};

export const getDays = (date: any) => {
  const new_date = objectToMoment(date);

  const isInTheFuture = new_date.isAfter(moment());
  if (isInTheFuture) {
    return 0;
  }
  const days = moment().diff(new_date, 'days');
  return days;
};

export { parseFromNow };
