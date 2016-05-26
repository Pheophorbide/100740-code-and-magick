var getMessage = function (a, b) {
  if (typeof a == 'boolean') {
    if (a == true) {
      return ('Я попал в ' + b);
    }
    else {
      return ('Я никуда не попал');
    }
  }
  else if (typeof a == 'number') {
    return ('Я прыгнул на ' + a * 100 + ' сантиметров');

  }
  else if (typeof a == 'object' && typeof b == 'object') {
    var lenght = 0;
    for (var i = 0; i < a.length && i < b.length; i++) {
      lenght += a[i] * b[i];
    }
    return ('Я прошёл ' + lenght + ' метров');
  }
  else if (typeof a == 'object') {

    var sum = 0;
    for (var i = 0; i < a.length; i++) {
      sum += a[i];
    }
    return ('Я прошёл ' + sum + ' шагов');
  }
};
getMessage();

