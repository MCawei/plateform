//  时间戳转日期格式 yyyy-mm-dd  hh:mm:ss
export const timestampToDate = (timestamp) => {
  //timestamp = 1539314964000;

  let date = new Date(Number(timestamp));  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
}

//  日期格式yyyy-mm-dd  hh:mm:ss 转 时间戳
export const dateToTimestamp = (time) => {
  let timestamp = new Date(time).getTime();
  // var date = new Date(time).valueOf();
  return timestamp;
}

// 设备类型转换
export const transformEquipType = (equipJson, type) => {
  let equipmentType;
  equipJson.map( (item)=> {
    if(type == item.paraValue) {
      equipmentType = item.paraName
    }
  })
  return equipmentType;
}

//  事件级别转换
export const transformLevel = (level) => {
  switch (level) {
    case '0':
      return '一般';
      break;
    case '1':
      return '重要';
      break;
    default:
      return '未知';
  }
}

//  事件状态转换
export const  transformState = (state) => {
  switch (state) {
    case '0':
      return '待处理';
      break;
    case '1':
      return '处理中';
      break;
    case '2':
      return '已处理';
      break;
    case '3':
      return '已分派';
      break;
    case '4':
      return '分派退回';
      break;
    case '5':
      return '已上报';
      break;
    default:
      return '未知';
  }
}
