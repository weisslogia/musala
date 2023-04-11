export const getDateFormat = (date: string): string => {
    let validTimestamp = null;
    if (date.indexOf('.') > 0) {
      validTimestamp = date.split('.')[0] + '+00:00';
    } else if (date.indexOf('Z') > 0) {
      validTimestamp = date.split('Z')[0] + '+00:00';
    } else {
      validTimestamp = date + '+00:00';
    }
    const months = {
      Jan: 'Ene',
      Feb: 'Feb',
      Mar: 'Mar',
      Apr: 'Abr',
      May: 'May',
      Jun: 'Jun',
      Jul: 'Jul',
      Aug: 'Ago',
      Sep: 'Sep',
      Oct: 'Oct',
      Nov: 'Nov',
      Dec: 'Dic',
    };
    const f_date = new Date(validTimestamp).toString().split(' ');
    if (f_date.length > 0) {
      // @ts-ignore
      if (f_date[1] === undefined) {
        return '';
      }
      // @ts-ignore
      return `${f_date[1]} ${f_date[2]}, ${f_date[3]}`;
    }
    return '';
  };
  