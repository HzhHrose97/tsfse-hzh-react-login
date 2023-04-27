// 根据身份证获取出生年月日
function getBirthdayFromIdCard(idCard: string | null) {
  var birthday = "";
  if (idCard != null && idCard !== "") {
    if (idCard.length === 15) {
      birthday = "19" + idCard.substr(6, 6);
    } else if (idCard.length === 18) {
      birthday = idCard.substr(6, 8);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
  }
  return birthday;
}

// 判断是否为手机号
function isPoneAvailable(phone: string) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (myreg.test(phone)) {
    return true;
  } else {
    return false;
  }
}

function isCardNo(card: string) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    alert("身份证输入不合法");
    return false;
  }
}

// 判断是否为邮箱
function isEmail(email: string) {
  // eslint-disable-next-line no-useless-escape
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (reg.test(email)) {
    return true;
  } else {
    return false;
  }
}

// 判断密码是否相同
function isPasswordSame(firstPassword: string, secondPassword: string) {
  if (firstPassword === secondPassword) {
    return true;
  } else {
    return false;
  }
}

export {
  getBirthdayFromIdCard,
  isPoneAvailable,
  isCardNo,
  isEmail,
  isPasswordSame,
};
